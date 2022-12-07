import PlugPosition from "./PlugPosition";
import Position from "./Position";

class Plug {
  constructor(
    private plugPosition:PlugPosition,
    private position:Position
  ) {
    this.plugPosition = plugPosition;
    this.position = position;
  }
  
}
export default Plug;
