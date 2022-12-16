import InputParameterModel from "../InputParameterModel";
import OutputParameterModel from "../OutputParameterModel";
import InspectorInfoColumn from "./InspectorInfoColumn";
import InspectorRow from "./InspectorRow";

class InspectorInfoRow extends InspectorRow {

  private columns: InspectorInfoColumn[];
  constructor(parameter:(InputParameterModel|OutputParameterModel), rowNum: number) {
      super(rowNum);
      this.columns = [
        new InspectorInfoColumn(parameter.getName(),0),
        new InspectorInfoColumn(`${parameter.getValue()} ${parameter.getUnits()}`,1)
      ];
  }
  getColumns(): InspectorInfoColumn[] {
    return this.columns;
  }
  public clickAction(): void {
    throw new Error("Method not implemented.");
  }
  public doubleClickAction(): void {
    throw new Error("Method not implemented.");
  }
  public toString():string {
    return `InspectorRowInfo[${this.columns[0]?.getContent()}]`;
  }
}
export default InspectorInfoRow;