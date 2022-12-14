import p5 from "p5";
import Position from "../model/positioning/Position";
import Dimension from "../model/positioning/Dimension";
import Layout from "../model/positioning/Layout";

import CreationManager from "./CreationManager";

import ApplicationModel from "../model/ApplicationModel";
import EdgeModel from "../model/EdgeModel";
import NodeModel from "../model/NodeModel";
import PlugModel from "../model/PlugModel";
import ToolModel from "../model/ToolModel";
import DynamicToolModel from "../model/DynamicToolModel";
import ToolboxModel from "../model/ToolboxModel";
import InspectorModel from "../model/InspectorModel";
// import GuiElementModel from "../model/abstract/GuiElement";

import RenderEdge from "../view/RenderEdge";
import RenderNode from "../view/RenderNode";
import RenderTool from "../view/RenderTool";
import RenderGuides from "../view/RenderGuide";
import RenderToolbox from "../view/RenderToolbox";
import RenderInspector from "../view/RenderInspector";

type DraggableObject = NodeModel|EdgeModel|PlugModel|ToolboxModel|ToolModel;

class ChartManager {
  private static instance: ChartManager | null = null;
  private static applicationModel: ApplicationModel|null;
  private static p: p5;

  private constructor(p: p5) {
    ChartManager.setP(p);
    ChartManager.applicationModel = ApplicationModel.createInstance(p);
  }

  // INTERACTION
  resizeCanvas(windowWidth: number, windowHeight: number):void {
    const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
    this.repositionElementOnResize(
      appModel?.getToolbox(),
        windowWidth, windowHeight
      );
    this.repositionElementOnResize(
      appModel?.getInspector(),
        windowWidth, windowHeight
      );
    // move Toolbox
    // move Tools
    // move Inspector
  }

  // INTERACTION
  mouseDragged(p: p5): void {
    // console.log(`mouse dragged to : ${p.mouseX}, ${p.mouseY}`);
    const dragTarget:DraggableObject|null = this.getDragTarget();
    if (dragTarget === null) { return; }
    if (dragTarget.type === 'Node') {
      (dragTarget as NodeModel).setIsDragging(true);
    } else if (dragTarget.type === 'Edge') {
      (dragTarget as EdgeModel).setIsDragging(true);
    } else if (dragTarget.type === 'Plug') {
      (dragTarget as PlugModel).setIsDragging(true);
    } else if (dragTarget.type === 'Tool') {
      (dragTarget as ToolModel).setIsDragging(true);
    }
    // console.log(`2. drag target assigned as ${testTarget}`);
    
  }

  // INTERACTION (STUB)
  mousePressed(p: p5): void {
    // console.log(`mouse pressed at : ${p.mouseX}, ${p.mouseY}`);
  }

  // INTERACTION (MOUSE)
  clearDragTargets(): void {
    const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
    appModel.getNodes().forEach((node) => {
      node.setIsDragging(false);
      node.getPlugs().forEach((plug) => plug.setIsDragging(false));
    });
    appModel.getEdges().forEach((edge) => edge.setIsDragging(false));
    appModel.getToolbox().getToolList().forEach((tool) => tool.setIsDragging(false));
  }

  // INTERACTION (MOUSE)
  mouseReleased(p: p5): void {
    const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
    if (appModel.getDynamicTool() !== null) {
      const newlyMintedNode = CreationManager.createNewObjectFromDynamicTool(appModel.getDynamicTool());
      appModel.getNodes().push(newlyMintedNode);
      appModel.setDynamicTool(null);
    }
    appModel.setDynamicTool(null);
    // if there is a dynamicTool in the slot,
    //  set the dynamicTool to null
    //  then create the new class (has info?) 
    this.clearDragTargets();
  }

  // INTERACTION (MOUSE)
  getDragTarget(): DraggableObject|null {
    const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
    const nodeList:NodeModel[] = appModel.getNodes();
    const edgeList:EdgeModel[] = appModel.getEdges();
    const plugList:PlugModel[] = appModel.getNodes().flatMap((node) => node.getPlugs());

    // TODO: Does "dragTarget" need to be a member variable?
    // const dragTarget = null;

    // check tools
    const toolbox = appModel.getToolbox();
    if (toolbox) {
      if (toolbox.getIsRolledOver()) {
        const toolList = toolbox.getToolList();

        // toolList.forEach((tool) => {
        for (let i = 0; i < toolList.length; i += 1) {
          const tool = toolList[i];
          if (tool.getIsRolledOver()) {
            return tool;
          }
        };

      }
    }
    if (plugList.length > 0) {
      for (let i = 0; i < plugList.length; i += 1) {
        const plug = plugList[i];
        if (typeof plug === 'undefined') { continue; }
        if (plug === null) { continue; }
        if (plug.getIsRolledOver()) {
          // console.warn(`plug: ${plug.toString()} is rolled over`);
          return plug;
        }
      }
    }
    if (edgeList.length > 0) {
      for (let i = 0; i < edgeList.length; i += 1) {
        const edge = edgeList[i];
        if (typeof edge === 'undefined') { continue; }
        if (edge === null) { continue; }
        if (edge?.getIsRolledOver()) {
          // console.warn(`edge: ${edge.toString()} is rolled over`);
          return edge;
        }
      }
    }
    if (nodeList.length > 0) {
      for (let i = 0; i < nodeList.length; i += 1) {
        const node = nodeList[i];
        if (typeof node === 'undefined') { continue; }
        if (node === null) { continue; }
        if (node?.getIsRolledOver()) {
          // console.warn(`node: ${node.toString()} is rolled over`);
          return node;
        }
      }
    }
    // return object that is being dragged, or null
    return null;
  }

  // INTERACTION
  static dragDynamicTool(
    appModel:ApplicationModel,
    pos: Position,
    tool:ToolModel|null=null
    ):void {
    const dynamicTool:DynamicToolModel|null = appModel.getDynamicTool();
    if (dynamicTool === null) {
      // CREATE NEW
      appModel.setDynamicTool(
        new DynamicToolModel(
          tool?.getName() as string,
          tool?.getIcon() as string,
          tool?.getObjectType() as string,
          tool?.position as Position,
          tool?.dimensions as Dimension,)
        );
    }
    (dynamicTool as DynamicToolModel).dragToPosition(pos);
  }

  // INTERACTION
  // selectedNodes includes node to check if selected
  static checkForSelectNode(appModel:ApplicationModel): void {
    const nodes = appModel.getNodes();
    const mousePosition = new Position(
      ChartManager.p.mouseX,
      ChartManager.p.mouseY
    );
    for (let i = 0; i < nodes.length; i += 1) {
      if (nodes[i] !== null && nodes[i] !== undefined) {
        const node = nodes[i] as NodeModel;
        node.setSelected(false);
        if (node.checkMouseOver(mousePosition.x, mousePosition.y)) {
          node.setSelected();
        }
      }
    }
  }

  // INTERACTION
  static getClosestPlugsOnSelectedNode(appModel:ApplicationModel):PlugModel[] {
    const selectedNodes = appModel.getSelectedNodes();
    // Array for if multiple nodes are selected
    // Right now, one at a time is selected, only
    const closestPlugArray = [];
    if (selectedNodes.length > 0) {
      for (let i = 0; i < selectedNodes.length; i += 1) {
        const closestPlug = (selectedNodes[i] as NodeModel).getPlugClosestToMouse(
          ChartManager.p.mouseX, ChartManager.p.mouseY
        );
        closestPlugArray.push(closestPlug);
      }
    }
    return closestPlugArray as PlugModel[];
  }

  // INTERACTION (MOUSE)
  mouseClicked(appModel:ApplicationModel): void {
    {

      // console.log(
      //   `ChartManager.mouseClicked() @ ${new Position(
      //     ChartManager.p.mouseX,
      //     ChartManager.p.mouseY
      //   )}`
      // );
    }
    const nodes:NodeModel[] = appModel.getNodes();
    nodes.forEach((n, i) => {
      const plugs = n.getPlugs();
      plugs.forEach((p) => {
        if (p.checkMouseOver(ChartManager.p.mouseX, ChartManager.p.mouseY)) {
          p.setIsSelected();
        }
      })
      ChartManager.checkForSelectNode(appModel);
    });
  }

  // INTERACTION
  selectNode(node: NodeModel): void {
    node.setSelected();
  }

  // INTERACTION
  deselectNode(node: NodeModel): void {
    node.deselect();
  }

  // INTERACTION
  repositionElementOnResize(
    element: ToolboxModel|InspectorModel,
    windowWidth: number, windowHeight: number):void {
    Layout.positionElementBasedOnScreenSize(
      element, windowWidth, windowHeight );
    return;
  }

  // // RENDER
  // renderNodes(p:p5): void {
  //   const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
  //   const nodes = appModel?.getNodes();
  //   nodes?.forEach((n,index) => {
  //     // check for rollover
  //     // TODO: Move this logic to abstract GuiElement class
  //     const mouseIsOverNode = n.checkMouseOver(p.mouseX, p.mouseY);
  //     if (mouseIsOverNode) { n.setIsRolledOver(); }
  //     else { n.setIsRolledOver(false); }
  //     // if node is being dragged, update its position
  //     if (n.getIsDragging()) {
  //       n.dragToPosition(new Position(p.mouseX-40, p.mouseY-20));
  //     }

  //     if (appModel.getSelectedNodes().length > 0) {
  //       // TODO: Only draw line if user is hovering over another node:
  //       //  1. iterate through plugs and check closest
  //       const plugArray = this.getClosestPlugsOnSelectedNode();
  //       // console.log('plugArray: '+plugArray);
  //       const closestPlugOnSelectedNode = plugArray[0];
  //       const closestPlugPosition = closestPlugOnSelectedNode?.getPosition();
  //       const mousePosition = new Position(p.mouseX, p.mouseY);
  //       const lineArray = [closestPlugPosition as Position, mousePosition];
  //       RenderEdge.renderLines(lineArray, "rgb(0,128,255)");
  //     }
      
  //     RenderNode.render(n, ChartManager.getP());
  //   });
  // }
  // // RENDER
  // renderElements(): void {
  //   const p = ChartManager.getP();
  //   const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);

  //   const toolbox = appModel?.getToolbox();
  //   const inspector = appModel?.getInspector();
  //   const nodes = appModel?.getNodes();
  //   const edges = appModel?.getEdges();
  //   const tools = toolbox?.getToolList();
  //   const dynamicTool = appModel?.getDynamicTool();
  //   const selectedNodes = appModel?.getSelectedNodes();
  //   const selectedEdges = appModel?.getSelectedEdges();
  //   const selectedPlugs = appModel?.getSelectedPlugs();
    
  //   // 1. RENDER TOOLBOX
  //   RenderToolbox.render(toolbox);
    
  //   // 2. RENDER INSPECTOR (and parameters in node)
  //   RenderInspector.render(
  //     inspector,
  //     appModel?.getSelectedNodes()[0] as NodeModel
  //   );
  //   const mouseIsOverToolbox = toolbox?.checkMouseOver(p.mouseX, p.mouseY);
  //   if (mouseIsOverToolbox) { toolbox?.setIsRolledOver(); }
    
  //   // 3. RENDER TOOLS
  //   this.renderTools(p);
    
  //   // 4. RENDER EDGES
  //   this.renderEdges();
    
  //   // 5. RENDER NODES
  //   this.renderNodes(p);

  //   // 6. RENDER DYNAMIC TOOL
  //   if (dynamicTool !== null) {
  //     // this.dynamicTool.render();
  //     RenderTool.render(dynamicTool);
  //   }

  //   // 7. (DEBUG): RENDER GRID & GUIDES
  //   RenderGuides.render();
  //   const htmlContainer = document.getElementById('htmlContainer');
  //   CreationManager.createContainer(p, htmlContainer as HTMLElement);
  // }
  
  // // 5. RENDER EDGES
  // renderEdges(): void {
  //   const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
  //   const edges = appModel?.getEdges();
  //   edges?.forEach((e) => {
  //     RenderEdge.render(e);
  //   })

  //   // TODO: If a node is selected, show a preview of connection
  // }
  // // 3. RENDER TOOLS
  // renderTools(p: p5):void {
  //   const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
  //   const toolbox = appModel?.getToolbox();
  //   toolbox?.getToolList().forEach((t) => {
  //     // check for rollover
  //     // TODO: Move this logic to abstract GuiElement class
  //     if (t.getIsDragging()) {
  //       this.dragDynamicTool(new Position(p.mouseX-40, p.mouseY-20), t);
  //     }
  //     const mouseIsOverTool = (t as ToolModel).checkMouseOver(p.mouseX, p.mouseY);
  //     if (mouseIsOverTool) { t.setIsRolledOver(); }
  //     else { t.setIsRolledOver(false); }
  //   });
  // }

  static createInstance(p: p5): ChartManager {
    if (ChartManager.instance === null) {
      ChartManager.instance = new ChartManager(p);
    }
    return ChartManager.instance;
  }
  static getInstance(): ChartManager {
    if (ChartManager.instance === null) {
      throw new Error("ChartManager instance is not created yet");
    }
    return ChartManager.instance;
  }
  static getP(): p5 {
    return ChartManager.p;
  }
  static setP(p: p5): void {
    ChartManager.p = p;
  }
  // OVERLOADS
  public toString(): string {
    const returnStr = 'ChartManager';
    // let returnStr = `ChartManager:\n\t${this.nodes.length} nodes,\n\t${this.edges.length}\n`;
    // returnStr += "NODES: [\n\t";
    // this.nodes.forEach((node) => {
    //   returnStr += `\t${node.toString()},\n`;
    // });
    // returnStr += "]\nEDGES: [\n\t";

    // this.edges.forEach((edge) => {
    //   returnStr += `\t${edge.toString()},\n`;
    // });
    // returnStr += "";
    return returnStr;
  }
}
export default ChartManager;
