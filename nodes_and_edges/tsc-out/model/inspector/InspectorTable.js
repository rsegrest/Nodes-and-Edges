import InspectorHeadingRow from "./InspectorHeadingRow";
import InspectorInfoRow from "./InspectorInfoRow";
import LayoutInspector from "./LayoutInspector";
// TODO: paging, num rows to display
class InspectorTable {
    constructor(node, inspectorPosition) {
        const inputs = node.getInputParameterList();
        const outputs = node.getOutputParameterList();
        this.numCols = 2;
        this.rows = this.buildTable(inputs, outputs, inspectorPosition);
    }
    getNumRows() { return this.rows.length; }
    getNumCols() { return this.numCols; }
    buildTable(inputParams, outputParams, inspectorPosition) {
        const rows = LayoutInspector.createRowsFromInputAndOutputParameters(inputParams, outputParams);
        LayoutInspector.assignDimensionsToRows(rows);
        LayoutInspector.assignPositionsToRows(rows, inspectorPosition);
        LayoutInspector.assignBoundariesToRows(rows);
        // TODO: ********* DEBUG ********* -- boundary is not set correctly
        console.log(`row[1] boundary: ${rows[1].getBoundary()}`);
        return rows;
    }
    getRow(rowNum) {
        if (this.rows[rowNum] instanceof InspectorHeadingRow) {
            return this.rows[rowNum];
        }
        if (this.rows[rowNum] instanceof InspectorInfoRow) {
            return this.rows[rowNum];
        }
        return null;
    }
    getInfoRows() {
        return this.rows.filter((row) => row instanceof InspectorInfoRow);
    }
    toString() {
        var _a;
        let str = "";
        for (let i = 0; i < this.rows.length; i++) {
            str += ((_a = (this.rows[i])) === null || _a === void 0 ? void 0 : _a.toString()) + "\n";
        }
        return str;
    }
}
export default InspectorTable;
