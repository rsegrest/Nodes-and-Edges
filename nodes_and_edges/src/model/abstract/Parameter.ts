import GuiElementModel from "./GuiElement";
import ParameterFieldType from "./ParameterFieldType";

abstract class Parameter extends GuiElementModel {
  protected name: string;
  protected value: any;
  protected units: string|null;
  protected isHighlit = false;
  protected editingField:ParameterFieldType|null = null;
  protected typeColor = "blue";
 
  constructor(
    name: string,
    value: string|number|null,
    units: string|null = null
  ) {
    super(true,false,false,true);
    this.name = name;
    this.value = value;
    this.units = units;
  }
  public getName(): string {
    return this.name;
  }
  public getValue(): any {
    return this.value;
  }
  public getUnits(): string|null {
    return this.units;
  }
  public getEditingField(): ParameterFieldType|null {
    return this.editingField;
  }
  public setValue(value: string|number|null): void {
    this.value = value;
  }
  public setUnits(units: string|null): void {
    this.name = `${this.name} (${units})`;
  }
  public setEditingField(pft:ParameterFieldType): void {
    this.editingField = pft;
  }
  public clickAction(): void {
    this.isSelected = true;
    this.isHighlit = true;
  }
  public toJson(): string {
    return JSON.stringify(this);
  }
  public toString(): string {
    let outputString = `Parameter: ${this.name}, value: ${this.value}`;
    if (this.units !== null) {
      outputString += `, units: ${this.units}`;
    }
    return outputString;
  }
}
export default Parameter;