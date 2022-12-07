import { nodes } from "../draw";
import Dimension from "../model/Dimension";
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
  static getInstance(): CreationManager {
    if (!CreationManager.instance) {
      CreationManager.instance = new CreationManager();
    }
    return CreationManager.instance;
  }
  createNodeModel(id: string, label: string, position:Position, dimension:Dimension): NodeModel {
    return new NodeModel(id, label, position, dimension);
  }
  createPlug(plugPosition: PlugPosition, position:Position): Plug {
    return new Plug(plugPosition, position);
  }

  static populateNodeAndEdgeList():NodeModel[] {
  // const nodeData = generatedNodeData();
  const nodes:NodeModel[] = [];
  const labels:string[] = [
    'Solar Array',
    'Battery',
    'Inverter',
    'Load'
  ];
  for (let i = 0; i < 4; i += 1) {
    const node = new NodeModel(
      (i+1).toString(),
      labels[i] as string,
      new Position((i*75)+20,20),
      new Dimension(BASE_NODE_WIDTH, BASE_NODE_HEIGHT)
    );
    nodes.push(node);
    }
    return nodes;
  }
}
export default CreationManager;