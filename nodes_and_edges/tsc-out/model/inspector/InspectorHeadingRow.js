import InspectorRow from "./InspectorRow";
class InspectorHeadingRow extends InspectorRow {
    constructor(content, rowNum) {
        super(rowNum);
        this.content = content;
    }
    clickAction() {
        // do nothing for now -- later expand / collapse
    }
    doubleClickAction() {
        // no op
    }
    getContent() {
        return this.content;
    }
    setContent(content) {
        this.content = content;
    }
    toString() {
        return `InspectorRowHeading[${this.content}]`;
    }
}
export default InspectorHeadingRow;
