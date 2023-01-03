import Layout from "../positioning/Layout";
import Dimension from "../positioning/Dimension";
import Position from "../positioning/Position";
import InspectorHeadingRow from "./InspectorHeadingRow";
import InspectorInfoRow from "./InspectorInfoRow";
// import InspectorInfoColumn from "./InspectorInfoColumn";
// import PlugModel from "../PlugModel";
// import Boundary from "../positioning/Boundary";
class LayoutInspector {
    static assignBoundariesToRows(rows) {
        rows.forEach((row) => {
            row.setUpBoundary();
        });
    }
    constructor(pos, dim) {
        LayoutInspector.position = pos;
        LayoutInspector.dimensions = dim;
        LayoutInspector.Y_POSITION = Layout.getHeight() - 200;
        LayoutInspector.layout = Layout.getInstance();
    }
    static createInstance(pos, dim) {
        // const newPos = new Position(10,400);
        // const newDim = new Dimension(300, 190);
        LayoutInspector.instance = new LayoutInspector(pos, dim);
        return LayoutInspector.instance;
    }
    static getInstance() {
        if (LayoutInspector.instance === null) {
            throw (new Error('InspectorLayout instance is null'));
        }
        return LayoutInspector.instance;
    }
    static getPosition() {
        return LayoutInspector.position;
    }
    static getDimensions() {
        return LayoutInspector.dimensions;
    }
    static createRowsFromInputAndOutputParameters(inputParams, outputParams) {
        let rowCount = 0;
        const createdRows = [];
        const inputHeading = new InspectorHeadingRow("Input Parameters", rowCount += 1);
        const inputRows = inputParams.map((param) => {
            return new InspectorInfoRow(param, rowCount += 1);
        });
        const outputHeading = new InspectorHeadingRow("Output Parameters", rowCount += 1);
        const outputRows = outputParams.map((param) => {
            return new InspectorInfoRow(param, rowCount += 1);
        });
        createdRows.push(inputHeading);
        createdRows.push(...inputRows);
        createdRows.push(outputHeading);
        createdRows.push(...outputRows);
        return createdRows;
    }
    static assignDimensionsToRows(rows, rowWidth = this.ROW_WIDTH, rowHeight = this.ROW_HEIGHT) {
        rows.forEach((row) => row.setDimensions(new Dimension(rowWidth, rowHeight)));
        return rows;
    }
    static assignPositionsToRows(rows, inspectorPosition, rowHeight = LayoutInspector.ROW_HEIGHT, yTableOffset = this.Y_FIRST_ROW_OFFSET) {
        rows.forEach((row, index) => row.setPosition(LayoutInspector.calcRowPosition(index, rowHeight, inspectorPosition.x, inspectorPosition.y, yTableOffset)));
        return rows;
    }
    static calcRowPosition(rowNum, rowHeight, xInspectorLeft = 0, yInspectorTop = 0, yTableOffset = 0) {
        const yCalc = yInspectorTop
            + (rowNum * rowHeight)
            + yTableOffset;
        const rowPos = new Position(xInspectorLeft, yCalc);
        return rowPos;
    }
    static setParameterDimensions(parameter, inspector) {
        parameter.setDimensions(new Dimension(inspector.dimensions.width, this.ROW_HEIGHT));
    }
}
LayoutInspector.DEFAULT_INSPECTOR_WIDTH = 600;
LayoutInspector.DEFAULT_INSPECTOR_HEIGHT = 300;
// SPIRAL 3 TODO: Make panel draggable using title bar
LayoutInspector.X_POSITION = 10;
LayoutInspector.Y_FIRST_ROW_OFFSET = 30;
LayoutInspector.ROW_HEIGHT = 30;
LayoutInspector.ROW_WIDTH = 600;
LayoutInspector.Y_TABLE_START = 20;
// Parameter row constants
LayoutInspector.PARAM_NAME_COLUMN_WIDTH = 150;
// public static readonly PARAM_VALUE_COLUMN_WIDTH = 150;
LayoutInspector.instance = null;
LayoutInspector.position = new Position(0, 0);
LayoutInspector.dimensions = new Dimension(0, 0);
export default LayoutInspector;
