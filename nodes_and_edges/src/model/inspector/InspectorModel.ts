import GuiElementModel from "../abstract/GuiElement";
import InputParameterModel from "../InputParameterModel";
import NodeModel from "../NodeModel";
import OutputParameterModel from "../OutputParameterModel";
import Position from "../positioning/Position";
// import Dimension from "../positioning/Dimension";
// import Position from "../positioning/Position";
import InspectorTable from "./InspectorTable";
import LayoutInspector from "./LayoutInspector";

// TODO: Create panel model that is collapsible
class InspectorModel extends GuiElementModel {
  // private parameterSet: any[] = [];
  public readonly type = "Inspector";
  private displayedParamSet:(InputParameterModel|OutputParameterModel)[] = [];
  private isCollapsed = false;
  private inspectorTable:InspectorTable|null = null;

  // TODO: Use InspectorLayout to set position and dimensions
  constructor() {
    super(
      true,
      false, // _isDraggable: fixed for now, might make this draggable later
      false, // _isResizable: future feature
      false, // _isSelectable: future feature
      LayoutInspector.getPosition(),
      LayoutInspector.getDimensions(),
      // new Position(10,400),
      // new Dimension(300, 190)
    );
  }

  // TODO: ****** set up table using node params
  // TODO: test this
  public createTable(node:NodeModel): void {
    const imPos = this.position as Position;
    console.warn(`InspectorModel.createTable(): imPos = ${imPos.toString()}`);
    this.inspectorTable = new InspectorTable(
      node, this.position as Position
    );
  }
  public getTable(): InspectorTable|null {
    return this.inspectorTable;
  }
  public clickAction(): void {
    console.log("inspector pane clicked");
  }
  public rolloverAction(): void {
    // do nothing
  }
  public doubleClickAction(): void {
    // do nothing
  }
  // For now, parameters held inside Nodes
  // public setDisplayedParamSet(paramSet: (InputParameterModel|OutputParameterModel)[]): void {
  //   this.displayedParamSet = paramSet;
  // }
  // public getDisplayedParamSet(): (InputParameterModel|OutputParameterModel)[] {
  //   return this.displayedParamSet;
  // }
}
export default InspectorModel;