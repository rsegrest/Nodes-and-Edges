import p5 from "p5";
import CreationManager from "./CreationManager";
import ApplicationModel from "../model/ApplicationModel";
import EdgeModel from "../model/EdgeModel";
import NodeModel from "../model/NodeModel";
import PlugModel from "../model/PlugModel";
import ToolboxModel from "../model/ToolboxModel";
import ToolModel from "../model/ToolModel";
import InputParameterModel from "../model/InputParameterModel";
import OutputParameterModel from "../model/OutputParameterModel";
import Position from "../model/positioning/Position";
// import DraggableGuiElementModel from "../model/abstract/DraggableGuiElement";
// import InteractionManager from "./InteractionManager";


export type DraggableObject = NodeModel|EdgeModel|PlugModel|ToolboxModel|ToolModel;


class MouseManager {
  
  static mouseMoved(
    mouseX:number, mouseY:number,
    appModel:ApplicationModel
  ): void {
    // console.log(`MouseManager.mouseMoved(): mouseX: ${mouseX}, mouseY: ${mouseY}`);
    // Check all elements for rollover
    let foundTool = false;
    let foundPlug = false;
    let foundParam = false;
  
    // Plugs
    appModel.getNodes().forEach((node) => {
      node.getPlugs().forEach((plug) => {
        if (plug.checkBoundary(mouseX, mouseY)) {
          console.warn(`MouseManager.mouseMoved(): plug.setIsRolledOver(): [\n\t${plug}\n\t]()}]`);
          plug.setIsRolledOver();
          foundPlug = true;
        } else {
          plug.setIsRolledOver(false);
        }
      })
    });
    if (foundPlug) { return; }

    // Input Params
    appModel.getSelectedNodes().forEach((node) => {
      node.getInputParameterList().forEach((inputParam) => {
        if (inputParam.checkBoundary(mouseX, mouseY)) {
          console.warn(`MouseManager.mouseMoved(): inputParam->setIsRolledOver(): [\n\t${inputParam}\n\t]()}]`);
          inputParam.setIsRolledOver();
          foundParam = true;
        } else {
          inputParam.setIsRolledOver(false);
        }
      })
    })

    // Output Params
    appModel.getSelectedNodes().forEach((node) => {
      node.getInputParameterList().forEach((outputParam) => {
        if (outputParam.checkBoundary(mouseX, mouseY)) {
          console.warn(`MouseManager.mouseMoved(): outputParam->setIsRolledOver(): [\n\t${outputParam}\n\t]()}]`);
          outputParam.setIsRolledOver();
          foundParam = true;
        } else {
          outputParam.setIsRolledOver(false);
        }
      })
    })
    if (foundParam) { return; }

    // Tools
    appModel.getToolbox().getToolList().forEach((tool) => {
      if (tool.checkBoundary(mouseX, mouseY)) {
        console.warn(`MouseManager.mouseMoved(): getToolList->setIsRolledOver(): [\n\t${tool}\n\t]()}]`);
        foundTool = true;
        tool.setIsRolledOver();
      } else {
        tool.setIsRolledOver(false);
      }
    });
    if (foundTool) { return; }

    // Nodes
    appModel.getNodes().forEach((node) => {
      if (node.checkBoundary(mouseX, mouseY)) {
        console.warn(`MouseManager.mouseMoved(): getNodes->setIsRolledOver(): [\n\t${node}\n\t]()}]`);
        node.setIsRolledOver();
      } else {
        node.setIsRolledOver(false);
      }
    });

    // Edges
    appModel.getEdges().forEach((edge) => {
      if (edge.checkBoundary(mouseX, mouseY)) {
        console.warn(`MouseManager.mouseMoved(): getToolList->setIsRolledOver(): [\n\t${edge}\n\t]()}]`);
        edge.setIsRolledOver();
      } else {
        edge.setIsRolledOver(false);
      }
    });

    // Toolbox
    if (appModel.getToolbox().checkBoundary(mouseX, mouseY)) {
      console.warn(`MouseManager.mouseMoved(): toolbox->setIsRolledOver()}]`);
      appModel.getToolbox().setIsRolledOver();
    }
    // Inspector
    if (appModel.getInspector().checkBoundary(mouseX, mouseY)) {
      console.warn(`MouseManager.mouseMoved(): inspector->setIsRolledOver()}]`);
      appModel.getInspector().setIsRolledOver();
    }
  }

  // INTERACTION (MOUSE)
  static mouseDragged(
    p: p5,
    appModel:ApplicationModel
    ): void {
      // console.log(`mouse dragged to : ${p.mouseX}, ${p.mouseY}`);
      const dragTarget:DraggableObject|null = this.getDragTarget(appModel);
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
  }
  
  static checkForSelectParam(
    pm:InputParameterModel|OutputParameterModel
  ):InputParameterModel|OutputParameterModel|null {
    const p = ApplicationModel.getP() as p5;
    let pmClicked = null;
    if (pm.checkBoundary(p.mouseX, p.mouseY)) {
      pm.setIsSelected();
      pmClicked = pm;
    }
    return pmClicked;
  }
    
  static checkForSelectPlug(n:NodeModel): void {
    const plugs = n.getPlugs();
    const p = ApplicationModel.getP() as p5;
    plugs.forEach((plug) => {
      if (plug.checkBoundary(p.mouseX, p.mouseY)) {
        plug.setIsSelected();
      }
    })
  }

  // INTERACTION (MOUSE)
  static mouseClicked(appModel:ApplicationModel): void {
    console.log(`mouse clicked`);
    const nodes:NodeModel[] = appModel.getNodes();
    // TODO: Deal with potential for more than one selected node
    const params:(InputParameterModel|OutputParameterModel)[] = [];
    let foundParam = false;
    if (appModel) {
      const selectedNodes = appModel.getSelectedNodes();
      if (selectedNodes && selectedNodes.length > 0) {
        const inputParams = (selectedNodes[0] as NodeModel).getInputParameterList();
        const outputParams = (selectedNodes[0] as NodeModel).getOutputParameterList();
        params.push(...inputParams);
        params.push(...outputParams);
        console.log(`params.length: ${params.length}`);
        for (let i = 0; i < params.length; i += 1) {
          const nextParam:InputParameterModel|OutputParameterModel|undefined = params[i];
          if (nextParam === undefined) { continue; }
          foundParam = MouseManager.checkForSelectParam(nextParam) !== null;
          // if (foundParam) { console.warn("FOUND PARAM, length is now: " + selectedNodes[0]?.getSelectedParameters().length); }
        }
      }
      if (foundParam) { return; }
      nodes.forEach((n) => {
        MouseManager.checkForSelectPlug(n);
        MouseManager.checkForSelectNode(appModel);
      });
    }
  }

  static mouseDoubleClicked(p: p5, arg1: ApplicationModel) {
    // throw new Error("Method not implemented.");
  }
    
  // LEFT OFF HERE
  // TODO: Make node editable on double click
  static doubleClicked(appModel:ApplicationModel): void {
    console.log(`mouse double clicked`);
    const nodes:NodeModel[] = appModel.getNodes();
  }

  // INTERACTION (MOUSE -- STUB)
  static mousePressed(
    // p: p5
  ): void {
    // console.log(`mouse pressed at : ${p.mouseX}, ${p.mouseY}`);
  }

  // INTERACTION (MOUSE)
  static clearDragTargets(appModel:ApplicationModel): void {
    // const appModel:ApplicationModel = (ChartManager.getApplicationModel() as ApplicationModel);
    appModel.getNodes().forEach((node) => {
      node.setIsDragging(false);
      node.getPlugs().forEach((plug) => plug.setIsDragging(false));
    });
    appModel.getEdges().forEach((edge) => edge.setIsDragging(false));
    appModel.getToolbox().getToolList().forEach((tool) => tool.setIsDragging(false));
  }

  // INTERACTION (MOUSE)
  static mouseReleased(p: p5, appModel:ApplicationModel): void {
    // const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
    if (appModel.getDynamicTool() !== null) {
      const newlyMintedNode = CreationManager.createNewObjectFromDynamicTool(appModel.getDynamicTool());
      appModel.getNodes().push(newlyMintedNode);
      appModel.setDynamicTool(null);
    }
    appModel.setDynamicTool(null);
    // if there is a dynamicTool in the slot,
    //  set the dynamicTool to null
    //  then create the new class (has info?) 
    this.clearDragTargets(appModel);
  }

  // INTERACTION
  // selectedNodes includes node to check if selected
  static checkForSelectNode(appModel:ApplicationModel): void {
    const nodes = appModel.getNodes();
    const mousePosition = new Position(
      (ApplicationModel.getP() as p5).mouseX,
      (ApplicationModel.getP() as p5).mouseY
    );
    
    for (let i = 0; i < nodes.length; i += 1) {
      if (nodes[i] !== null && nodes[i] !== undefined) {
        const node = nodes[i] as NodeModel;
        if (node.areParamsSelected() === false) {
          node.setIsSelected(false);
        }
        if (node.checkBoundary(mousePosition.x, mousePosition.y)) {
          // console.warn("FOUND NODE")
          node.setIsSelected();
        } else {
          // console.warn("DIDN'T FIND NODE")
        }
      }
    }
  }
  // INTERACTION (MOUSE)
  static getDragTarget(
    appModel:ApplicationModel
  ): DraggableObject|null {
    // const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
    const nodeList:NodeModel[] = appModel.getNodes();
    const edgeList:EdgeModel[] = appModel.getEdges();
    const plugList:PlugModel[] = appModel.getNodes().flatMap((node) => node.getPlugs());

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
          return node;
        }
      }
    }
    // return object that is being dragged, or null
    return null;
  }

  // INTERACTION
  selectNode(node: NodeModel): void {
    node.setIsSelected();
  }
  deselectNode(node: NodeModel): void {
    node.setIsSelected(false);
  }
  
  selectPlug(plug: PlugModel): void {
    plug.setIsSelected();
  }
  deselectPlug(plug: PlugModel): void {
    plug.setIsSelected(false);
  }
  
  selectParameter(parameter: InputParameterModel|OutputParameterModel): void {
    parameter.setIsSelected();
  }
  deselectParameter(parameter: InputParameterModel|OutputParameterModel): void {
    parameter.setIsSelected(false);
  }
  
  rolloverNode(node: NodeModel): void {
    node.setIsRolledOver();
  }
  rolloutNode(node: NodeModel): void {
    node.setIsRolledOver(false);
  }
  
  rolloverPlug(plug: PlugModel): void {
    plug.setIsRolledOver();
  }
  rolloutPlug(plug: PlugModel): void {
    plug.setIsRolledOver(false);
  }
  
  rolloverParameter(parameter: InputParameterModel|OutputParameterModel): void {
    parameter.setIsRolledOver();
  }
  rolloutParameter(parameter: InputParameterModel|OutputParameterModel): void {
    parameter.setIsRolledOver(false);
  }
}
export default MouseManager;