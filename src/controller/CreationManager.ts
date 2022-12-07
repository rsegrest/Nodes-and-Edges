import Dimension from "../model/Dimension";
import NodeModel from "../model/NodeModel";
import Plug from "../model/Plug";
import PlugPosition from "../model/PlugPosition";
import Position from "../model/Position";

export class CreationManager {
  private static instance: CreationManager;
  private constructor() {
    console.log('CreationManager constructor called');
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
}
export default CreationManager;