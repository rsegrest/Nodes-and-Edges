// import p5 from "p5";
import ApplicationModel from "../model/ApplicationModel";
import DynamicToolModel from "../model/DynamicToolModel";
import InspectorModel from "../model/inspector/InspectorModel";
import Dimension from "../model/positioning/Dimension";
import Layout from "../model/positioning/Layout";
import Position from "../model/positioning/Position";
import ToolboxModel from "../model/ToolboxModel";
import ToolModel from "../model/ToolModel";

import InputParameterModel from "../model/InputParameterModel";
import NodeModel from "../model/NodeModel";
import OutputParameterModel from "../model/OutputParameterModel";
import PlugModel from "../model/PlugModel";
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
// static getClosestPlugsOnSelectedNode(appModel:ApplicationModel):PlugModel[] {
//   const selectedNodes = appModel.getSelectedNodes();
//   // Array for if multiple nodes are selected
//   // Right now, one at a time is selected, only
//   const closestPlugArray = [];
//   if (selectedNodes.length > 0) {
//     for (let i = 0; i < selectedNodes.length; i += 1) {
//       const p = ApplicationModel.getP() as p5;
//       const closestPlug = (selectedNodes[i] as NodeModel).getPlugClosestToMouse(
//         p.mouseX, p.mouseY
//       );
//       closestPlugArray.push(closestPlug);
//     }
//   }
//   return closestPlugArray as PlugModel[];
// }