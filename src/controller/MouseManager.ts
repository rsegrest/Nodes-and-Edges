import p5 from "p5";
// import DraggableGuiElementModel from "../model/abstract/DraggableGuiElement";
import CreationManager from "./CreationManager";
import ApplicationModel from "../model/ApplicationModel";
import EdgeModel from "../model/EdgeModel";
import NodeModel from "../model/NodeModel";
import PlugModel from "../model/PlugModel";
import ToolboxModel from "../model/ToolboxModel";
import ToolModel from "../model/ToolModel";
import InteractionManager from "./InteractionManager";


export type DraggableObject = NodeModel|EdgeModel|PlugModel|ToolboxModel|ToolModel;


class MouseManager {

  // INTERACTION (MOUSE -- STUB)
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
    // console.log(`2. drag target assigned as ${testTarget}`);
    
  }

  // INTERACTION (MOUSE)
  static mouseClicked(appModel:ApplicationModel): void {
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
      const p = ApplicationModel.getP() as p5;
      plugs.forEach((plug) => {
        if (plug.checkMouseOver(p.mouseX, p.mouseY)) {
          plug.setIsSelected();
        }
      })
      InteractionManager.checkForSelectNode(appModel);
    });
  }

  // INTERACTION (MOUSE -- STUB)
  static mousePressed(p: p5): void {
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

  // INTERACTION (MOUSE)
  static getDragTarget(
    appModel:ApplicationModel
  ): DraggableObject|null {
    // const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
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
}
export default MouseManager;