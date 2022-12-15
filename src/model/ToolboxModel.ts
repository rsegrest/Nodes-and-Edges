import GuiElementModel from "./abstract/GuiElement";
import Dimension from "./positioning/Dimension";
import Position from "./positioning/Position";
import ToolModel from "./ToolModel";

class ToolboxModel extends GuiElementModel {
  public doubleClickAction(): void {
    throw new Error("Method not implemented.");
  }
  public readonly type = "Toolbox";
  private toolList: any[] = [];
  private isCollapsed = false;

  constructor() {
    super(
      true,
      false, // _isDraggable: fixed for now, might make this draggable later
      false, // _isResizable: future feature
      false, // _isSelectable: future feature
      new Position(600,10),
      new Dimension(190, 580)
    );
    this.initialize();
  }
  private initialize(): void {
    this.toolList.push(new ToolModel("Element", "E", "Element"));
    this.toolList.push(new ToolModel("Subelement", "S", "Subelement"));
    this.toolList.push(new ToolModel("Edge", "E", "Edge"));
    this.setToolLayout();
  }
  static findHorizontalCenterLine(
    tbm: ToolboxModel
  ):number {
    const pos = tbm.getPosition();
    if (!pos) return 0;
    return pos.x+95;
  }
  static ROW_SPACING = 60;
  // ~80
  static findFirstRowOffsetY(tbm: ToolboxModel):number {
    const pos = tbm.getPosition();
    if (!pos) return 0;
    const FIRST_ROW_OFFSET_Y = 30 + pos.y;
    return FIRST_ROW_OFFSET_Y;
  }
  // Center of [rowNum] (Y)
  static findRowCenterLineY(tbm:ToolboxModel, row:number):number {
    const firstRowOffsetY = this.findFirstRowOffsetY(tbm);
    return firstRowOffsetY+(row*this.ROW_SPACING);
  }
  static calcNumToolGridColumns(
    // tbm: ToolboxModel
  ):number {
    return 2;
  }
  static calcNumToolGridRows(
    // tbm: ToolboxModel
  ):number {
    return 6;
  }
  // NOT CURRENTLY USED?
  // TODO: Use this function to calculate position in ToolModel
  // static buildLocationSet(tbm: ToolboxModel):Position[]|null {
  //   // const p = RenderToolbox.getP();
  //   const pos = tbm.getPosition();
  //   if (!pos) return null;
  //   // const dim = tbm.getDimensions();
  //   const toolList = tbm.getToolList();

  //   const toolLocations:Position[] = [];
  //   // const CENTER_OFFSET_X = 45;

  //   // TODO: Use row and column count to calculate position
  //   // const rows = RenderToolbox.calcNumToolGridRows();
  //   // const columns = RenderToolbox.calcNumToolGridColumns();
    
  //   // find center line
  //   // find row center lines
  //   toolList.forEach((tool,i) => {
  //     const thisX = this.findHorizontalCenterLine(tbm); // -CENTER_OFFSET_X;
  //     // if (i%2 !== 0) {
  //     //   thisX += (CENTER_OFFSET_X*2);
  //     // }
  //     toolLocations.push(
  //       new Position(
  //         // if two rows, center plus or minus horizontal offset
  //         thisX,
  //         pos.y+(
  //           this.findFirstRowOffsetY(tbm)
  //         )+(Math.floor(i/2)*60)
  //       )
  //     );
  //   })
  //   return toolLocations;
  // }
  private setToolLayout(): void {
    const toolList = this.getToolList();
    const toolCount = toolList.length;
    // TODO: make this dynamic (2 lines)
    const toolWidth = 80;
    const toolHeight = 40;
    const FIRST_ROW_Y = 40;
    const OFFSET_X = 10;
    for (let i = 0; i < toolCount; i++) {
      const tool = toolList[i];
      tool.setDimensions(new Dimension(toolWidth, toolHeight));
      tool.setPosition(
        new Position(
          (OFFSET_X+(this.position as Position).x + (90*(i%2))), // - (toolWidth + 10) + ((i % 2)*(toolWidth + 10))
          (this.position as Position).y + FIRST_ROW_Y + (Math.floor(i/2))*50
        )
      )
    }
  }

  public getToolList(): any[] {
    return this.toolList;
  }
  public clickAction(): void {
    console.log("toolbox clicked");
  }
  // public getDimensions(): Dimension {
  //   return this.dimensions;
  // }
  // public setDimensions(dimensions: Dimension): void {
  //   this.dimensions = dimensions;
  // }
  // public getPosition(): { x: number; y: number } {
  //   return this.position;
  // }
  // public setPosition(position: { x: number; y: number }): void {
  //   this.position = position;
  // }
  public setIsCollapsed(isCollapsed=true): void {
    this.isCollapsed = isCollapsed;
  }
  public getIsCollapsed(): boolean {
    return this.isCollapsed;
  }
  // public getBoundary(): { left: number; top: number; right: number; bottom: number } | null {
  //   if (!this.position || !this.dimensions) {
  //     return null;
  //   }
  //   return {
  //     left: (this.position as Position).x,
  //     top: (this.position as Position).y,
  //     right: (this.position as Position).x + this.dimensions.width,
  //     bottom: (this.position as Position).y + this.dimensions.height,
  //   };
  // }
  public checkMouseOver(mouseX: number, mouseY: number): boolean {
    const boundary = this.getBoundary();
    if (!boundary) { return false; }
    const isOver = (
      mouseX >= (boundary.getLeft()) &&
      mouseX <= (boundary.getRight()) &&
      mouseY >= (boundary.getTop()) &&
      mouseY <= (boundary.getBottom())
    );
    return isOver;
  }
  // override toString
  public toString(): string {
    return "ToolboxModel";
  }
}
export default ToolboxModel;