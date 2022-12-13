// import { nodes } from "../draw";
import Dimension from "../model/positioning/Dimension";
import EdgeModel from "../model/EdgeModel";
// import Layout from "../model/positioning/Layout";
import NodeModel from "../model/NodeModel";
import PlugModel from "../model/PlugModel";
import PlugPosition from "../model/PlugPosition";
import Position from "../model/positioning/Position";
import DynamicToolModel from "../model/DynamicToolModel";
import InputParameterModel from "../model/InputParameterModel";
import OutputParameterModel from "../model/OutputParameterModel";

// const BASE_NODE_WIDTH = Layout.BASE_NODE_WIDTH;
// const BASE_NODE_HEIGHT = Layout.BASE_NODE_HEIGHT;
export class CreationManager {
  // on drag and drop, create new node
  public static createNewObjectFromDynamicTool(dynamicTool: DynamicToolModel|null):NodeModel {
    const objectsNewPos = dynamicTool?.getPosition();
    const objectsNewDim = dynamicTool?.getDimensions();
    const objectType = dynamicTool?.getObjectType();
    // get object types from looking at where tools are created
    // need to have a master list of new object types
    // Element, Subelement, Edge
    return new NodeModel(
      '69', 'new node',
      objectsNewPos as Position, objectsNewDim as Dimension,
      // inputParameterList, outputParameterList
    );
  }
  private static instance: CreationManager;
  private constructor() {
    // CreationManager.populateNodeAndEdgeList();
  }
  static createInstance(): CreationManager {
    if (!CreationManager.instance) {
      CreationManager.instance = new CreationManager();
    }
    return CreationManager.instance;
  }
  static getInstance(): CreationManager {
    if (!CreationManager.instance) {
      throw new Error("CreationManager instance is not created yet");
    }
    return CreationManager.instance;
  }
  // TODO: not called currently, use as interface for Dyreqt data
  static createNodeModel(
    id: string,
    label: string,
    position: Position,
    dimension: Dimension
  ): NodeModel {
    return new NodeModel(id, label, position, dimension);
  }
  createPlug(plugPosition: PlugPosition, position: Position): PlugModel {
    return new PlugModel(plugPosition, position);
  }

  static populateNodeAndEdgeList(): {
    nodes: NodeModel[];
    edges: EdgeModel[];
  } {
    // const nodeData = generatedNodeData();
    const nodes = CreationManager.createNodes();
    const edges = [] as EdgeModel[];
    // const edges = CreationManager.createEdges(nodes);
    return {
      nodes,
      edges,
    };
  }
  static createNodes(): NodeModel[] {
    const nodes: NodeModel[] = [];
    const labels: string[] = ["Solar Array", "Cable", "Avionics", "Radiator"];
    const inputParameterList = [
      new InputParameterModel('parameter1', 1000, 'meters'),
      new InputParameterModel('parameter2', 69, null),
      new InputParameterModel('fuel', 420, 'grams'),
      new InputParameterModel('Another fourth param', 'aStringValue', 'count')
    ]
    const outputParameterList = [
      new OutputParameterModel('parameter1', 0, 'meters'),
      new OutputParameterModel('parameter2', 6.9, null),
      new OutputParameterModel('fuelRemaining', 2, 'grams'),
      new OutputParameterModel('Another fourth param', 'aStringValue', 'count')
    ]
    
    for (let i = 0; i < 4; i += 1) {
      const id = (i + 1).toString();
      const label = labels[i] as string;
      const position = new Position(10 + i * 150 + 10 * i, 20);
      const dimension = new Dimension(100, 50);
      const node = new NodeModel(
        id,
        label,
        position,
        dimension,
        inputParameterList,
        outputParameterList
      );
      // console.log('node', node)
      // console.log('node boundary', node.getBoundary())
      nodes.push(node);
    }
    return nodes;
  }

  // TODO: Use this (temp method) to set up a test case
  static createEdges(
    // nodes: NodeModel[]
  ): EdgeModel[] {
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
