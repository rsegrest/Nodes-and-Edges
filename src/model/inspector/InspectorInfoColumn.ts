import GuiElementModel from "../abstract/GuiElement";

class InspectorInfoColumn extends GuiElementModel {
  private content: string;
  private columnNum: number;
  constructor(content: string, columnNum: number) {
    super(true, false, false, true)
    this.content = content;
    this.columnNum = columnNum;
  }
  public getContent(): string {
    return this.content;
  }
  public setContent(content:string): void {
    this.content = content;
  }
  public clickAction(): void {
    // do nothing for now -- later expand / collapse
    console.log('Inspector Info Column: click action')
  }
  public doubleClickAction(): void {
    // make editable
    console.log('Inspector Info Column: double-click action')
  }
  public getColumnNum(): number {
    return this.columnNum;
  }
  public setColumnNum(columnNum:number): void {
    this.columnNum = columnNum;
  }
}
export default InspectorInfoColumn;