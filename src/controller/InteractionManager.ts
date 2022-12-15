import p5 from "p5";
import ApplicationModel from "../model/ApplicationModel";
import DynamicToolModel from "../model/DynamicToolModel";
import InspectorModel from "../model/InspectorModel";
import NodeModel from "../model/NodeModel";
import PlugModel from "../model/PlugModel";
import Dimension from "../model/positioning/Dimension";
import Layout from "../model/positioning/Layout";
import Position from "../model/positioning/Position";
import ToolboxModel from "../model/ToolboxModel";
import ToolModel from "../model/ToolModel";

class InteractionManager {

  // 9 - Tab
  // 13 - Enter
  // 16-18 - Shift, Ctrl, Alt
  // 20 - CapsLock
  // 27 - Escape
  // 37-40 - arrow keys
  // 91-93 - left WIN, right WIN, popup
  // 112-123 - F1-F12

  // 12 - NumPad 5
  // 32 - Space
  static isNonPrintingCharacter(keyCode: number): boolean {
    if (keyCode === 12) { return false; } // NumPad 5
    if (keyCode === 13) { return false; } // Enter
    if (keyCode === 32) { return false; } // Space
    return (
      (keyCode <= 47)
      || (keyCode >= 91 && keyCode <= 93) // left WIN, right WIN, popup
      || (keyCode >= 112 && keyCode <= 123) // F1-F12 keys
    );
  }

  static handleKeyPress(p: p5):void {
    if (ApplicationModel.getEditTarget()) {
      console.log('keyTyped', p.key, p.keyCode)
      if (p.keyCode === p.ENTER) {
        ApplicationModel.setEditTarget(null);
      }
      if (
        (p.keyCode === p.DELETE)
        || (p.keyCode === p.BACKSPACE)) {
          console.log('hit backspace');
          ApplicationModel.backspaceEditTarget();
      }
      if (this.isNonPrintingCharacter(p.keyCode)) {
        return;
      } else {
        ApplicationModel.addCharacterToEditTarget(p.key);
      }
    }
  }

  // INTERACTION
  static resizeCanvas(
    appModel:ApplicationModel,
    windowWidth: number, windowHeight: number
  ):void {
    // const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
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
  static dragDynamicTool(
    appModel:ApplicationModel,
    pos: Position,
    tool:ToolModel|null=null
    ):void {
    let dynamicTool:DynamicToolModel|null = appModel.getDynamicTool();
    if (dynamicTool === null) {
      // CREATE NEW
      dynamicTool = new DynamicToolModel(
        tool?.getName() as string,
        tool?.getIcon() as string,
        tool?.getObjectType() as string,
        tool?.position as Position,
        tool?.dimensions as Dimension,)
      appModel.setDynamicTool(dynamicTool);
    }
    (dynamicTool as DynamicToolModel).dragToPosition(pos);
  }

  // INTERACTION
  static getClosestPlugsOnSelectedNode(appModel:ApplicationModel):PlugModel[] {
    const selectedNodes = appModel.getSelectedNodes();
    // Array for if multiple nodes are selected
    // Right now, one at a time is selected, only
    const closestPlugArray = [];
    if (selectedNodes.length > 0) {
      for (let i = 0; i < selectedNodes.length; i += 1) {
        const p = ApplicationModel.getP() as p5;
        const closestPlug = (selectedNodes[i] as NodeModel).getPlugClosestToMouse(
          p.mouseX, p.mouseY
        );
        closestPlugArray.push(closestPlug);
      }
    }
    return closestPlugArray as PlugModel[];
  }

  // INTERACTION
  selectNode(node: NodeModel): void {
    node.setSelected();
  }

  // INTERACTION -- NOT USED
  // deselectNode(node: NodeModel): void {
  //   node.deselect();
  // }

  // INTERACTION
  static repositionElementOnResize(
    element: ToolboxModel|InspectorModel,
    windowWidth: number, windowHeight: number):void {
    Layout.positionElementBasedOnScreenSize(
      element, windowWidth, windowHeight );
    return;
  }
}

export default InteractionManager;