import Dimension from "./positioning/Dimension";
import Position from "./positioning/Position";
import Boundary from './positioning/Boundary'
import PlugModel from './PlugModel';
import PlugPosition from "./PlugPosition";
import DraggableGuiElementModel from "./abstract/DraggableGuiElement";
import InputParameterModel from "./InputParameterModel";
import OutputParameterModel from "./OutputParameterModel";
import ApplicationModel from "./ApplicationModel";

export class NodeModel extends DraggableGuiElementModel {
  public readonly type = "Node";
  protected showNodes = false;
  protected plugs:PlugModel[];
  protected isHighlit = false;
  protected isEditing = false;
  // protected parameterList:ParameterModel[] = [];

  constructor(
    protected id: string,
    protected label: string,
    public position:Position,
    public dimensions:Dimension,
    protected inputParameterList:InputParameterModel[] = [],
    protected outputParameterList:OutputParameterModel[] = [],
    
  ) {
    super(position, dimensions);
    this.id = id;
    this.label = label;
    this.position = position;
    this.dimensions = dimensions;
    this.plugs = this.createPlugs();
    this.setUpBoundary();
  }
  getBoundary():Boundary|null {
    return super.getBoundary();
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
  getIsEditing(): boolean {
    return this.isEditing;
  }
  setLabel(newLabel: string):void {
    this.label = newLabel;
  }
  setIsEditing(isEditing:boolean):void {
    this.isEditing = isEditing;
  }
  // NOT USED (yet)
  // deselect():void {
  //   this.isSelected = false;
  // }
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
  getSelectedPlugs():PlugModel[] {
    return this.plugs.filter((plug) => plug.getIsSelected());
  }
  getPlugByPosition(plugPosition:PlugPosition|string):PlugModel {
    return this.plugs.find((plug) => plug.plugPosition === plugPosition) as PlugModel;
  }
  setIsRolledOver(isRolledOver=true):void {
    this.isRolledOver = isRolledOver;
  }
  getIsRolledOver():boolean {
    return this.isRolledOver;
  }
  // override GUIElementModel
  public rolloverAction(): void {
    this.isRolledOver = true;
    this.isHighlit = true;
    throw('NodeModel rolloverAction not implemented');
    console.log('NodeModel rolloverAction', this.toString());
  }
  // override GUIElementModel
  public clickAction(): void {
    console.log('clickAction: ');
    console.log('this: ', this);
    this.isSelected = true;
    this.isHighlit = true;
    const inspector = ApplicationModel.getInstance().getInspector();
    inspector.createTable(this);
    console.log('NodeModel onClick', this.toString());
  }
  // override GUIElementModel
  public doubleClickAction(): void {
    this.isEditing = true;
    ApplicationModel.setEditTarget(this);
    console.log('NodeModel doubleClickAction', this.toString());
  }
  // override setUpBoundary
  public setUpBoundary(): void {
    super.setUpBoundary(10);
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
    // console.log(`NodeModel dragToPosition ${position.toString()}`);
    const lastPosition = this.position;
    this.position = position;
    const deltaX = position.x - lastPosition.x;
    const deltaY = position.y - lastPosition.y;
    this.setUpBoundary();

    this.plugs.forEach((plug) => {
      if (plug !== null) {
        plug.setPosition(new Position(
          ((plug).position as Position).x + deltaX,
          ((plug).position as Position).y + deltaY,
        ));
      }
    });
  }
  public getInputParameterList():InputParameterModel[] {
    return this.inputParameterList;
  }
  public getOutputParameterList():OutputParameterModel[] {
    return this.outputParameterList;
  }
  public addInputParameter(inputParameter:InputParameterModel):void {
    this.inputParameterList.push(inputParameter);
  }
  public addOutputParameter(outputParameter:OutputParameterModel):void {
    this.outputParameterList.push(outputParameter);
  }
  public setInputParameterList(inputParameterList:InputParameterModel[]):void {
    this.inputParameterList = inputParameterList;
  }
  public setOutputParameterList(outputParameterList:OutputParameterModel[]):void {
    this.outputParameterList = outputParameterList;
  }
  public getSelectedParameters():(InputParameterModel|OutputParameterModel)[] {
    return [...this.inputParameterList,...this.outputParameterList]
      .filter((parameter) => parameter.getIsSelected());
  }
  public areParamsSelected():boolean {
    return this.getSelectedParameters().length > 0;
  }

  public toString():string {
    return `NodeModel: ${this.id} ${this.label} ${this.position.toString()} ${this.dimensions.toString()}`;
  }
  public toDyreqtJson():string {
    throw(new Error('NodeModel-- toDyreqtJson: not yet implemented'));
    return JSON.stringify({
      id: this.id,
      label: this.label,
      position: this.position,
      dimensions: this.dimensions,
    });
  }
}
export default NodeModel;
