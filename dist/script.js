/**
 * This is a p5.js sketch made with p5js-template-petr-plus.
 *
 * @license CC0-1.0
 */

(function (p5) {
  "use strict";

  /** Creates a function object to be passed to `new p5()`. */
  const createSketch = (definition) => {
    const methodNames = Object.keys(definition);
    return (p) => {
      methodNames.forEach((methodName) => {
        const method = definition[methodName];
        if (method) p[methodName] = method.bind(undefined, p);
      });
    };
  };

  class Position {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.x = x;
      this.y = y;
    }
    toString() {
      return `Position:(x:${this.x}, y:${this.y})`;
    }
  }

  class RenderEdge {
    constructor(p) {
      RenderEdge.p = p;
    }
    static plotLinesBetweenNodes(node1, node2) {
      const start_x = node1.position.x + node1.dimensions.width / 2;
      const start_y = node1.position.y + node1.dimensions.height / 2;
      const end_x = node2.position.x + node2.dimensions.width / 2;
      const end_y = node2.position.y + node2.dimensions.height / 2;
      const mid_1x = start_x + (end_x - start_x) / 2;
      const mid_1y = start_y;
      const mid_2x = mid_1x;
      const mid_2y = end_y;
      const mid_1 = new Position(mid_1x, mid_1y);
      const mid_2 = new Position(mid_2x, mid_2y);
      return [
        new Position(start_x, start_y),
        mid_1,
        mid_2,
        new Position(end_x, end_y),
      ];
    }

    // currently, up to three lines are drawn, double L shape
    // TODO: Add label to edge
    static renderLines(positions, strokeColor = "rgb(200,0,0)") {
      const p = RenderEdge.p;
      p.push();
      p.noFill();
      p.strokeWeight(3);
      p.stroke(strokeColor);
      for (let i = 1; i < positions.length; i += 1) {
        const start = positions[i - 1];
        const end = positions[i];
        p.line(start.x, start.y, end.x, end.y);
      }
      p.pop();
    }
    static render(edge) {
      const start = edge.getSourceNode();
      const end = edge.getTargetNode();
      const positions = this.plotLinesBetweenNodes(start, end);
      this.renderLines(positions);
    }
  }

  class RenderGuides {
    constructor(p) {
      RenderGuides.p = p;
    }
    static render() {
      const p = RenderGuides.p;
      p.push();
      p.noFill();
      p.strokeWeight(1);
      p.stroke("rgb(255,255,255,0.5)");
      for (let col = 1; col < p.width / 100; col += 1) {
        p.line(col * 100, 0, col * 100, p.height);
      }
      for (let row = 1; row < p.height / 100; row += 1) {
        p.line(0, row * 100, p.width, row * 100);
      }
      p.pop();
    }
    static getP() {
      return RenderGuides.p;
    }
  }

  class RenderNode {
    constructor(p) {
      this.isSelected = false;
      RenderNode.p = p;
    }
    static renderPlug(plug, p, showNodes) {
      const pos = plug.getPosition();
      const isSelected = plug.getIsSelected();
      const x = pos.x;
      const y = pos.y;

      // const p = RenderNode.p;
      const mouseIsOver = plug.checkMouseOver(p.mouseX, p.mouseY);
      let plugStroke = "rgba(200,200,200,0.7)";
      let plugFill = "rgba(255,255,200,0.7)";

      // if mouse is over and user clicks, select plug
      // if another plug is selected and user clicks a plug, make an edge to connect
      if (mouseIsOver) {
        plugStroke = "rgba(255,255,72,1)";
        plugFill = "rgba(0,0,0,0.8)";
      }
      if (isSelected) {
        plugStroke = "rgba(255,0,72,1)";
        plugFill = "rgba(255,0,72,1)";
      }
      p.push();
      p.stroke(plugStroke);
      p.strokeWeight(2);
      p.fill(plugFill);
      if (isSelected || showNodes) {
        p.circle(x, y, 8);
      }
      p.pop();
    }
    static showNodes(node, p, showNodes) {
      node.getPlugs().forEach((plug) => {
        this.renderPlug(plug, p, showNodes);
      });
    }
    static render(node, p, highlit = false) {
      const CORNER_RADIUS = 10;
      const boundary = node.getBoundary();

      // END test variables
      const width = node.dimensions.width;
      const height = node.dimensions.height;
      const x = node.position.x;
      const y = node.position.y;
      const label = node.getLabel();
      let fillColor = "rgba(228,200,200,1)";
      if (node.getIsSelected()) {
        fillColor = "rgba(255,255,200,1)";
      }
      p.push();
      p.translate(x, y);
      p.noStroke();
      p.fill("rgba(0,0,0,0.5)");
      let strokeColor = "rgb(128,128,128)";
      let strokeWeight = 1;
      if (highlit) {
        strokeColor = "rgb(255,200,0)";
        strokeWeight = 3;
      }

      // round all corners except top-left
      p.rect(
        0,
        5,
        width,
        height,
        0,
        CORNER_RADIUS,
        CORNER_RADIUS,
        CORNER_RADIUS
      );
      p.fill(fillColor);
      p.stroke(strokeColor);
      p.strokeWeight(strokeWeight);

      // TODO: modify gray corner radii to line up with borders on top shape
      p.rect(
        3,
        0,
        width,
        height,
        0,
        CORNER_RADIUS,
        CORNER_RADIUS,
        CORNER_RADIUS
      );
      p.fill(0);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.text(label, 6, 3, width - 6, height - 6);
      p.pop();
      const showNodes = node.checkMouseOver(p.mouseX, p.mouseY);
      this.showNodes(node, p, showNodes);
      {
        RenderNode.drawRolloverGuide(boundary, p);
      }
    }
    static drawRolloverGuide(boundary, p) {
      p.push();
      p.noFill();
      p.stroke("rgb(0,255,255)");
      p.strokeWeight(1);
      p.translate(boundary.left, boundary.top);
      p.rect(
        0,
        0,
        boundary.right - boundary.left,
        boundary.bottom - boundary.top
      );
      p.pop();
    }
  }

  class Dimension {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
    toString() {
      return `Dimension:(width:${this.width},  height:${this.height})`;
    }
  }

  class Layout {
    constructor(p) {
      this.width = 0;
      this.height = 0;
      this.width = p.width;
      this.height = p.height;
    }
    createInstance(p) {
      if (Layout.instance === null) {
        Layout.instance = new Layout(p);
      }
      return Layout.instance;
    }
    getInstance() {
      if (Layout.instance === null) {
        throw new Error("Layout instance is not created yet");
      }
      return Layout.instance;
    }
    static getDistance(position1, position2) {
      const x = position1.x - position2.x;
      const y = position1.y - position2.y;
      return Math.sqrt(x * x + y * y);
    }
  }
  Layout.instance = null;
  Layout.BASE_NODE_WIDTH = 100;
  Layout.BASE_NODE_HEIGHT = 50;

  class Plug {
    constructor(plugPosition, position, isSelected = false) {
      this.plugPosition = plugPosition;
      this.position = position;
      this.isSelected = isSelected;

      // Edge that this plug is plugged into (null if not plugged in)
      this.plugSocket = null;
      this.plugPosition = plugPosition;
      this.position = position;
    }
    getPosition() {
      return this.position;
    }
    checkMouseOver(mouseX, mouseY) {
      const distance = Layout.getDistance(
        this.position,
        new Position(mouseX, mouseY)
      );
      return distance < 15;
    }
    plugIn(edge) {
      this.plugSocket = edge;
    }
    toString() {
      return `Plug: ${this.plugPosition}, position: ${this.position}, plugSocket: ${this.plugSocket}`;
    }
    setIsSelected(isSelected = true) {
      this.isSelected = isSelected;
    }
    getIsSelected() {
      return this.isSelected;
    }
  }

  const PlugPosition = {
    N: "N",
    S: "S",
    E: "E",
    W: "W",
    NE: "NE",
    NW: "NW",
    SE: "SE",
    SW: "SW",
  };

  class NodeModel {
    constructor(id, label, position, dimensions) {
      this.id = id;
      this.label = label;
      this.position = position;
      this.dimensions = dimensions;
      this.showNodes = false;
      this.isSelected = false;
      this.id = id;
      this.label = label;
      this.position = position;
      this.dimensions = dimensions;
      this.plugs = this.createPlugs();
    }
    getBoundary() {
      return {
        left: this.position.x - 10,
        top: this.position.y - 10,
        right: this.position.x + 10 + this.dimensions.width,
        bottom: this.position.y + 10 + this.dimensions.height,
      };
    }
    checkMouseOver(mouseX, mouseY) {
      const boundary = this.getBoundary();
      const isOver =
        mouseX >= boundary.left &&
        mouseX <= boundary.right &&
        mouseY >= boundary.top &&
        mouseY <= boundary.bottom;
      return isOver;
    }
    createPlugs() {
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
        const addPlug = new Plug(
          plugPositions[i],
          this.getPlugPosition(plugPositions[i])
        );
        plugArray.push(addPlug);
      }
      return plugArray;
    }
    setSelected(isSelected = true) {
      this.isSelected = isSelected;
    }
    deselect() {
      this.isSelected = false;
    }
    getIsSelected() {
      return this.isSelected;
    }
    getPlugPosition(plugPosition) {
      const x = this.position.x;
      const y = this.position.y;
      const width = this.dimensions.width;
      const height = this.dimensions.height;
      switch (plugPosition) {
        case PlugPosition.NW:
          return new Position(x + 3, y);
        case PlugPosition.N:
          return new Position(x + 3 + width / 2, y);
        case PlugPosition.NE:
          return new Position(x + 3 + width, y);
        case PlugPosition.SW:
          return new Position(x + 3, y + height);
        case PlugPosition.S:
          return new Position(x + 3 + width / 2, y + height);
        case PlugPosition.SE:
          return new Position(x + 3 + width, y + height);
        case PlugPosition.W:
          return new Position(x + 3, y + height / 2);
        case PlugPosition.E:
          return new Position(x + 3 + width, y + height / 2);
        default:
          return new Position(0, 0);
      }
    }
    getID() {
      return this.id;
    }
    getLabel() {
      return this.label;
    }
    getShowNodes() {
      return this.showNodes;
    }
    getPlugs() {
      return this.plugs;
    }
    getPlugByPosition(plugPosition) {
      return this.plugs.find((plug) => plug.plugPosition === plugPosition);
    }
    toString() {
      // console.log("NODE MODEL TO STRING")
      return `NodeModel: ${this.id} ${
        this.label
      } ${this.position.toString()} ${this.dimensions.toString()}`;
    }
  }

  // import { nodes } from "../draw";
  // const BASE_NODE_WIDTH = Layout.BASE_NODE_WIDTH;
  // const BASE_NODE_HEIGHT = Layout.BASE_NODE_HEIGHT;
  class CreationManager {
    constructor() {
      // CreationManager.populateNodeAndEdgeList();
    }
    static createInstance() {
      if (!CreationManager.instance) {
        CreationManager.instance = new CreationManager();
      }
      return CreationManager.instance;
    }
    static getInstance() {
      if (!CreationManager.instance) {
        throw new Error("CreationManager instance is not created yet");
      }
      return CreationManager.instance;
    }
    createNodeModel(id, label, position, dimension) {
      return new NodeModel(id, label, position, dimension);
    }
    createPlug(plugPosition, position) {
      return new Plug(plugPosition, position);
    }
    static populateNodeAndEdgeList() {
      // const nodeData = generatedNodeData();
      const nodes = CreationManager.createNodes();
      const edges = CreationManager.createEdges(nodes);
      return {
        nodes,
        edges,
      };
    }
    static createNodes() {
      const nodes = [];
      const labels = ["Solar Array", "Cable", "Avionics", "Radiator"];
      for (let i = 0; i < 4; i += 1) {
        const id = (i + 1).toString();
        const label = labels[i];
        const position = new Position(10 + i * 150 + 10 * i, 20);
        const dimension = new Dimension(100, 50);
        const node = new NodeModel(
          id,
          label,
          position,

          // new Dimension(BASE_NODE_WIDTH, BASE_NODE_HEIGHT)
          dimension
        );
        nodes.push(node);
      }
      return nodes;
    }
    static createEdges(nodes) {
      // TEMP RETURN EMPTY ARRAY
      // const edge1 = new EdgeModel(
      //   '1-2',
      //   nodes[0] as NodeModel,
      //   nodes[1] as NodeModel
      // );
      // return [edge1];
      return [];
    }
  }

  class ChartManager {
    constructor(p) {
      this.nodes = [];
      this.edges = [];
      ChartManager.setP(p);
      this.nodes = CreationManager.createNodes();

      // this.edges = CreationManager.createEdges(this.nodes);
    }
    renderElements() {
      // console.log('ELEMENTS : '+this.toString());
      // anything to "advance" nodes and edges, or do I just render them?
      // TEST LINES
      const line1_2 = RenderEdge.plotLinesBetweenNodes(
        this.nodes[0],
        this.nodes[1]
      );
      const line2_3 = RenderEdge.plotLinesBetweenNodes(
        this.nodes[1],
        this.nodes[2]
      );
      const line3_4 = RenderEdge.plotLinesBetweenNodes(
        this.nodes[2],
        this.nodes[3]
      );
      RenderEdge.renderLines(line1_2);
      RenderEdge.renderLines(line2_3);
      RenderEdge.renderLines(line3_4, "rgb(0,0,200)");
      this.nodes.forEach((n) => {
        RenderNode.render(n, ChartManager.getP());
      });

      // this.edges.forEach((e) => {
      //   RenderEdge.render(e);
      // })
      // RenderEdge.renderLines([new Position(0,0), new Position(100,100)]);
      // RENDER GRID & GUIDES
      RenderGuides.render();
    }
    testAddHtmlDiv() {
      const aDiv = document.createElement("p"); // is a node
      aDiv.innerHTML = "This is an HTML div appended to a top-layer div";
      const canvas = document.getElementById("htmlContainer");
      canvas === null || canvas === void 0 ? void 0 : canvas.appendChild(aDiv);
    }
    static createContainer(p, parent) {
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
    getSelectedNodes() {
      return this.nodes.filter((node) => node.getIsSelected());
    }

    // selectedNodes includes node to check if selected
    checkForSelectNode() {
      const mousePosition = new Position(
        ChartManager.p.mouseX,
        ChartManager.p.mouseY
      );
      for (let i = 0; i < this.nodes.length; i += 1) {
        if (this.nodes[i] !== null && this.nodes[i] !== undefined) {
          const node = this.nodes[i];
          node.setSelected(false);
          if (node.checkMouseOver(mousePosition.x, mousePosition.y)) {
            node.setSelected();
          }
        }
      }
    }
    mouseClicked() {
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
            console.log(`Plug ${i} clicked`);
            p.setIsSelected();
          }
        });
        this.checkForSelectNode();
      });
    }
    addNode(node) {
      this.nodes.push(node);
    }
    removeNode(node) {
      const index = this.nodes.indexOf(node);
      if (index > -1) {
        this.nodes.splice(index, 1);
      }
    }
    addEdge(edge) {
      this.edges.push(edge);
    }
    removeEdge(edge) {
      const index = this.edges.indexOf(edge);
      if (index > -1) {
        this.edges.splice(index, 1);
      }
    }
    getNodes() {
      return this.nodes;
    }
    getEdges() {
      return this.edges;
    }
    selectNode(node) {
      node.setSelected();
    }
    deselectNode(node) {
      node.deselect();
    }
    static createInstance(p) {
      if (ChartManager.instance === null) {
        ChartManager.instance = new ChartManager(p);
      }
      return ChartManager.instance;
    }
    static getInstance() {
      if (ChartManager.instance === null) {
        throw new Error("ChartManager instance is not created yet");
      }
      return ChartManager.instance;
    }
    static setP(p) {
      ChartManager.p = p;
    }
    static getP() {
      return ChartManager.p;
    }
    toString() {
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
  ChartManager.instance = null;

  // const exp = require('p5-util/p5.experience.js-master/p5.experience.js')
  let chartManager;
  const preload = (p) => {
    p.loadFont("./font/Regular.otf");
  };

  // FOR 3D orthographic
  // function setOrthographicProjection(p: p5):void {
  //   const width = p.width;
  //   const height = p.height;
  //   p.ortho(
  //     -width/2, width/2,
  //     height/2, -height/2,
  //     0, 500);
  // }
  /** This is a setup function. */
  const setup = (p) => {
    p.createCanvas(800, 600);
    p.frameRate(1);
    p.background(248);

    // Classes with static methods that need access to p5.js
    new RenderNode(p);
    new RenderEdge(p);
    new RenderGuides(p);
    chartManager = ChartManager.createInstance(p);
    CreationManager.createInstance();

    // const uxRect = UX.createUxRect(10,10,100,100);
    // UX.setUxFill(uxRect, 'rgb(255,0,0)');
    // UX.setUxEvent(uxRect, () => {
    //   console.log('CLICKED!')
    // });
    // const gui = createGui("My awesome GUI");
  };

  let p;
  function mouseClicked() {
    // console.log(`draw.ts: mouseClicked()`);
    chartManager.mouseClicked();
  }
  const draw = (_p) => {
    p = _p;
    p.background("rgb(180,180,200)");
    chartManager.renderElements();
  };

  // function renderNodes():void {
  //   nodes.forEach((n) => {
  //     RenderNode.render(n);
  //   })
  // }
  // INTERFACE?
  // function generatedNodeData(
  //   id:string,
  //   label:string
  // ):{
  //   id:string,
  //   label:string,
  //   position:Position,
  //   dimension:Dimension,
  // } {
  //   // const position = new Position(10, 10);
  //   // const dimension = new Dimension(100, 50);
  //   return {
  //     id,
  //     label,
  //     position,
  //     dimension,
  //   }
  // }

  const sketch = createSketch({
    preload,
    setup,
    draw,
    mouseClicked,
  });
  new p5(sketch);
})(p5);
