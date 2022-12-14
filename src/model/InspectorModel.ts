import GuiElementModel from "./abstract/GuiElement";
import Dimension from "./positioning/Dimension";
import Position from "./positioning/Position";

// TODO: Create panel model that is collapsible
class InspectorModel extends GuiElementModel {
  // private parameterSet: any[] = [];
  public readonly type = "Inspector";
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
}
export default InspectorModel;