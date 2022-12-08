// import { nodes } from "../draw";
import Dimension from "../model/Dimension";
import EdgeModel from "../model/EdgeModel";
import Layout from "../model/Layout";
import NodeModel from "../model/NodeModel";
import Plug from "../model/Plug";
import PlugPosition from "../model/PlugPosition";
import Position from "../model/Position";

const BASE_NODE_WIDTH = Layout.BASE_NODE_WIDTH;
const BASE_NODE_HEIGHT = Layout.BASE_NODE_HEIGHT;
export class CreationManager {
  private static instance: CreationManager;
  private constructor() {
    // CreationManager.populateNodeAndEdgeList();
  };
  static createInstance(): CreationManager {
    if (!CreationManager.instance) {
      CreationManager.instance = new CreationManager();
    }
    return CreationManager.instance;
  }
  static getInstance(): CreationManager {
    if (!CreationManager.instance) {
      throw(new Error('CreationManager instance is not created yet'));
    }
    return CreationManager.instance;
  }
  createNodeModel(id: string, label: string, position:Position, dimension:Dimension): NodeModel {
    return new NodeModel(id, label, position, dimension);
  }
  createPlug(plugPosition: PlugPosition, position:Position): Plug {
    return new Plug(plugPosition, position);
  }

  static populateNodeAndEdgeList():{
    nodes: NodeModel[],
    edges: EdgeModel[],
  } {
  // const nodeData = generatedNodeData();
    const nodes = CreationManager.createNodes();
    const edges = CreationManager.createEdges(nodes);
    return {
      nodes,
      edges,
    }
  }
  static createNodes():NodeModel[] {
    const nodes:NodeModel[] = [];
    const labels:string[] = [
      'Solar Array',
      'Battery',
      'Inverter',
      'Load'
    ];
    for (let i = 0; i < 4; i += 1) {
      const id = (i+1).toString();
      const label = labels[i] as string;
      const position = new Position(10+(i*100)+(10*i),20);
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
  static createEdges(nodes:NodeModel[]):EdgeModel[] {
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