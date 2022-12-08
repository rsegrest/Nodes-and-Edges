import p5 from "p5";
import EdgeModel from "../model/EdgeModel";
import NodeModel from "../model/NodeModel";
import Position from "../model/Position";
// import RenderEdge from "../view/RenderEdge";
import RenderGuides from "../view/RenderGuide";
import RenderNode from "../view/RenderNode";
import CreationManager from "./CreationManager";

class ChartManager {
  private static instance: ChartManager | null = null;
  private static p: p5;
  private nodes: NodeModel[] = [];
  private edges: EdgeModel[] = [];
  private constructor(p: p5) {
    ChartManager.setP(p);
    this.nodes = CreationManager.createNodes();
    // this.edges = CreationManager.createEdges(this.nodes);
  }
  renderElements(): void {
    // console.log('ELEMENTS : '+this.toString());
    // anything to "advance" nodes and edges, or do I just render them?

    // TEMP DISABLE
    this.nodes.forEach((n) => {
      RenderNode.render(n, ChartManager.getP());
    });
    // END TEMP DISABLE

    // this.edges.forEach((e) => {
    //   RenderEdge.render(e);
    // })

    // TEST LINES
    // const lines = RenderEdge.plotLinesBetweenNodes(
    //   this.nodes[0] as NodeModel,
    //   this.nodes[1] as NodeModel
    // )
    // RenderEdge.renderLines(lines);
    // RenderEdge.renderLines([new Position(0,0), new Position(100,100)]);

    // RENDER GRID & GUIDES
    RenderGuides.render();
  }
  getSelectedNodes(): NodeModel[] {
    return this.nodes.filter((node) => node.getIsSelected());
  }
  // selectedNodes includes node to check if selected
  checkForSelectNode(): void {
    const mousePosition = new Position(
      ChartManager.p.mouseX,
      ChartManager.p.mouseY
    );
    for (let i = 0; i < this.nodes.length; i += 1) {
      if (this.nodes[i] !== null && this.nodes[i] !== undefined) {
        const node = this.nodes[i] as NodeModel;
        node.setSelected(false);
        if (node.checkMouseOver(mousePosition.x, mousePosition.y)) {
          node.setSelected();
        }
      }
    }
  }
  mouseClicked(): void {
    console.log(
      `ChartManager.mouseClicked() @ ${new Position(
        ChartManager.p.mouseX,
        ChartManager.p.mouseY
      )}`
    );
    this.nodes.forEach((n, i) => {
      this.checkForSelectNode();
    });
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
  getNodes(): NodeModel[] {
    return this.nodes;
  }
  getEdges(): EdgeModel[] {
    return this.edges;
  }
  selectNode(node: NodeModel): void {
    node.setSelected();
  }
  deselectNode(node: NodeModel): void {
    node.deselect();
  }
  static createInstance(p: p5): ChartManager {
    if (ChartManager.instance === null) {
      ChartManager.instance = new ChartManager(p);
    }
    return ChartManager.instance;
  }
  static getInstance(): ChartManager {
    if (ChartManager.instance === null) {
      throw new Error("ChartManager instance is not created yet");
    }
    return ChartManager.instance;
  }
  static setP(p: p5): void {
    ChartManager.p = p;
  }
  static getP(): p5 {
    return ChartManager.p;
  }
  public toString(): string {
    let returnStr = `ChartManager:\n\t${this.nodes.length} nodes,\n\t${this.edges.length}\n`;
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
export default ChartManager;
