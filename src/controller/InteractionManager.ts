import ApplicationModel from "../model/ApplicationModel";
import DynamicToolModel from "../model/DynamicToolModel";
import InspectorModel from "../model/inspector/InspectorModel";
import Dimension from "../model/positioning/Dimension";
import Layout from "../model/positioning/Layout";
import Position from "../model/positioning/Position";
import ToolboxModel from "../model/ToolboxModel";
import ToolModel from "../model/ToolModel";

class InteractionManager {

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
  static repositionElementOnResize(
    element: ToolboxModel|InspectorModel,
    windowWidth: number, windowHeight: number):void {
      Layout.resizeCanvas(windowWidth, windowHeight);
      Layout.positionPanel(element);
        return;
      }
  }
      
export default InteractionManager;