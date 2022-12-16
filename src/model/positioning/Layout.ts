import GuiElementModel from "../abstract/GuiElement";
import ApplicationModel from "../ApplicationModel";
import InspectorModel from "../inspector/InspectorModel";
import ToolboxModel from "../ToolboxModel";
import Dimension from "./Dimension";
import Position from "./Position";

export class Layout {
  private static instance:Layout|null = null;
  public static readonly BASE_NODE_WIDTH = 100;
  public static readonly BASE_NODE_HEIGHT = 50;

  private static width = 0;
  private static height = 0;

  private constructor(width:number, height:number) {
    Layout.width = width;
    Layout.height = height;
    Layout.positionPanel(ApplicationModel.getInstance().getInspector());
    Layout.positionPanel(ApplicationModel.getInstance().getToolbox());
  }

  public static resizeCanvas(width:number, height:number):void {
    this.width = width;
    this.height = height;
  }

  private static calcInspectorPosition(
    inspector:InspectorModel,
  ):void {
    if (inspector === null) { return; }
    const inspectorWidth = 600;
    const inspectorHeight = 300;
    inspector.setDimensions(new Dimension(inspectorWidth, inspectorHeight));
    
    console.log('Layout.height : ' + Layout.height);
    const inspectorPosition = new Position(
      10,
      this.height - (inspectorHeight+10)
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
  public static positionPanel(
    element:GuiElementModel
  ):void {
    if ((this.width === 0) || (this.height === 0)) {
      throw new Error('Layout dimensions are not set');
    }
    if (element instanceof ToolboxModel) {
      Layout.positionToolboxAndTools(element, this.width);
    }
    if (element instanceof InspectorModel) {
      Layout.calcInspectorPosition(element);
    }
  }
  // Boilerplate getters and setters
  public static createInstance(width:number, height:number):Layout {
    if (Layout.instance === null) {
      Layout.instance = new Layout(width, height);
    }
    return Layout.instance;
  }
  public static getInstance():Layout {
    if (Layout.instance === null) {
      Layout.instance = new Layout(0,0);
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
  public static getWidth():number {
    return Layout.width;
  }
  public static getHeight():number {
    return Layout.height;
  }
}
export default Layout;