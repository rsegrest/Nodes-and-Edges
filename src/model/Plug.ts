import EdgeModel from "./EdgeModel";
import Layout from "./Layout";
import PlugPosition from "./PlugPosition";
import Position from "./Position";

class Plug {
  
  // Edge that this plug is plugged into (null if not plugged in)
  private plugSocket:EdgeModel|null = null;
  constructor(
    public readonly plugPosition:PlugPosition,
    private position:Position,
    private isSelected:boolean = false
  ) {
    this.plugPosition = plugPosition;
    this.position = position;
  }
  getPosition():Position {
    return this.position;
  }
  checkMouseOver(mouseX:number, mouseY:number):boolean {
    const distance = Layout.getDistance(
      this.position, new Position(mouseX, mouseY)
    );
    return distance < 15;
  }
  plugIn(edge:EdgeModel):void {
    this.plugSocket = edge;
  }
  toString():string {
    return `Plug: ${this.plugPosition}, position: ${this.position}, plugSocket: ${this.plugSocket}`;
  }
  setIsSelected(isSelected=true):void {
    this.isSelected = isSelected;
  }
  getIsSelected():boolean {
    return this.isSelected;
  }
}
export default Plug;
