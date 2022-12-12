import p5 from "p5";
import EdgeModel from "../model/EdgeModel";
import NodeModel from "../model/NodeModel";
import PlugModel from "../model/PlugModel";
import ToolModel from "../model/ToolModel";
import RenderEdge from "../view/RenderEdge";
import RenderNode from "../view/RenderNode";
import RenderGuides from "../view/RenderGuide";
import CreationManager from "./CreationManager";
import ToolboxModel from "../model/ToolboxModel";
import RenderToolbox from "../view/RenderToolbox";
import Position from "../model/positioning/Position";
import RenderInspector from "../view/RenderInspector";
import InspectorPanelModel from "../model/InspectorPanelModel";

type DraggableObject = NodeModel|EdgeModel|PlugModel|ToolboxModel|ToolModel;

class ChartManager {
  private static instance: ChartManager | null = null;
  private static p: p5;
  private nodes: NodeModel[] = [];
  private edges: EdgeModel[] = [];
  private toolbox: ToolboxModel = new ToolboxModel();
  private inspector: InspectorPanelModel = new InspectorPanelModel();
  // getRolledOverObjects
  private rolledOverObjects: (
    NodeModel | EdgeModel | PlugModel | ToolboxModel | ToolModel
  )[] = [];

  private constructor(p: p5) {
    ChartManager.setP(p);
    this.nodes = CreationManager.createNodes();
    // this.edges = CreationManager.createEdges(this.nodes);
  }

  mouseDragged(p: p5): void {
    // console.log(`mouse dragged to : ${p.mouseX}, ${p.mouseY}`);
    const dragTarget:DraggableObject|null = this.getDragTarget();
    if (dragTarget instanceof NodeModel) {
      console.log('this is a node');
      dragTarget.setIsDragging(true);
    }
  }

  mousePressed(p: p5): void {
    // console.log(`mouse pressed at : ${p.mouseX}, ${p.mouseY}`);
    
  }

  clearDragTargets(): void {
    this.nodes.forEach((node) => node.setIsDragging(false));
    this.edges.forEach((edge) => edge.setIsDragging(false));
    // TODO: this.rolledOverObjects.forEach((obj) => obj.setIsDragging(false));
  }

  mouseReleased(p: p5): void {
    console.log('mouse released');
    this.clearDragTargets();
  }

  getDragTarget(): DraggableObject|null {
    const nodeList:NodeModel[] = this.nodes;
    const edgeList:EdgeModel[] = this.edges;
    const plugList:PlugModel[] = this.nodes.flatMap((node) => node.getPlugs());

    // TODO: Does this need to be a member variable?
    // const dragTarget = null;

    // TODO: check tools for rollover
    // TODO: Initialize and store toolbox data in this class
    // TODO: check toolbox for rollover

    if (this.toolbox) {
      if (this.toolbox.getIsRolledOver()) {
        console.warn(`toolbox: ${this.toolbox.toString()} is rolled over`);
        return this.toolbox;
      }
    }
    if (plugList.length > 0) {
      for (let i = 0; i < plugList.length; i += 1) {
        const plug = plugList[i];
        if (typeof plug === 'undefined') { continue; }
        if (plug === null) { continue; }
        if (plug.getIsRolledOver()) {
          console.warn(`plug: ${plug.toString()} is rolled over`);
          return plug;
        }
      }
    }
    if (edgeList.length > 0) {
      for (let i = 0; i < edgeList.length; i += 1) {
        const edge = edgeList[i];
        if (typeof edge === 'undefined') { continue; }
        if (edge === null) { continue; }
        if (edge?.getIsRolledOver()) {
          console.warn(`edge: ${edge.toString()} is rolled over`);
          return edge;
        }
      }
    }
    if (nodeList.length > 0) {
      for (let i = 0; i < nodeList.length; i += 1) {
        const node = nodeList[i];
        if (typeof node === 'undefined') { continue; }
        if (node === null) { continue; }
        if (node?.getIsRolledOver()) {
          console.warn(`node: ${node.toString()} is rolled over`);
          return node;
        }
      }
    }
    // return object that is being dragged, or null
    return null;
  }
  
  // TEMP FUNCTION for testing
  drawTestLines(): void {
    // TEST LINES
    const line1_2 = RenderEdge.plotLinesBetweenNodes(
      this.nodes[0] as NodeModel,
      this.nodes[1] as NodeModel
    );
    const line2_3 = RenderEdge.plotLinesBetweenNodes(
      this.nodes[1] as NodeModel,
      this.nodes[2] as NodeModel
    );
    const line3_4 = RenderEdge.plotLinesBetweenNodes(
      this.nodes[2] as NodeModel,
      this.nodes[3] as NodeModel
    );

    RenderEdge.renderLines(line1_2);
    RenderEdge.renderLines(line2_3);
    RenderEdge.renderLines(line3_4, "rgb(0,0,200)");
  }
  renderElements(): void {
    const p = ChartManager.getP();
    // console.log('ELEMENTS : '+this.toString());
    // anything to "advance" nodes and edges, or do I just render them?

    // DONE: Try setting "isDragging" to true on first node
    // TODO NEXT: Check for mouse button held down on node for drag
    //  1. If mouse button is held down, set node's "isDragging" to true
    this.nodes.forEach((n,index) => {
      // check for rollover
      // TODO: Move this logic to abstract GuiElement class
      const mouseIsOverNode = n.checkMouseOver(p.mouseX, p.mouseY);
      if (mouseIsOverNode) { n.setIsRolledOver(); }
      else { n.setIsRolledOver(false); }
      // if node is being dragged, update its position
      if (n.getIsDragging()) {
        n.dragToPosition(new Position(p.mouseX-40, p.mouseY-20));
      }

      // console.log(this.getSelectedNodes().length);
      if (this.getSelectedNodes().length > 0) {
        // TODO: Only draw line if user is hovering over another node:
        //  1. iterate through plugs and check closest
        const plugArray = this.getClosestPlugsOnSelectedNode();
        // console.log('plugArray: '+plugArray);
        const closestPlugOnSelectedNode = plugArray[0];
        const closestPlugPosition = closestPlugOnSelectedNode?.getPosition();
        const mousePosition = new Position(p.mouseX, p.mouseY);
        const lineArray = [closestPlugPosition as Position, mousePosition];
        RenderEdge.renderLines(lineArray, "rgb(0,128,255)");
        //  2. draw a preview line from the closest plug
        //       on node 1 to the rolled-over node
        //  NEXT: Create a preview line class:
        //      One location to another (Position or object with position)
      }
      // else {
      //   console.log('no nodes selected');
      // }
      
      RenderNode.render(n, ChartManager.getP());
      RenderToolbox.render(this.toolbox);
      RenderInspector.render(this.inspector);
    });

    // this.edges.forEach((e) => {
    //   RenderEdge.render(e);
    // })

    // RenderEdge.renderLines([new Position(0,0), new Position(100,100)]);

    // IF A NODE IS SELECTED, SHOW A CONNECTION PREVIEW
    // this.getSelectedNodes().forEach((node) => {
      
      // TEMP DISABLE, was tested
      // this.highlightClosestPlugOnSelectedNode();
      
      
      // RenderEdge.renderPreview(node);
    // });

    // RENDER GRID & GUIDES
    RenderGuides.render();
  }
  testAddHtmlDiv(): void {
    const aDiv = document.createElement("p"); // is a node
    aDiv.innerHTML = "This is an HTML div appended to a top-layer div";
    const canvas = document.getElementById("htmlContainer");
    canvas?.appendChild(aDiv);
  }
  static createContainer(
    p: p5,
    parent: HTMLElement
  ): { container: HTMLDivElement } {
    const container = document.createElement("div");
    // container.classList.add("p5c-container", "idle");
    // setDraggable(container);
    parent.appendChild(container);
    return { container };
  }
  // static createUi(
  //   parent: HTMLElement
  //   // initialState: UiState,
  //   // eventHandlers: UiEventHandlers = {}
  // ): any {
  //   const p = ChartManager.p;
  //   // document.getElementById();
  //   const cont = ChartManager.createContainer(p, parent);
  //   return cont;
  // }
  getSelectedNodes(): NodeModel[] {
    return this.nodes.filter((node) => node.getIsSelected());
  }
  getRolledOverNodes(): NodeModel[] {
    return this.nodes.filter((node) => node.getIsRolledOver());
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
  getClosestPlugsOnSelectedNode():PlugModel[] {
    const selectedNodes = this.getSelectedNodes();
    // Array for if multiple nodes are selected
    // Right now, one at a time is selected, only
    const closestPlugArray = [];
    if (selectedNodes.length > 0) {
      for (let i = 0; i < selectedNodes.length; i += 1) {
        const closestPlug = (selectedNodes[i] as NodeModel).getPlugClosestToMouse(
          ChartManager.p.mouseX, ChartManager.p.mouseY
        );
        closestPlugArray.push(closestPlug);
      }
    }
    return closestPlugArray as PlugModel[];
  }
  mouseClicked(): void {
    console.log(
      `ChartManager.mouseClicked() @ ${new Position(
        ChartManager.p.mouseX,
        ChartManager.p.mouseY
      )}`
    );
    this.nodes.forEach((n, i) => {
      const plugs = n.getPlugs();
      plugs.forEach((p) => {
        if (p.checkMouseOver(ChartManager.p.mouseX, ChartManager.p.mouseY)) {
          p.setIsSelected();
        }
      })
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
