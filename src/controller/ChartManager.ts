import p5 from "p5";
import NodeModel from "../model/NodeModel";
import Position from "../model/Position";
import CreationManager from "./CreationManager";

class ChartManager {
  private static instance:ChartManager|null = null;
  private static p:p5;
  private nodes:NodeModel[] = [];
  private selectedNodes: NodeModel[] = [];
  private constructor() {
    
    this.nodes = CreationManager.populateNodeAndEdgeList();
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

  selectNode(node: NodeModel): void {
    this.selectedNodes.push(node);
  }
  deselectNode(node: NodeModel): void {
    const index = this.selectedNodes.indexOf(node);
    if (index > -1) {
      this.selectedNodes.splice(index, 1);
    }
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