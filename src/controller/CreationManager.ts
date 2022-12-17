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
import p5 from "p5";
import ApplicationModel from "../model/ApplicationModel";

// const BASE_NODE_WIDTH = Layout.BASE_NODE_WIDTH;
// const BASE_NODE_HEIGHT = Layout.BASE_NODE_HEIGHT;
export class CreationManager {
  // on drag and drop, create new node
  public static createNewObjectFromDynamicTool(dynamicTool: DynamicToolModel|null):NodeModel {
    const objectsNewPos = dynamicTool?.getPosition();
    const objectsNewDim = dynamicTool?.getDimensions();
    // const objectType = dynamicTool?.getObjectType();

    // get object types from looking at where tools are created
    // need to have a master list of new object types
    // Element, Subelement, Edge
    return new NodeModel(
      '69', 'new node',
      objectsNewPos as Position, objectsNewDim as Dimension,
      // inputParameterList, outputParameterList
    );
  }
  public static tryToMakeConnection():void {
    // check if there are two plugs selected
    const appModel = ApplicationModel.getInstance();
    const plugs = ApplicationModel.getInstance().getSelectedPlugs();

    if (plugs && plugs.length === 2) {
      const sourcePlug = plugs[0] as PlugModel;
      const targetPlug = plugs[1] as PlugModel;
      const sourceNode = appModel.getPlugParent(sourcePlug);
      const targetNode = appModel.getPlugParent(targetPlug);
      // TODO: build a meaningful ID based on connection description
      const edge = new EdgeModel(Math.floor(Math.random()*100000).toString(),
        (sourceNode as NodeModel), (targetNode as NodeModel), sourcePlug, targetPlug);
      ApplicationModel.getInstance().addEdge(edge);
      ApplicationModel.getInstance().clearPlugsSelected();
    }
    // if so, create edge
    // if not, do nothing
  }
  public static advanceState():void {
    this.tryToMakeConnection();
  }
  private static instance: CreationManager;
  private constructor() {
    // CreationManager.populateNodeAndEdgeList();
  }


  // RENDER (Testing HTML Component render)
  static createContainer(
    p: p5,
    parent: HTMLElement
  ): { container: HTMLDivElement } {
    const container = document.createElement("div");
    container.setAttribute(
      'style',
      "position: absolute; top: 100px; left: 100px; background: #f00; width: 10px; height: 10px;",
    );
    parent.appendChild(container);
    return { container };
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

  static createNodes(): NodeModel[] {
    const nodes: NodeModel[] = [];
    const labels: string[] = ["Solar Array", "Cable", "Avionics", "Radiator"];
    const inputParameterList = [
      new InputParameterModel('parameter1', 1000*Math.random(), 'meters'),
      new InputParameterModel('parameter2', 69*Math.random(), null),
      new InputParameterModel('fuel', 420*Math.random(), 'grams'),
      new InputParameterModel('Another fourth param', 'aStringValue: '+(Math.random()*99999).toFixed(3), 'count')
    ]
    const outputParameterList = [
      new OutputParameterModel('parameter1', 0.5*Math.random(), 'meters'),
      new OutputParameterModel('parameter2', 6.9*Math.random(), null),
      new OutputParameterModel('fuelRemaining', 2*Math.random(), 'grams'),
      new OutputParameterModel('Another fourth param', 'aStringValue: '+(Math.random()*999).toFixed(3), 'count')
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
      nodes.push(node);
    }
    return nodes;
  }

  static createEdges(
    nodes: NodeModel[]
  ): EdgeModel[] {
    const firstNode1 = nodes[0] as NodeModel;
    const secondNode1 = nodes[1] as NodeModel;
    const firstPlug1 = firstNode1.getPlugByPosition('E');
    const secondPlug1 = secondNode1.getPlugByPosition('W');
    
    const oneEdge = new EdgeModel(
      'e0-1',
      firstNode1,
      secondNode1,
      firstPlug1,
      secondPlug1
    );

    const firstNode2 = nodes[1] as NodeModel;
    const secondNode2 = nodes[2] as NodeModel;
    const firstPlug2 = firstNode2.getPlugByPosition('E');
    const secondPlug2 = secondNode2.getPlugByPosition('W');
    
    const anotherEdge = new EdgeModel(
      'e1-2',
      firstNode2,
      secondNode2,
      firstPlug2,
      secondPlug2
    );


    const firstNode3 = nodes[2] as NodeModel;
    const secondNode3 = nodes[3] as NodeModel;
    const firstPlug3 = firstNode3.getPlugByPosition('E');
    const secondPlug3 = secondNode3.getPlugByPosition('W');
    
    const yetAnotherEdge = new EdgeModel(
      'e2-3',
      firstNode3,
      secondNode3,
      firstPlug3,
      secondPlug3
    );

    return [oneEdge, anotherEdge, yetAnotherEdge]
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
}
export default CreationManager;
