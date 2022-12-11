import Dimension from "./positioning/Dimension";
import ToolModel from "./ToolModel";

class ToolboxModel {
  private toolList: any[] = [];
  private dimensions = new Dimension(190, 580);
  private position = { x: 600, y: 10 };
  private isCollapsed = false;
  constructor() {
    this.toolList.push(new ToolModel("Element", "E", "Element"));
    this.toolList.push(new ToolModel("Subelement", "S", "Subelement"));
    this.toolList.push(new ToolModel("Edge", "E", "Edge"));
  }
  public getToolList(): any[] {
    return this.toolList;
  }
  public getDimensions(): Dimension {
    return this.dimensions;
  }
  public setDimensions(dimensions: Dimension): void {
    this.dimensions = dimensions;
  }
  public getPosition(): { x: number; y: number } {
    return this.position;
  }
  public setPosition(position: { x: number; y: number }): void {
    this.position = position;
  }
  public setIsCollapsed(isCollapsed=true): void {
    this.isCollapsed = isCollapsed;
  }
  public getIsCollapsed(): boolean {
    return this.isCollapsed;
  }
  public getBoundary(): { left: number; top: number; right: number; bottom: number } {
    return {
      left: this.position.x,
      top: this.position.y,
      right: this.position.x + this.dimensions.width,
      bottom: this.position.y + this.dimensions.height,
    };
  }
  public checkMouseOver(mouseX: number, mouseY: number): boolean {
    const boundary = this.getBoundary();
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