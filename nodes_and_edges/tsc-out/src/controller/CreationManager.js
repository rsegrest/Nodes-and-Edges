// import { nodes } from "../draw";
import Dimension from "../model/Dimension";
import NodeModel from "../model/NodeModel";
import Plug from "../model/Plug";
import Position from "../model/Position";
// const BASE_NODE_WIDTH = Layout.BASE_NODE_WIDTH;
// const BASE_NODE_HEIGHT = Layout.BASE_NODE_HEIGHT;
export class CreationManager {
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
export default CreationManager;
