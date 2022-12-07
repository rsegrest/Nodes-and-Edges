import p5 from "p5";
import EdgeModel from "../model/EdgeModel";
import NodeModel from "../model/NodeModel";
import Position from "../model/Position";
import CreationManager from "./CreationManager";

class ChartManager {
  private static instance:ChartManager|null = null;
  private static p:p5;
  private nodes:NodeModel[] = [];
  private edges:EdgeModel[] = [];
  private constructor() {
    
    this.nodes = CreationManager.populateNodeAndEdgeList();
  }
  getSelectedNodes():NodeModel[] {
    return this.nodes.filter((node) => node.getIsSelected());
  }
  // selectedNodes includes node to check if selected
  checkForSelectNode():void {
    const mousePosition = new Position(
      ChartManager.p.mouseX,
      ChartManager.p.mouseY
    );
    this.nodes.forEach((node) => {
      if (node.checkMouseOver(mousePosition.x, mousePosition.y)) {
        if (node.getIsSelected()) {
          node.deselect();
        } else {
          node.setSelected();
        }
      }
    });
  }
  addNode(node:NodeModel):void {
    this.nodes.push(node);
  }
  removeNode(node:NodeModel):void {
    const index = this.nodes.indexOf(node);
    if (index > -1) {
      this.nodes.splice(index, 1);
    }
  }
  addEdge(edge:EdgeModel):void {
    this.edges.push(edge);
  }
  removeEdge(edge:EdgeModel):void {
    const index = this.edges.indexOf(edge);
    if (index > -1) {
      this.edges.splice(index, 1);
    }
  }
  getNodes():NodeModel[] {
    return this.nodes;
  }
  getEdges():EdgeModel[] {
    return this.edges;
  }
  

  selectNode(node: NodeModel): void {
    node.setSelected();
  }
  deselectNode(node: NodeModel): void {
    node.deselect();
  }
  static createInstance(): ChartManager {
    if (ChartManager.instance === null) {
      ChartManager.instance = new ChartManager();
    }
    return ChartManager.instance;
  }
  static getInstance(): ChartManager {
    if (ChartManager.instance === null) {
      throw(new Error('ChartManager instance is not created yet'));
    }
    return ChartManager.instance;
  }
}
export default ChartManager;