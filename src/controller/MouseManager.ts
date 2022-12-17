import CreationManager from "./CreationManager";
import ApplicationModel from "../model/ApplicationModel";
import EdgeModel from "../model/EdgeModel";
import NodeModel from "../model/NodeModel";
import PlugModel from "../model/PlugModel";
import ToolboxModel from "../model/ToolboxModel";
import ToolModel from "../model/ToolModel";
import RolloverManager from "./mouse/RolloverManager";
import ClickManager from "./mouse/ClickManager";
import DragManager from "./mouse/DragManager";

export type DraggableObject = NodeModel|EdgeModel|PlugModel|ToolboxModel|ToolModel;


class MouseManager {
  
  static mouseMoved(
    mouseX:number, mouseY:number,
    appModel:ApplicationModel
  ): void {
    RolloverManager.checkForRollover(mouseX, mouseY, appModel);
  }

  // INTERACTION (MOUSE)
  static mouseDragged(
    mouseX:number, mouseY:number,
    appModel:ApplicationModel
    ): void {
      // console.log(`mouse dragged to : ${p.mouseX}, ${p.mouseY}`);
      DragManager.getDragTarget(appModel);
  }

  // INTERACTION (MOUSE)
  static mouseClicked(
    mouseX:number, mouseY:number,
    appModel:ApplicationModel
  ): void {
    ClickManager.checkElementsForClick(
      mouseX, mouseY, appModel
    )
  }

  // LEFT OFF HERE
  // TODO: Make node editable on double click
  static doubleClicked(
    mouseX:number,
    mouseY:number,
    appModel:ApplicationModel
  ): void {
    console.log(`mouse double clicked`);
    // const nodes:NodeModel[] = appModel.getNodes();
  }

  // INTERACTION (MOUSE -- STUB)
  static mousePressed(
    mouseX:number, mouseY:number, appModel:ApplicationModel,
  ): void {
    // console.log(`mouse pressed at : ${p.mouseX}, ${p.mouseY}`);
  }


  // INTERACTION (MOUSE)
  static mouseReleased(mouseX:number, mouseY:number, appModel:ApplicationModel): void {
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
    DragManager.clearDragTargets(appModel);
  }


}
export default MouseManager;