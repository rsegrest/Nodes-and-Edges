import GuiElementModel from "../abstract/GuiElement";
class InspectorRow extends GuiElementModel {
    constructor(rowNum) {
        super(true, false, false, false);
        this.rowNum = rowNum;
    }
}
export default InspectorRow;
