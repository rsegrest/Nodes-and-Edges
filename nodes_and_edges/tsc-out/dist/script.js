"use strict";
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
                if (method)
                    p[methodName] = method.bind(undefined, p);
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
        static renderPlug(plug, p) {
            const pos = plug.getPosition();
            const x = pos.x;
            const y = pos.y;
            // const p = RenderNode.p;
            const mouseIsOver = plug.checkMouseOver(p.mouseX, p.mouseY);
            let plugStroke = "rgba(200,200,200,0.7)";
            let plugFill = "rgba(255,255,255,0.7)";
            if (mouseIsOver) {
                plugStroke = "rgba(255,255,128,1)";
                plugFill = "rgba(0,0,0,0.8)";
            }
            p.push();
            p.stroke(plugStroke);
            p.strokeWeight(2);
            p.fill(plugFill);
            p.circle(x, y, 8);
            p.pop();
        }
        static showNodes(node, p) {
            node.getPlugs().forEach((plug) => {
                this.renderPlug(plug, p);
            });
        }
        static render(node, p) {
            console.log(`Rendering node : ${node.toString()}`);
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
            p.rect(0, 5, width, height);
            p.fill(fillColor);
            p.stroke(128);
            p.strokeWeight(1);
            p.rect(3, 0, width, height);
            p.fill(0);
            p.noStroke();
            p.textAlign(p.CENTER, p.CENTER);
            p.text(label, 6, 3, width - 6, height - 6);
            p.pop();
            const showNodes = node.checkMouseOver(p.mouseX, p.mouseY);
            if (showNodes) {
                this.showNodes(node, p);
            }
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
            p.rect(0, 0, boundary.right - boundary.left, boundary.bottom - boundary.top);
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
        constructor(plugPosition, position) {
            this.plugPosition = plugPosition;
            this.position = position;
            // Edge that this plug is plugged into (null if not plugged in)
            this.plugSocket = null;
            this.plugPosition = plugPosition;
            this.position = position;
        }
        getPosition() {
            return this.position;
        }
        checkMouseOver(mouseX, mouseY) {
            const distance = Layout.getDistance(this.position, new Position(mouseX, mouseY));
            return distance < 15;
        }
        plugIn(edge) {
            this.plugSocket = edge;
        }
        toString() {
            return `Plug: ${this.plugPosition}, position: ${this.position}, plugSocket: ${this.plugSocket}`;
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
            const isOver = mouseX >= boundary.left &&
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
                const addPlug = new Plug(plugPositions[i], this.getPlugPosition(plugPositions[i]));
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
            return `NodeModel: ${this.id} ${this.label} ${this.position.toString()} ${this.dimensions.toString()}`;
        }
    }
    // import { nodes } from "../draw";
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
            const labels = ["Solar Array", "Battery", "Inverter", "Load"];
            for (let i = 0; i < 4; i += 1) {
                const id = (i + 1).toString();
                const label = labels[i];
                const position = new Position(10 + i * 150 + 10 * i, 20);
                const dimension = new Dimension(100, 50);
                const node = new NodeModel(id, label, position, 
                // new Dimension(BASE_NODE_WIDTH, BASE_NODE_HEIGHT)
                dimension);
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
        getSelectedNodes() {
            return this.nodes.filter((node) => node.getIsSelected());
        }
        // selectedNodes includes node to check if selected
        checkForSelectNode() {
            const mousePosition = new Position(ChartManager.p.mouseX, ChartManager.p.mouseY);
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
            console.log(`ChartManager.mouseClicked() @ ${new Position(ChartManager.p.mouseX, ChartManager.p.mouseY)}`);
            this.nodes.forEach((n, i) => {
                // console.log(`${i}: Looking at node: ${(n as NodeModel).toString()}`)
                // console.log(n);
                // console.log(`checking node ${(n as NodeModel).toString()} for mouse over at position: ${ChartManager.p.mouseX}, ${ChartManager.p.mouseY}`)
                // const isOver = n.checkMouseOver(
                //   ChartManager.p.mouseX,
                //   ChartManager.p.mouseY
                // );
                // if (isOver) {
                //   console.log(`Found node: ${n.toString()}`);
                //   if (n.getIsSelected()) {
                //     n.deselect();
                //   } else {
                //     n.setSelected();
                //   }
                // }
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
        p.background(248);
        // Classes with static methods that need access to p5.js
        new RenderNode(p);
        new RenderGuides(p);
        chartManager = ChartManager.createInstance(p);
        CreationManager.createInstance();
    };
    let p;
    function mouseClicked() {
        // console.log(`draw.ts: mouseClicked()`);
        chartManager.mouseClicked();
    }
    const draw = (_p) => {
        p = _p;
        p.background("rgb(220,200,220)");
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
