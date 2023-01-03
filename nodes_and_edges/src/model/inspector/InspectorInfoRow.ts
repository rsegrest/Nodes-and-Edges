import Parameter from "../abstract/Parameter";
import ApplicationModel from "../ApplicationModel";
import InputParameterModel from "../InputParameterModel";
import OutputParameterModel from "../OutputParameterModel";
import InspectorInfoColumn from "./InspectorInfoColumn";
import InspectorRow from "./InspectorRow";

class InspectorInfoRow extends InspectorRow {

  private columns: InspectorInfoColumn[];
  private parameter: InputParameterModel|OutputParameterModel;
  private isEditing = false;
  constructor(parameter:(InputParameterModel|OutputParameterModel), rowNum: number) {
      super(rowNum);
      this.parameter = parameter;
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
  public getValue(): string {
    console.log(`InspectorInfoRow.getValue()`);
    return this.parameter.getValue().toString();
  }
  public setValue(
    value: string,
    // refToThis:InspectorInfoRow|null=null
  ): void {
    this.parameter.setValue(value);
    this.columns = [
      new InspectorInfoColumn(this.parameter.getName(),0),
      new InspectorInfoColumn(`${this.parameter.getValue()} ${this.parameter.getUnits()}`,1)
    ];
  }
  public doubleClickAction(): void {
    this.isEditing = true;
    ApplicationModel.setEditTarget(this);
  }
  public toString():string {
    return `InspectorRowInfo[${this.columns[0]?.getContent()}]`;
  }
}
export default InspectorInfoRow;