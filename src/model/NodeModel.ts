import Dimension from "./Dimension";
import Position from "./Position";

export type Boundary = {
  left: number;
  top: number;
  right: number;
  bottom: number;
}
export class NodeModel {
  private showNodes = false;
  constructor(
    private id: string,
    private label: string,
    public position:Position,
    public dimensions:Dimension,
  ) {
    this.id = id;
    this.label = label;
    this.position = position;
    this.dimensions = dimensions;
  }
  getBoundary():Boundary {
    return {
      left: this.position.x,
      top: this.position.y,
      right: this.position.x + this.dimensions.width,
      bottom: this.position.y + this.dimensions.height,
    };
  }
  checkMouseOver(mouseX:number, mouseY:number):boolean {
    // TODO: Create plugs as class instances
    // TODO: Each plug checks if mouse is over after this routine
    // TODO: iterate over plugs
    const boundary = this.getBoundary();
    const isOver = (
      mouseX >= boundary.left &&
      mouseX <= boundary.right &&
      mouseY >= boundary.top &&
      mouseY <= boundary.bottom
    );
    return isOver;
  }
  getID():string {
    return this.id;
  }
  getLabel():string {
    return this.label;
  }
  getShowNodes():boolean {
    return this.showNodes;
  }
}
export default NodeModel;
