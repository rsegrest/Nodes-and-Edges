import Dimension from "./positioning/Dimension";
import Position from "./positioning/Position";
import PlugModel from './PlugModel';
import PlugPosition from "./PlugPosition";
import DraggableGuiElementModel from "./abstract/DraggableGuiElement";
export type Boundary = {
  left: number;
  top: number;
  right: number;
  bottom: number;
}
export class NodeModel extends DraggableGuiElementModel {

  protected showNodes = false;
  protected plugs:PlugModel[];
  
  constructor(
    protected id: string,
    protected label: string,
    public position:Position,
    public dimensions:Dimension,
  ) {
    super(position, dimensions);
    this.id = id;
    this.label = label;
    this.position = position;
    this.dimensions = dimensions;
    this.plugs = this.createPlugs();
  }
  getBoundary():Boundary|null {
    return super.getBoundary(10);
  }
  createPlugs():PlugModel[] {
    const plugArray = [];
    const plugPositions = [
      PlugPosition.NW,
      PlugPosition.SW,
      PlugPosition.SE,
      PlugPosition.NE,

      PlugPosition.N,
      PlugPosition.S,
      PlugPosition.E,
      PlugPosition.W,
    ];
    for (let i = 0; i < 8; i++) {
      const addPlug = new PlugModel(
        plugPositions[i] as PlugPosition,
        this.getPlugPosition(plugPositions[i] as PlugPosition) as Position,
      );
      plugArray.push( addPlug );
    }
    return plugArray;
  }
  setSelected(isSelected=true):void {
    this.isSelected = isSelected;
  }
  deselect():void {
    this.isSelected = false;
  }
  getIsSelected():boolean {
    return this.isSelected;
  }
  getPlugPosition(plugPosition:PlugPosition):Position {
    const x = this.position.x;
    const y = this.position.y;
    const width = this.dimensions.width;
    const height = this.dimensions.height;
    switch(plugPosition) {
      case PlugPosition.NW:
        return new Position(x+3,y);
      case PlugPosition.N:
        return new Position(x+3+width/2,y);
      case PlugPosition.NE:
        return new Position(x+3+width,y);
      case PlugPosition.SW:
        return new Position(x+3,y+height);
      case PlugPosition.S:
        return new Position(x+3+width/2,y+height);
      case PlugPosition.SE:
        return new Position(x+3+width,y+height);
      case PlugPosition.W:
        return new Position(x+3,y+height/2);
      case PlugPosition.E:
        return new Position(x+3+width,y+height/2);
      default:
        return new Position(0,0);
    }
  }
  highlightClosestPlug(mouseX:number, mouseY:number):void {
    this.plugs.forEach((plug:PlugModel) => {
      plug.setIsHighlit(false);
    })
    const closestPlug = this.getPlugClosestToMouse(mouseX, mouseY);
    if (closestPlug) {
      closestPlug.setIsHighlit();
    }
  }
  getPlugClosestToMouse(mouseX:number, mouseY:number):PlugModel|null {
    let closestPlug:PlugModel|null = null;
    let closestDistance = 100000;
    for (let i = 0; i < this.plugs.length; i++) {
      const plug = this.plugs[i] as PlugModel;
      const distance = (
        (plug as PlugModel).position as Position)
          .getDistance(new Position(mouseX, mouseY)
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestPlug = plug;
      }
    }
    return closestPlug;
  }
  getID():string {
    return this.id;
  }
  getLabel():string {
    return this.label;
  }
  getShowNodes():boolean {
    return this.showNodes;
  }
  getPlugs():PlugModel[] {
    return this.plugs;
  }
  getPlugByPosition(plugPosition:PlugPosition):PlugModel {
    return this.plugs.find((plug) => plug.plugPosition === plugPosition) as PlugModel;
  }
  setIsRolledOver(isRolledOver=true):void {
    this.isRolledOver = isRolledOver;
  }
  getIsRolledOver():boolean {
    return this.isRolledOver;
  }
  // override GUIElementModel
  public clickAction(): void {
    console.log('NodeModel onClick', this.toString());
  }
  // override GUIElementModel
  public setIsDragging(isDragging:boolean): void {
    this.setCursor(isDragging);
    
    this.isDragging = isDragging;
    this.plugs.forEach((plug) => {
      plug.setIsDragging(true);
    });
  }
  public dragToPosition(position:Position):void {
    console.log(`NodeModel dragToPosition ${position.toString()}`);
    const lastPosition = this.position;
    this.position = position;
    const deltaX = position.x - lastPosition.x;
    const deltaY = position.y - lastPosition.y;

    this.plugs.forEach((plug) => {
      if (plug !== null) {
        plug.setPosition(new Position(
          ((plug).position as Position).x + deltaX,
          ((plug).position as Position).y + deltaY,
        ));
      }
    });
  }
  public toString():string {
    return `NodeModel: ${this.id} ${this.label} ${this.position.toString()} ${this.dimensions.toString()}`;
  }
}
export default NodeModel;
