import GuiElementModel from "../abstract/GuiElement";
// import Dimension from "../positioning/Dimension";
// import Position from "../positioning/Position";
import InspectorTable from "./InspectorTable";
import LayoutInspector from "./LayoutInspector";
// TODO: Create panel model that is collapsible
class InspectorModel extends GuiElementModel {
    // TODO: Use InspectorLayout to set position and dimensions
    constructor() {
        super(true, false, // _isDraggable: fixed for now, might make this draggable later
        false, // _isResizable: future feature
        false, // _isSelectable: future feature
        LayoutInspector.getPosition(), LayoutInspector.getDimensions());
        // private parameterSet: any[] = [];
        this.type = "Inspector";
        this.displayedParamSet = [];
        this.isCollapsed = false;
        this.inspectorTable = null;
    }
    // TODO: ****** set up table using node params
    // TODO: test this
    createTable(node) {
        const imPos = this.position;
        console.warn(`InspectorModel.createTable(): imPos = ${imPos.toString()}`);
        this.inspectorTable = new InspectorTable(node, this.position);
    }
    getTable() {
        return this.inspectorTable;
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
