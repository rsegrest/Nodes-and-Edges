import InputParameterModel from "../InputParameterModel";
import NodeModel from "../NodeModel";
import OutputParameterModel from "../OutputParameterModel";
import Position from "../positioning/Position";
import InspectorHeadingRow from "./InspectorHeadingRow";
import InspectorInfoRow from "./InspectorInfoRow";
import InspectorRow from "./InspectorRow";
import LayoutInspector from "./LayoutInspector";

// TODO: paging, num rows to display
class InspectorTable {
  private numCols:number;
  private rows:InspectorRow[];

  constructor(
    node:NodeModel,
    inspectorPosition:Position
  ) {
    const inputs = node.getInputParameterList();
    const outputs = node.getOutputParameterList();
    this.numCols = 2;
    this.rows = this.buildTable(inputs, outputs, inspectorPosition);
  }
  public getNumRows():number { return this.rows.length; }
  public getNumCols():number { return this.numCols; }
  private buildTable(
    inputParams:InputParameterModel[],
    outputParams:OutputParameterModel[],
    inspectorPosition:Position
  ):(InspectorHeadingRow|InspectorInfoRow)[] {
    const rows = LayoutInspector.createRowsFromInputAndOutputParameters(
      inputParams, outputParams
    );
    LayoutInspector.assignDimensionsToRows(rows);
    LayoutInspector.assignPositionsToRows(rows, inspectorPosition);
    LayoutInspector.assignBoundariesToRows(rows);
    // TODO: ********* DEBUG ********* -- boundary is not set correctly
    console.log(`row[1] boundary: ${(rows[1] as InspectorRow).getBoundary()}`);
    return rows;
  }

  public getRow(rowNum:number):InspectorHeadingRow|InspectorInfoRow|null {
    if (this.rows[rowNum] instanceof InspectorHeadingRow) { return this.rows[rowNum] as InspectorHeadingRow; }
    if (this.rows[rowNum] instanceof InspectorInfoRow) { return this.rows[rowNum] as InspectorInfoRow; }
    return null;
  }
  public getInfoRows():InspectorInfoRow[] {
    return this.rows.filter((row) => row instanceof InspectorInfoRow) as InspectorInfoRow[];
  }

  public toString():string {
    let str = "";
    for (let i = 0; i < this.rows.length; i++) {
      str += (this.rows[i])?.toString() + "\n";
    }
    return str;
  }
}

export default InspectorTable;