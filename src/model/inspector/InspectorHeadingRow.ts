import InspectorRow from "./InspectorRow";

class InspectorHeadingRow extends InspectorRow {
  
  private content: string;
  constructor(content:string, rowNum: number) {
      super(rowNum);
      this.content = content;
  }
  public clickAction(): void {
    // do nothing for now -- later expand / collapse
  }
  public doubleClickAction(): void {
    // no op
  }
  public getContent(): string {
    return this.content;
  }
  public setContent(content:string): void {
    this.content = content;
  }
  public toString():string {
    return `InspectorRowHeading[${this.content}]`;
  }
}
export default InspectorHeadingRow;