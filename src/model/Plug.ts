import Layout from "./Layout";
import PlugPosition from "./PlugPosition";
import Position from "./Position";

class Plug {
  constructor(
    public readonly plugPosition:PlugPosition,
    private position:Position
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
}
export default Plug;
