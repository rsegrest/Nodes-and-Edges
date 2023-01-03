import Dimension from "./positioning/Dimension";
import Position from "./positioning/Position";
import ToolModel from "./ToolModel";

class DynamicToolModel extends ToolModel {
  
  constructor(
    name: string,
    icon: string,
    objectType: string, // describes object to create
    position: Position|null = null,
    dimensions: Dimension|null = null
  ) {
    super(name,icon,objectType,position,dimensions,"DynamicTool");
  }
}
export default DynamicToolModel;