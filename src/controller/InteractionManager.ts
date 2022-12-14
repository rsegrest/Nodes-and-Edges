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
      (ApplicationModel.getP() as p5).mouseX,
      (ApplicationModel.getP() as p5).mouseY
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

  // INTERACTION
  deselectNode(node: NodeModel): void {
    node.deselect();
  }

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