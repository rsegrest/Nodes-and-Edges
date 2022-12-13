import p5 from "p5";
import Position from "../model/positioning/Position";
import Dimension from "../model/positioning/Dimension";
import Layout from "../model/positioning/Layout";

import CreationManager from "./CreationManager";

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
  private static p: p5;
  private nodes: NodeModel[] = [];
  private edges: EdgeModel[] = [];
  private toolbox: ToolboxModel = new ToolboxModel();
  private inspector: InspectorModel = new InspectorModel();
  private dynamicTool: DynamicToolModel|null = null; // TODO: rename?
  // getRolledOverObjects
  private rolledOverObjects: (
    NodeModel | EdgeModel | PlugModel | ToolboxModel | ToolModel
  )[] = [];

  private constructor(p: p5) {
    ChartManager.setP(p);
    this.nodes = CreationManager.createNodes();
    // this.edges = CreationManager.createEdges(this.nodes);
  }

  repositionElementOnResize(element: ToolboxModel|InspectorModel, windowWidth: number, windowHeight: number):void {
    Layout.positionElementBasedOnScreenSize(
      element, windowWidth, windowHeight );
    return;
  }

  resizeCanvas(windowWidth: number, windowHeight: number):void {
    // throw new Error("Method not implemented.");
    this.repositionElementOnResize(this.toolbox, windowWidth, windowHeight);
    this.repositionElementOnResize(this.inspector, windowWidth, windowHeight);
    // move Toolbox
    // move Tools
    // move Inspector
  }

  mouseDragged(p: p5): void {
    // console.log(`mouse dragged to : ${p.mouseX}, ${p.mouseY}`);
    const dragTarget:DraggableObject|null = this.getDragTarget();
    if (dragTarget === null) { 
      // console.log('1. drag target is null');
      return;
    }
    // console.log(`1. drag target assigned as ${dragTarget?.type}`);if (dragTarget === null) { return; }
    // let testTarget = null;
    if (dragTarget.type === 'Node') {
      // testTarget = 'Node';
      (dragTarget as NodeModel).setIsDragging(true);
    } else if (dragTarget.type === 'Edge') {
      // testTarget = 'Edge';
      (dragTarget as EdgeModel).setIsDragging(true);
    } else if (dragTarget.type === 'Plug') {
      // testTarget = 'Plug';
      (dragTarget as PlugModel).setIsDragging(true);
    } else if (dragTarget.type === 'Tool') {
      // testTarget = 'Tool';
      // throw(new Error('tool model is being dragged'));
      (dragTarget as ToolModel).setIsDragging(true);
    }
    // console.log(`2. drag target assigned as ${testTarget}`);
    
  }

  mousePressed(p: p5): void {
    // console.log(`mouse pressed at : ${p.mouseX}, ${p.mouseY}`);
    
  }

  clearDragTargets(): void {
    this.nodes.forEach((node) => {
      node.setIsDragging(false);
      node.getPlugs().forEach((plug) => plug.setIsDragging(false));
    });
    this.edges.forEach((edge) => edge.setIsDragging(false));
    this.toolbox.getToolList().forEach((tool) => tool.setIsDragging(false));
  }

  mouseReleased(p: p5): void {
    // console.log('mouse released');
    if (this.dynamicTool !== null) {
      const newlyMintedNode = CreationManager.createNewObjectFromDynamicTool(this.dynamicTool);
      this.nodes.push(newlyMintedNode);
      this.dynamicTool = null;
    }
  this.dynamicTool = null;
    // if there is a dynamicTool in the slot,
    //  set the dynamicTool to null
    //  then create the new class (has info?) 
    this.clearDragTargets();
  }

  getDragTarget(): DraggableObject|null {
    const nodeList:NodeModel[] = this.nodes;
    const edgeList:EdgeModel[] = this.edges;
    const plugList:PlugModel[] = this.nodes.flatMap((node) => node.getPlugs());

    // TODO: Does "dragTarget" need to be a member variable?
    // const dragTarget = null;

    // check tools
    if (this.toolbox) {
      if (this.toolbox.getIsRolledOver()) {
        const toolList = this.toolbox.getToolList();

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
  
  // TEMP FUNCTION for testing
  drawTestLines(): void {
    // TEST LINES
    const line1_2 = RenderEdge.plotConnection(
      this.nodes[0] as NodeModel,
      this.nodes[1] as NodeModel
    );
    const line2_3 = RenderEdge.plotConnection(
      this.nodes[1] as NodeModel,
      this.nodes[2] as NodeModel
    );
    const line3_4 = RenderEdge.plotConnection(
      this.nodes[2] as NodeModel,
      this.nodes[3] as NodeModel
    );

    RenderEdge.renderLines(line1_2);
    RenderEdge.renderLines(line2_3);
    RenderEdge.renderLines(line3_4, "rgb(0,0,200)");
  }
  renderNodes(p:p5): void {
    this.nodes.forEach((n,index) => {
      // check for rollover
      // TODO: Move this logic to abstract GuiElement class
      const mouseIsOverNode = n.checkMouseOver(p.mouseX, p.mouseY);
      if (mouseIsOverNode) { n.setIsRolledOver(); }
      else { n.setIsRolledOver(false); }
      // if node is being dragged, update its position
      if (n.getIsDragging()) {
        n.dragToPosition(new Position(p.mouseX-40, p.mouseY-20));
      }

      if (this.getSelectedNodes().length > 0) {
        // TODO: Only draw line if user is hovering over another node:
        //  1. iterate through plugs and check closest
        const plugArray = this.getClosestPlugsOnSelectedNode();
        // console.log('plugArray: '+plugArray);
        const closestPlugOnSelectedNode = plugArray[0];
        const closestPlugPosition = closestPlugOnSelectedNode?.getPosition();
        const mousePosition = new Position(p.mouseX, p.mouseY);
        const lineArray = [closestPlugPosition as Position, mousePosition];
        RenderEdge.renderLines(lineArray, "rgb(0,128,255)");
      }
      
      RenderNode.render(n, ChartManager.getP());
    });
  }
  renderElements(): void {
    const p = ChartManager.getP();
    
    // 1. RENDER TOOLBOX
    RenderToolbox.render(this.toolbox);
    
    // 2. RENDER INSPECTOR (and parameters in node)
    RenderInspector.render(
      this.inspector,
      this.getSelectedNodes()[0] as NodeModel
      );
      
    const mouseIsOverToolbox = this.toolbox.checkMouseOver(p.mouseX, p.mouseY);
    if (mouseIsOverToolbox) { this.toolbox.setIsRolledOver(); }
    
    // 3. RENDER TOOLS
    this.renderTools(p);
    
    // 4. RENDER EDGES
    this.renderEdges();
    
    // 5. RENDER NODES
    this.renderNodes(p);

    // 6. RENDER DYNAMIC TOOL
    if (this.dynamicTool !== null) {
      // this.dynamicTool.render();
      RenderTool.render(this.dynamicTool);
    }

    // 7. (DEBUG): RENDER GRID & GUIDES
    RenderGuides.render();
  }
  
  // 5. RENDER EDGES
  renderEdges(): void {
    // TEST CASE: Add edges manually and render them
    const firstNode1 = this.nodes[0] as NodeModel;
    const secondNode1 = this.nodes[1] as NodeModel;
    const firstPlug1 = firstNode1.getPlugByPosition('E');
    const secondPlug1 = secondNode1.getPlugByPosition('W');
    
    const oneEdge = new EdgeModel(
      'e0-1',
      firstNode1,
      secondNode1,
      firstPlug1,
      secondPlug1
    );

    const firstNode2 = this.nodes[1] as NodeModel;
    const secondNode2 = this.nodes[2] as NodeModel;
    const firstPlug2 = firstNode2.getPlugByPosition('E');
    const secondPlug2 = secondNode2.getPlugByPosition('W');
    
    const anotherEdge = new EdgeModel(
      'e1-2',
      firstNode2,
      secondNode2,
      firstPlug2,
      secondPlug2
    );


    const firstNode3 = this.nodes[2] as NodeModel;
    const secondNode3 = this.nodes[3] as NodeModel;
    const firstPlug3 = firstNode3.getPlugByPosition('E');
    const secondPlug3 = secondNode3.getPlugByPosition('W');
    
    const yetAnotherEdge = new EdgeModel(
      'e2-3',
      firstNode3,
      secondNode3,
      firstPlug3,
      secondPlug3
    );

    RenderEdge.render(oneEdge)
    RenderEdge.render(anotherEdge);
    RenderEdge.render(yetAnotherEdge);
    // END TEST CASE

    // ITERATE THROUGH EDGES
    // this.edges.forEach((e) => {
    //   RenderEdge.render(e);
    // })

    // RenderEdge.renderLines([new Position(0,0), new Position(100,100)]);

    // IF A NODE IS SELECTED, SHOW A CONNECTION PREVIEW
    // this.getSelectedNodes().forEach((node) => {
      
      // TEMP DISABLE, was tested
      // this.highlightClosestPlugOnSelectedNode();
      
      
      // RenderEdge.renderPreview(node);
    // });
  }
  // 4. RENDER TOOLS
  renderTools(p: p5):void {
    this.toolbox.getToolList().forEach((t) => {
      // check for rollover
      // TODO: Move this logic to abstract GuiElement class
      if (t.getIsDragging()) {
        this.dragDynamicTool(new Position(p.mouseX-40, p.mouseY-20), t);
      }
      const mouseIsOverTool = (t as ToolModel).checkMouseOver(p.mouseX, p.mouseY);
      if (mouseIsOverTool) { t.setIsRolledOver(); }
      else { t.setIsRolledOver(false); }
    });
  }

  dragDynamicTool(pos: Position, tool:ToolModel|null=null):void {
    if (this.dynamicTool === null) {
      // CREATE NEW
      this.dynamicTool = new DynamicToolModel(
        tool?.getName() as string,
        tool?.getIcon() as string,
        tool?.getObjectType() as string,
        tool?.position as Position,
        tool?.dimensions as Dimension,);
    }
    this.dynamicTool.dragToPosition(pos);
  }
  setDynamicSlot(dt:DynamicToolModel):void {
    this.dynamicTool = dt;
  };
  // testAddHtmlDiv(): void {
  //   const aDiv = document.createElement("p"); // is a node
  //   aDiv.innerHTML = "This is an HTML div appended to a top-layer div";
  //   const canvas = document.getElementById("htmlContainer");
  //   canvas?.appendChild(aDiv);
  // }
  static createContainer(
    p: p5,
    parent: HTMLElement
  ): { container: HTMLDivElement } {
    const container = document.createElement("div");
    // container.classList.add("p5c-container", "idle");
    // setDraggable(container);
    parent.appendChild(container);
    return { container };
  }
  // static createUi(
  //   parent: HTMLElement
  //   // initialState: UiState,
  //   // eventHandlers: UiEventHandlers = {}
  // ): any {
  //   const p = ChartManager.p;
  //   // document.getElementById();
  //   const cont = ChartManager.createContainer(p, parent);
  //   return cont;
  // }
  getSelectedNodes(): NodeModel[] {
    return this.nodes.filter((node) => node.getIsSelected());
  }
  getRolledOverNodes(): NodeModel[] {
    return this.nodes.filter((node) => node.getIsRolledOver());
  }
  // selectedNodes includes node to check if selected
  checkForSelectNode(): void {
    const mousePosition = new Position(
      ChartManager.p.mouseX,
      ChartManager.p.mouseY
    );
    for (let i = 0; i < this.nodes.length; i += 1) {
      if (this.nodes[i] !== null && this.nodes[i] !== undefined) {
        const node = this.nodes[i] as NodeModel;
        node.setSelected(false);
        if (node.checkMouseOver(mousePosition.x, mousePosition.y)) {
          node.setSelected();
        }
      }
    }
  }
  getClosestPlugsOnSelectedNode():PlugModel[] {
    const selectedNodes = this.getSelectedNodes();
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
  mouseClicked(): void {
    // console.log(
    //   `ChartManager.mouseClicked() @ ${new Position(
    //     ChartManager.p.mouseX,
    //     ChartManager.p.mouseY
    //   )}`
    // );
    this.nodes.forEach((n, i) => {
      const plugs = n.getPlugs();
      plugs.forEach((p) => {
        if (p.checkMouseOver(ChartManager.p.mouseX, ChartManager.p.mouseY)) {
          p.setIsSelected();
        }
      })
      this.checkForSelectNode();
    });
  }
  addNode(node: NodeModel): void {
    this.nodes.push(node);
  }
  removeNode(node: NodeModel): void {
    const index = this.nodes.indexOf(node);
    if (index > -1) {
      this.nodes.splice(index, 1);
    }
  }
  addEdge(edge: EdgeModel): void {
    this.edges.push(edge);
  }
  removeEdge(edge: EdgeModel): void {
    const index = this.edges.indexOf(edge);
    if (index > -1) {
      this.edges.splice(index, 1);
    }
  }
  getNodes(): NodeModel[] {
    return this.nodes;
  }
  getEdges(): EdgeModel[] {
    return this.edges;
  }
  selectNode(node: NodeModel): void {
    node.setSelected();
  }
  deselectNode(node: NodeModel): void {
    node.deselect();
  }
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
  static setP(p: p5): void {
    ChartManager.p = p;
  }
  static getP(): p5 {
    return ChartManager.p;
  }
  public toString(): string {
    let returnStr = `ChartManager:\n\t${this.nodes.length} nodes,\n\t${this.edges.length}\n`;
    returnStr += "NODES: [\n\t";
    this.nodes.forEach((node) => {
      returnStr += `\t${node.toString()},\n`;
    });
    returnStr += "]\nEDGES: [\n\t";

    this.edges.forEach((edge) => {
      returnStr += `\t${edge.toString()},\n`;
    });
    returnStr += "";
    return returnStr;
  }
}
export default ChartManager;
