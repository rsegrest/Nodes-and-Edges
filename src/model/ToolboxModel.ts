import GuiElementModel from "./abstract/GuiElement";
import Dimension from "./positioning/Dimension";
import Position from "./positioning/Position";
import ToolModel from "./ToolModel";

class ToolboxModel extends GuiElementModel {
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
    this.toolList.push(new ToolModel("Element", "E", "Element"));
    this.toolList.push(new ToolModel("Subelement", "S", "Subelement"));
    this.toolList.push(new ToolModel("Edge", "E", "Edge"));
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
  public getBoundary(): { left: number; top: number; right: number; bottom: number } | null {
    if (!this.position || !this.dimensions) {
      return null;
    }
    return {
      left: (this.position as Position).x,
      top: (this.position as Position).y,
      right: (this.position as Position).x + this.dimensions.width,
      bottom: (this.position as Position).y + this.dimensions.height,
    };
  }
  public checkMouseOver(mouseX: number, mouseY: number): boolean {
    const boundary = this.getBoundary();
    if (!boundary) { return false; }
    const isOver = (
      mouseX >= (boundary.left) &&
      mouseX <= (boundary.right) &&
      mouseY >= (boundary.top) &&
      mouseY <= (boundary.bottom)
    );
    return isOver;
  }

}
export default ToolboxModel;