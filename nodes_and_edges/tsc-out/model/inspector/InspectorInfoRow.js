import ApplicationModel from "../ApplicationModel";
import InspectorInfoColumn from "./InspectorInfoColumn";
import InspectorRow from "./InspectorRow";
class InspectorInfoRow extends InspectorRow {
    constructor(parameter, rowNum) {
        super(rowNum);
        this.isEditing = false;
        this.parameter = parameter;
        this.columns = [
            new InspectorInfoColumn(parameter.getName(), 0),
            new InspectorInfoColumn(`${parameter.getValue()} ${parameter.getUnits()}`, 1)
        ];
    }
    getColumns() {
        return this.columns;
    }
    clickAction() {
        throw new Error("Method not implemented.");
    }
    getValue() {
        console.log(`InspectorInfoRow.getValue()`);
        return this.parameter.getValue().toString();
    }
    setValue(value) {
        this.parameter.setValue(value);
        this.columns = [
            new InspectorInfoColumn(this.parameter.getName(), 0),
            new InspectorInfoColumn(`${this.parameter.getValue()} ${this.parameter.getUnits()}`, 1)
        ];
    }
    doubleClickAction() {
        this.isEditing = true;
        ApplicationModel.setEditTarget(this);
    }
    toString() {
        var _a;
        return `InspectorRowInfo[${(_a = this.columns[0]) === null || _a === void 0 ? void 0 : _a.getContent()}]`;
    }
}
export default InspectorInfoRow;
