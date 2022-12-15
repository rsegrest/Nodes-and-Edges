import p5 from "p5";
import CreationManager from "../controller/CreationManager";

// TODO: Manage positions for toolbox and inspector, other in this class?

import NodeModel from "./NodeModel";
import EdgeModel from "./EdgeModel";
import PlugModel from "./PlugModel";

import InspectorModel from "./InspectorModel";
import ToolboxModel from "./ToolboxModel";
import ToolModel from "./ToolModel";
import DynamicToolModel from "./DynamicToolModel";
import InputParameterModel from "./InputParameterModel";
import OutputParameterModel from "./OutputParameterModel";

class ApplicationModel {
  static addCharacterToEditTarget(key: string):void {
    if (this.editTarget === null) return;
    this.editTarget.setLabel(this.editTarget.getLabel()+key);
  }
  static backspaceEditTarget():void {
    console.log('backspace')
    if (this.editTarget === null) return;
    console.log('deleting last character:')
    const labelContent = this.editTarget.getLabel();
    console.log('labelContent = ', labelContent)
    const bsLabelContent = labelContent.slice(0, -1);
    console.log('bsLabelContent = ', bsLabelContent)
    this.editTarget.setLabel(bsLabelContent);
  }
  private static instance: ApplicationModel | null = null;
  private static p: p5 | null = null;
  private static editTarget: NodeModel | null = null;
  private nodes: NodeModel[] = [];
  private edges: EdgeModel[] = [];
  private toolbox: ToolboxModel = new ToolboxModel();
  private inspector: InspectorModel = new InspectorModel();
  private dynamicTool: DynamicToolModel | null = null;

  // getRolledOverObjects
  private rolledOverObjects: (
    | NodeModel
    | EdgeModel
    | PlugModel
    | ToolboxModel
    | ToolModel
  )[] = [];

  private constructor(p: p5) {
    ApplicationModel.setP(p);
    this.nodes = CreationManager.createNodes();
    this.edges = CreationManager.createEdges(this.nodes);

    // TEMP TEST
    // ApplicationModel.editTarget = (this.nodes[0] as NodeModel);
  }

  static getEditTarget(): NodeModel | null {
    return ApplicationModel.editTarget;
  }
  static setEditTarget(editingString: NodeModel | null): void {
    ApplicationModel.editTarget = editingString;
  }
  addNode(node: NodeModel): void {
    this.nodes.push(node);
  }
  removeNode(node: NodeModel): void {
    const index = this.nodes.indexOf(node);
    if (index > -1) {
      this.nodes.splice(index, 1);
    }
  }
  addEdge(edge: EdgeModel): void {
    this.edges.push(edge);
  }
  removeEdge(edge: EdgeModel): void {
    const index = this.edges.indexOf(edge);
    if (index > -1) {
      this.edges.splice(index, 1);
    }
  }
  // GETTERS
  getSelectedNodes(): NodeModel[] {
    return this.nodes.filter((node) => node.getIsSelected());
  }
  getSelectedEdges(): EdgeModel[] {
    return this.edges.filter((edge) => edge.getIsSelected());
  }
  getSelectedPlugs(): PlugModel[] {
    const selectedPlugs: PlugModel[] = [];
    this.nodes.forEach((node) => {
      selectedPlugs.push(...node.getSelectedPlugs());
    });
    return selectedPlugs;
  }
  getSelectedParameters(): (InputParameterModel|OutputParameterModel)[] {
    const selectedParameters: (InputParameterModel|OutputParameterModel)[] = [];
    this.nodes.forEach((node) => {
      selectedParameters.push(...node.getSelectedParameters());
    });
    return selectedParameters;
  }

  getRolledOverNodes(): NodeModel[] {
    return this.nodes.filter((node) => node.getIsRolledOver());
  }
  getNodes(): NodeModel[] {
    return this.nodes;
  }
  getEdges(): EdgeModel[] {
    return this.edges;
  }
  getInspector(): InspectorModel {
    return this.inspector;
  }
  getToolbox(): ToolboxModel {
    return this.toolbox;
  }
  static createInstance(p: p5): ApplicationModel {
    if (ApplicationModel.instance === null) {
      ApplicationModel.instance = new ApplicationModel(p);
    }
    return ApplicationModel.instance;
  }
  static getInstance(p: p5): ApplicationModel {
    if (ApplicationModel.instance === null) {
      console.warn("ApplicationModel instance is null");
      ApplicationModel.instance = new ApplicationModel(p);
    }
    return ApplicationModel.instance;
  }
  static getP(): p5 | null {
    return ApplicationModel.p;
  }
  getDynamicTool(): DynamicToolModel | null {
    return this.dynamicTool;
  }
  // SETTERS
  setDynamicTool(dtool: DynamicToolModel | null): void {
    this.dynamicTool = dtool;
  }
  setDynamicSlot(dt: DynamicToolModel): void {
    this.dynamicTool = dt;
  }

  static setP(p: p5): void {
    ApplicationModel.p = p;
  }
  // OVERLOADS
  public toString(): string {
    let returnStr = `ApplicationModel:\n\t${this.nodes.length} nodes,\n\t${this.edges.length}\n`;
    returnStr += "NODES: [\n\t";
    this.nodes.forEach((node) => {
      returnStr += `\t${node.toString()},\n`;
    });
    returnStr += "]\nEDGES: [\n\t";

    this.edges.forEach((edge) => {
      returnStr += `\t${edge.toString()},\n`;
    });
    returnStr += "";
    return returnStr;
  }
}

export default ApplicationModel;
