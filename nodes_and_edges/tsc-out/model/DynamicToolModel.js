import ToolModel from "./ToolModel";
class DynamicToolModel extends ToolModel {
    constructor(name, icon, objectType, // describes object to create
    position = null, dimensions = null) {
        super(name, icon, objectType, position, dimensions, "DynamicTool");
    }
}
export default DynamicToolModel;
