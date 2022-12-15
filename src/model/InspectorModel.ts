import GuiElementModel from "./abstract/GuiElement";
import InputParameterModel from "./InputParameterModel";
import OutputParameterModel from "./OutputParameterModel";
import Dimension from "./positioning/Dimension";
import Position from "./positioning/Position";

// TODO: Create panel model that is collapsible
class InspectorModel extends GuiElementModel {
  // private parameterSet: any[] = [];
  public readonly type = "Inspector";
  private displayedParamSet:(InputParameterModel|OutputParameterModel)[] = [];
  private isCollapsed = false;

  constructor() {
    super(
      true,
      false, // _isDraggable: fixed for now, might make this draggable later
      false, // _isResizable: future feature
      false, // _isSelectable: future feature
      new Position(10,400),
      new Dimension(300, 190)
    );
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