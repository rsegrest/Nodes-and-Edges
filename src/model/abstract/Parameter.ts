import GuiElementModel from "./GuiElement";

abstract class Parameter extends GuiElementModel {
  private name: string;
  private value: any;
  private units: string|null;
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
  public setValue(value: string|number|null): void {
    this.value = value;
  }
  public setUnits(units: string|null): void {
    this.name = `${this.name} (${units})`;
  }
  public clickAction(): void {
    console.log("Parameter clicked");
  }

  public toString(): string {
    let outputString = `Parameter: ${this.name}, value: ${this.value}`;
    if (this.units !== null) {
      outputString += `, units: ${this.units}`;
    }
    return outputString;
  }
  public toJson(): string {
    return JSON.stringify(this);
  }
}
export default Parameter;