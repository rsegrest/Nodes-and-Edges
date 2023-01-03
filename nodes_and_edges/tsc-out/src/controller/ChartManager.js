import Position from "../model/Position";
// import { setDraggable, createContainer } from "../p5-util/quicksettings";
import RenderEdge from "../view/RenderEdge";
import RenderGuides from "../view/RenderGuide";
import RenderNode from "../view/RenderNode";
import CreationManager from "./CreationManager";
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
        var _a, _b;
        // TEST LINES
        const line1_2 = RenderEdge.plotLinesBetweenNodes(this.nodes[0], this.nodes[1]);
        const line2_3 = RenderEdge.plotLinesBetweenNodes(this.nodes[1], this.nodes[2]);
        const line3_4 = RenderEdge.plotLinesBetweenNodes(this.nodes[2], this.nodes[3]);
        RenderEdge.renderLines(line1_2);
        RenderEdge.renderLines(line2_3);
        RenderEdge.renderLines(line3_4, "rgb(0,0,200)");
        // TEMP DISABLE
        this.nodes.forEach((n) => {
            RenderNode.render(n, ChartManager.getP());
        });
        // END TEMP DISABLE
        // this.edges.forEach((e) => {
        //   RenderEdge.render(e);
        // })
        // RenderEdge.renderLines([new Position(0,0), new Position(100,100)]);
        // RENDER GRID & GUIDES
        RenderGuides.render();
        const ui = ChartManager.createUi(document.getElementById("main"));
        // ChartManager.p.createDiv(ui);
        // const button = ChartManager.p.createButton("test");
        // button.position(10, 10);
        // button.style.apply("background-color", "rgb(200,0,0)");
        const div = ChartManager.p.createDiv("").size(100, 100);
        div.html("hi", true);
        (_a = document.getElementById("defaultCanvas0")) === null || _a === void 0 ? void 0 : _a.appendChild(ui);
        (_b = document
            .getElementById("defaultCanvas0")) === null || _b === void 0 ? void 0 : _b.appendChild(div);
    }
    static createContainer(p, parent) {
        const container = document.createElement("div");
        // container.classList.add("p5c-container", "idle");
        // setDraggable(container);
        parent.appendChild(container);
        return { container };
    }
    static createUi(parent
    // initialState: UiState,
    // eventHandlers: UiEventHandlers = {}
    ) {
        const p = ChartManager.p;
        // document.getElementById();
        const cont = ChartManager.createContainer(p, parent);
        return cont;
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
        // canvas = document.getElementById("defaultCanvas0")?.setStyle(
        //   "visibility","hidden"
        // )
        this.nodes.forEach((n, i) => {
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
export default ChartManager;
