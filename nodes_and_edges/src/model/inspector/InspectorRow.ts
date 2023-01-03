import GuiElementModel from "../abstract/GuiElement";
import Position from "../positioning/Position";

abstract class InspectorRow extends GuiElementModel {
  protected rowNum: number;
  constructor(rowNum: number) {
    super(true, false, false, false);
    this.rowNum = rowNum;
  }
}
export default InspectorRow;