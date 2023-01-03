import GuiElementModel from "./abstract/GuiElement";
import Dimension from "./positioning/Dimension";
import Position from "./positioning/Position";
// TODO: Create panel model that is collapsible
class InspectorModel extends GuiElementModel {
    // TODO: Use InspectorLayout to set position and dimensions
    constructor() {
        super(true, false, // _isDraggable: fixed for now, might make this draggable later
        false, // _isResizable: future feature
        false, // _isSelectable: future feature
        new Position(10, 400), new Dimension(300, 190));
        // private parameterSet: any[] = [];
        this.type = "Inspector";
        this.displayedParamSet = [];
        this.isCollapsed = false;
    }
    clickAction() {
        console.log("inspector pane clicked");
    }
    rolloverAction() {
        // do nothing
    }
    doubleClickAction() {
        // do nothing
    }
}
export default InspectorModel;
