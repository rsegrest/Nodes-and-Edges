import Parameter from "./abstract/Parameter";
import ApplicationModel from "./ApplicationModel";

class OutputParameterModel extends Parameter {
  public doubleClickAction(info: any): void {
    this.isEditing = true;
    ApplicationModel.setEditTarget(this.value);
  }
    public readonly type = "OutputParameter";
    constructor(
        name: string,
        value: string|number,
        units: string|null = null,
        private isEditing = false
    ) {
      super(name, value, units);
      this.isEditing = isEditing;
    }
    public getValue(): string|number {
      return this.value;
    }
    public setValue(value: string|number): void {
      this.value = value;
    }
    public getIsEditing(): boolean {
      return this.isEditing;
    }
    public setIsEditing(isEditing: boolean): void {
      this.isEditing = isEditing;
    }
}
export default OutputParameterModel;