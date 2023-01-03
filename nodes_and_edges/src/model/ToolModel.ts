import ElementGenerator from "./abstract/DraggableGuiElement";
import Dimension from "./positioning/Dimension";
import Position from "./positioning/Position";

class ToolModel extends ElementGenerator {
  public doubleClickAction(): void {
    throw new Error("Method not implemented.");
  }
  
  private icon: string;
  private objectType: string;
  constructor(
    private name: string,
    icon: string,
    objectType: string, // describes object to create
    position: Position|null = null,
    dimensions: Dimension|null = null,
    public readonly type = "Tool",
  ) {
    super(position,dimensions,false)
    this.name = name;
    this.icon = icon;
    this.objectType = objectType;
    this.setUpBoundary();
  }
  public getName(): string {
    return this.name;
  }
  public getIcon(): string {
    return this.icon;
  }
  public getObjectType(): string {
    return this.objectType;
  }
  public clickAction(): void {
    console.log('tool clicked');
  }
  public dragToPosition(position: Position): void {
    // throw(new Error('hit dragToPosition in ToolModel'));
    // console.warn('SHOULD HIT in TM -- tool dragged to position:  ', position);
    this.setPosition(position)
  }
  // override toString()
  public toString(): string {
    return `Tool: ${this.name}, ${this.icon}, ${this.objectType},\n\tPos: ${this.position},\n\tDim:${this.dimensions}`;
  }
}
export default ToolModel;