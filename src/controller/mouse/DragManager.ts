import ApplicationModel from "../../model/ApplicationModel";
import EdgeModel from "../../model/EdgeModel";
import NodeModel from "../../model/NodeModel";
import PlugModel from "../../model/PlugModel";
import ToolModel from "../../model/ToolModel";
import { DraggableObject } from "../MouseManager";

class DragManager {
  static checkForEdgeDragTargets(
    appModel: ApplicationModel
  ):EdgeModel|null {
    const edgeList:EdgeModel[] = appModel.getEdges();
    // find edge drag targets
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
    return null;
  }
  
  static checkForPlugDragTargets(appModel: ApplicationModel):PlugModel|null {
    const plugList:PlugModel[] = appModel.getNodes().flatMap((node) => node.getPlugs());
    // find plug drag targets
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
    return null;
  }
  static checkForNodeDragTargets(
    appModel: ApplicationModel
  ):NodeModel|null {
    const nodeList:NodeModel[] = appModel.getNodes();
    // find node drag targets
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
    return null;
  }
  
  static checkForToolsDragTargets(
    appModel: ApplicationModel
  ): ToolModel|null {
    // check tools for drag targets
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
    return null;
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
  static getDragTarget(
    appModel:ApplicationModel
  ): DraggableObject|null {
    // const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
    const tool = DragManager.checkForToolsDragTargets(appModel);
    if (tool) {
      tool.setIsDragging(true);
      return tool;
    }
    const plug = DragManager.checkForPlugDragTargets(appModel);
    if (plug) {
      plug.setIsDragging(true);
      return plug;
    }
    const edge = DragManager.checkForEdgeDragTargets(appModel);
    if (edge) {
      edge.setIsDragging(true);
      return edge
    };
    const node = DragManager.checkForNodeDragTargets(appModel);
    if (node) {
      console.log('dragging node', node);
    }
    if (node) {
      node.setIsDragging(true);
      return node
    };
    return null;
  }
}
export default DragManager;