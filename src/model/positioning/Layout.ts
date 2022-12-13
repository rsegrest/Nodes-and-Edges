import p5 from "p5";
import GuiElementModel from "../abstract/GuiElement";
import InspectorModel from "../InspectorModel";
import ToolboxModel from "../ToolboxModel";
import Position from "./Position";

export class Layout {
  private static instance:Layout|null = null;
  public static readonly BASE_NODE_WIDTH = 100;
  public static readonly BASE_NODE_HEIGHT = 50;

  private width = 0;
  private height = 0;

  private constructor(p:p5) {
    this.width = p.width;
    this.height = p.height;
  }

  private static positionInspector(
    inspector:InspectorModel,
    // currently inspector is only in bottom left, so don't need width (yet)
    screenHeight:number
  ):void {
    if (inspector === null) { return; }
    const dim = inspector.getDimensions();
    if (dim === null) { return; }
    // const inspectorWidth = dim.width;
    const inspectorHeight = dim.height;
    const inspectorPosition = new Position(
      10,
      screenHeight - (inspectorHeight+10)
    );
    inspector.setPosition(inspectorPosition);
  }

  private static positionToolboxAndTools(
    toolbox:ToolboxModel,
    screenWidth:number,
    // currently toolbox is only in top right, so don't need height (yet)
  ):void {
    if (toolbox === null) { return; }
    const dim = toolbox.getDimensions();
    if (dim === null) { return; }
    const toolboxWidth = dim.width;
    // const toolboxHeight = dim.height;
    const toolboxPosition = new Position(
      screenWidth - (toolboxWidth+10),
      10
    );
    toolbox.setPosition(toolboxPosition);
    // Position tools
    const toolList = toolbox.getToolList();
    if (toolList === null) { return; }
    const toolCount = toolList.length;
    for (let i = 0; i < toolCount; i++) {
      const tool = toolList[i];
      const toolDim = tool.getDimensions();
      if (toolDim === null) { return; }
      // const toolWidth = toolDim.width;
      // const toolHeight = toolDim.height;
      const OFFSET_X = 10;
      const FIRST_ROW_Y = 40;
      tool.setPosition(
        new Position(
          (OFFSET_X+(toolboxPosition.x) + (90*(i%2))), // - (toolWidth + 10) + ((i % 2)*(toolWidth + 10))
          (toolboxPosition.y) + FIRST_ROW_Y + (Math.floor(i/2))*50
        )
      );
    }
  }
  public static positionElementBasedOnScreenSize(
    element:GuiElementModel,
    screenWidth:number,
    screenHeight:number
  ):void {
    if (element instanceof ToolboxModel) {
      Layout.positionToolboxAndTools(element, screenWidth);
    }
    if (element instanceof InspectorModel) {
      Layout.positionInspector(element, screenHeight);
    }
  }
  // Boilerplate getters and setters
  public createInstance(p:p5):Layout {
    if (Layout.instance === null) {
      Layout.instance = new Layout(p);
    }
    return Layout.instance;
  }
  public getInstance():Layout {
    if (Layout.instance === null) {
      throw new Error('Layout instance is not created yet');
    }
    return Layout.instance;
  }
  public static getDistance(
    position1:Position,
    position2:Position
  ):number {
    const x = position1.x - position2.x;
    const y = position1.y - position2.y;
    return Math.sqrt(x*x + y*y);
  }
}
export default Layout;