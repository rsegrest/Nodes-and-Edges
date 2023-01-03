import GuiElementModel from "../abstract/GuiElement";
class InspectorInfoColumn extends GuiElementModel {
    constructor(content, columnNum) {
        super(true, false, false, true);
        this.content = content;
        this.columnNum = columnNum;
    }
    getContent() {
        return this.content;
    }
    setContent(content) {
        this.content = content;
    }
    clickAction() {
        // do nothing for now -- later expand / collapse
        console.log('Inspector Info Column: click action');
    }
    doubleClickAction() {
        // make editable
        console.log('Inspector Info Column: double-click action');
    }
    getColumnNum() {
        return this.columnNum;
    }
    setColumnNum(columnNum) {
        this.columnNum = columnNum;
    }
}
export default InspectorInfoColumn;
