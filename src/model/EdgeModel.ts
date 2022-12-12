import DraggableGuiElementModel from "./abstract/DraggableGuiElement";
import NodeModel from "./NodeModel";
import PlugModel from "./PlugModel";
import Position from "./positioning/Position";

class EdgeModel extends DraggableGuiElementModel {

  protected id:string;
  protected sourceNode:NodeModel|null = null;
  protected targetNode:NodeModel|null = null;
  protected sourcePlug:PlugModel|null = null;
  protected targetPlug:PlugModel|null = null;

  constructor(
    id:string,
    sourceNode:NodeModel,
    targetNode?:NodeModel,
    sourcePlug?:PlugModel,
    targetPlug?:PlugModel,
  ) {
    super(null,null,false);
    this.id = id;
    this.sourceNode = sourceNode;
    if (targetNode) {
      this.targetNode = targetNode;
    }
    if (sourcePlug) {
      this.sourcePlug = sourcePlug;
    }
    if (targetPlug) {
      this.targetPlug = targetPlug;
    }
  }
  connectSource(node:NodeModel, plug:PlugModel|null=null):void {
    this.sourceNode = node;
    if (plug) {
      this.sourcePlug = plug;
    }
  }
  connectTarget(node:NodeModel, plug:PlugModel|null=null):void {
    this.targetNode = node;
    if (plug) {
      this.targetPlug = plug;
    }
  }
  getSourceNode():NodeModel|null {
    return this.sourceNode;
  }
  getTargetNode():NodeModel|null {
    return this.targetNode;
  }
  getSourcePlug():PlugModel|null {
    return this.sourcePlug;
  }
  getTargetPlug():PlugModel|null {
    return this.targetPlug;
  }
  getId():string {
    return this.id;
  }
  public dragToPosition(position: Position): void {
    throw new Error("Method not implemented.");
  }
  public clickAction(): void {
    throw new Error("Method not implemented.");
  }
  public toString():string {
    return `EdgeModel: ${this.id}, sourceNode: ${this.sourceNode}, targetNode: ${this.targetNode}, sourcePlug: ${this.sourcePlug}, targetPlug: ${this.targetPlug}`;
  }
  public toDyreqtJson():JSON {
    throw new Error("EdgeModel-- toDyreqtJson: Method not implemented.");
    const json = {
      id: this.id,
      sourceNode: this.sourceNode,
      targetNode: this.targetNode,
      sourcePlug: this.sourcePlug,
      targetPlug: this.targetPlug
    }
    return JSON.parse(JSON.stringify(json));
  }
}
export default EdgeModel;
