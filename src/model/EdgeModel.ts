import NodeModel from "./NodeModel";
import Plug from "./Plug";
class EdgeModel {
  private id:string;
  private sourceNode:NodeModel|null = null;
  private targetNode:NodeModel|null = null;
  private sourcePlug:Plug|null = null;
  private targetPlug:Plug|null = null;
  constructor(
    id:string,
    sourceNode:NodeModel,
    targetNode?:NodeModel,
    sourcePlug?:Plug,
    targetPlug?:Plug,
  ) {
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
  connectSource(node:NodeModel, plug:Plug|null=null):void {
    this.sourceNode = node;
    if (plug) {
      this.sourcePlug = plug;
    }
  }
  connectTarget(node:NodeModel, plug:Plug|null=null):void {
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
  getSourcePlug():Plug|null {
    return this.sourcePlug;
  }
  getTargetPlug():Plug|null {
    return this.targetPlug;
  }
  getId():string {
    return this.id;
  }
  public toString():string {
    return `EdgeModel: ${this.id}, sourceNode: ${this.sourceNode}, targetNode: ${this.targetNode}, sourcePlug: ${this.sourcePlug}, targetPlug: ${this.targetPlug}`;
  }
}
export default EdgeModel;
