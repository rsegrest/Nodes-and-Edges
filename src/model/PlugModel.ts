import EdgeModel from "./EdgeModel";
import Layout from "./positioning/Layout";
import PlugPosition from "./PlugPosition";
import Position from "./positioning/Position";
import DraggableGuiElementModel from "./abstract/DraggableGuiElement";

class PlugModel extends DraggableGuiElementModel {
  // Edge that this plug is plugged into (null if not plugged in)
  private plugSocket:EdgeModel|null = null;
  constructor(
    public readonly plugPosition:PlugPosition,
    position:Position,
    private isHighlit:boolean = false,
  ) {
    super(
      position,
      null, // dimensions are null for plugs
      false // not resizable
    );
    this.plugPosition = plugPosition;
    this.position = position;
  }
  dragToPosition(position: Position): void {
    // drag will connect to another plug
    throw new Error("Method not implemented.");
  }
  clickAction(): void {
    throw new Error("Method not implemented.");
  }
  // override superclass method
  checkMouseOver(mouseX:number, mouseY:number):boolean {
    if (this.position !== null) {
      const distance = Layout.getDistance(
        this.position, new Position(mouseX, mouseY)
      );
      return distance < 15;
    }
    return false;
  }
  plugIn(edge:EdgeModel):void {
    this.plugSocket = edge;
  }
  toString():string {
    return `Plug: ${this.plugPosition}, position: ${this.position}, plugSocket: ${this.plugSocket}`;
  }
  // setIsSelected(isSelected=true):void {
  //   this.isSelected = isSelected;
  // }
  // getIsSelected():boolean {
  //   return this.isSelected;
  // }
  setIsHighlit(isHighlit=true):void {
    this.isHighlit = isHighlit;
  }
  getIsHighlit():boolean {
    return this.isHighlit;
  }
  // getIsDragging():boolean {
  //   return this.isDragging;
  // }
  // setIsDragging(isDragging:boolean):void {
  //   this.isDragging = isDragging;
  // }
  // setPosition(position: Position):void {
  //   this.position = position;
  // }

}
export default PlugModel;
