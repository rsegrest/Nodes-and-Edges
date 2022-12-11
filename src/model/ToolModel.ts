import ElementGenerator from "./abstract/DraggableGuiElement";
import Dimension from "./positioning/Dimension";
import Position from "./positioning/Position";

class ToolModel extends ElementGenerator {
  private icon: string;
  private objectType: string;
  constructor(
    private name: string,
    icon: string,
    objectType: string, // describes object to create
    position: Position|null = null,
    dimensions: Dimension|null = null
  ) {
    super(position,dimensions,false)
    this.name = name;
    this.icon = icon;
    this.objectType = objectType;
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
    console.log('tool dragged to position:  ', position);
  }
}
export default ToolModel;