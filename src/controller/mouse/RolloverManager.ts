import ApplicationModel from "../../model/ApplicationModel";

class RolloverManager {
  static checkForRollover(
    mouseX: number, mouseY: number,
    appModel: ApplicationModel
  ): void {
    // console.log(`MouseManager.mouseMoved(): mouseX: ${mouseX}, mouseY: ${mouseY}`);
    // Check all elements for rollover
    const foundPlug = this.checkForPlugRollover(mouseX, mouseY, appModel);
    if (foundPlug) { return; }
    const foundParam = this.checkForParamRollover(mouseX,mouseY,appModel);
    if (foundParam) { return; }
    const foundTool = this.checkForToolsRollover(mouseX, mouseY, appModel);
    if (foundTool) { return; }
    const foundNode = this.checkForNodeRollover(mouseX, mouseY, appModel);
    if (foundNode) { return; }
    const foundEdge = this.checkForEdgeRollover(mouseX, mouseY, appModel);
    if (foundEdge) { return; }

    // Toolbox
    if (appModel.getToolbox().checkBoundary(mouseX, mouseY)) {
      // console.warn(`MouseManager.mouseMoved(): toolbox->setIsRolledOver()}]`);
      appModel.getToolbox().setIsRolledOver();
    }
    // Inspector
    if (appModel.getInspector().checkBoundary(mouseX, mouseY)) {
      // console.warn(`MouseManager.mouseMoved(): inspector->setIsRolledOver()}]`);
      appModel.getInspector().setIsRolledOver();
    }
  }

  static checkForPlugRollover(
    mouseX:number, mouseY:number,
    appModel:ApplicationModel
  ):boolean {
    let foundPlug = false;
    appModel.getNodes().forEach((node) => {
      node.getPlugs().forEach((plug) => {
        if (plug.checkBoundary(mouseX, mouseY)) {
          // console.warn(`MouseManager.mouseMoved(): plug.setIsRolledOver(): [\n\t${plug}\n\t]()}]`);
          plug.setIsRolledOver();
          foundPlug = true;
        } else {
          plug.setIsRolledOver(false);
        }
      })
    });
    return foundPlug;
  }
  static checkForParamRollover(
    mouseX:number, mouseY:number,
    appModel:ApplicationModel
  ):boolean {

    let foundParam = false;
    // Input Params
    appModel.getSelectedNodes().forEach((node) => {
      node.getInputParameterList().forEach((inputParam) => {
        if (inputParam.checkBoundary(mouseX, mouseY)) {
          // console.warn(`MouseManager.mouseMoved(): inputParam->setIsRolledOver(): [\n\t${inputParam}\n\t]()}]`);
          inputParam.setIsRolledOver();
          foundParam = true;
        } else {
          inputParam.setIsRolledOver(false);
        }
      })
    })

    // Output Params
    appModel.getSelectedNodes().forEach((node) => {
      node.getInputParameterList().forEach((outputParam) => {
        if (outputParam.checkBoundary(mouseX, mouseY)) {
          // console.warn(`MouseManager.mouseMoved(): outputParam->setIsRolledOver(): [\n\t${outputParam}\n\t]()}]`);
          outputParam.setIsRolledOver();
          foundParam = true;
        } else {
          outputParam.setIsRolledOver(false);
        }
      })
    });
    return foundParam;
  }

  static checkForNodeRollover(
    mouseX:number, mouseY:number,
    appModel:ApplicationModel
  ):boolean {
    let foundNode = false;
    // Nodes
    appModel.getNodes().forEach((node) => {
      if (node.checkBoundary(mouseX, mouseY)) {
        // console.warn(`MouseManager.mouseMoved(): getNodes->setIsRolledOver(): [\n\t${node}\n\t]()}]`);
        foundNode = true;
        node.setIsRolledOver();
      } else {
        node.setIsRolledOver(false);
      }
    });
    return foundNode;
  };

  static checkForToolsRollover(
    mouseX:number, mouseY:number,
    appModel:ApplicationModel
  ):boolean {
    let foundTool = false;
    // Tools
    appModel.getToolbox().getToolList().forEach((tool) => {
      if (tool.checkBoundary(mouseX, mouseY)) {
        // console.warn(`MouseManager.mouseMoved(): getToolList->setIsRolledOver(): [\n\t${tool}\n\t]()}]`);
        foundTool = true;
        tool.setIsRolledOver();
      } else {
        tool.setIsRolledOver(false);
      }
    });
    return foundTool;
  }

  static checkForEdgeRollover(
    mouseX:number, mouseY:number,
    appModel:ApplicationModel
  ):boolean {
    const foundEdge = false;
    // Edges
    appModel.getEdges().forEach((edge) => {
      if (edge.checkBoundary(mouseX, mouseY)) {
        // console.warn(`MouseManager.mouseMoved(): getToolList->setIsRolledOver(): [\n\t${edge}\n\t]()}]`);
        edge.setIsRolledOver();
      } else {
        edge.setIsRolledOver(false);
      }
    });
    return foundEdge;
  }

}
export default RolloverManager;