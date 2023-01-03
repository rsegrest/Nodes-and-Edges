import GuiElementModel from "./abstract/GuiElement";
import Dimension from "./positioning/Dimension";
import Position from "./positioning/Position";
// TODO: Create panel model that is collapsible
class InspectorPanelModel extends GuiElementModel {
    constructor() {
        super(true, false, // _isDraggable: fixed for now, might make this draggable later
        false, // _isResizable: future feature
        false, // _isSelectable: future feature
        new Position(10, 400), new Dimension(300, 190));
        // private parameterSet: any[] = [];
        this.isCollapsed = false;
        // this.toolList.push(new ToolModel("Element", "E", "Element"));
        // this.toolList.push(new ToolModel("Subelement", "S", "Subelement"));
        // this.toolList.push(new ToolModel("Edge", "E", "Edge"));
    }
    clickAction() {
        console.log("inspector pane clicked");
    }
}
export default InspectorPanelModel;
