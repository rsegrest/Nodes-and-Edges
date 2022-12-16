import ApplicationModel from "../../model/ApplicationModel";
import InputParameterModel from "../../model/InputParameterModel";
import NodeModel from "../../model/NodeModel";
import OutputParameterModel from "../../model/OutputParameterModel";
import Position from "../../model/positioning/Position";

class ClickManager {

  static checkElementsForClick(
    mouseX: number,
    mouseY: number,
    appModel: ApplicationModel
  ): void {

    const nodes:NodeModel[] = appModel.getNodes();
    
    let foundParam = false;
    // Params currently added to inspector
    if (appModel) {

      foundParam = this.checkForClickOnParam(mouseX, mouseY, appModel);
      // TODO: Deal with potential for more than one selected node
      
      // END Check for click on param

      if (foundParam) { return; }
      nodes.forEach((n) => {
        this.checkForSelectPlug(mouseX, mouseY, n);
        this.checkForSelectNode(mouseX, mouseY, appModel);
      });
    }
  }

  // TODO: Rename or simplify
  static checkForSelectParam(
    mouseX:number, mouseY:number,
    pm:InputParameterModel|OutputParameterModel
  ):InputParameterModel|OutputParameterModel|null {
    // const p = ApplicationModel.getP() as p5;
    let pmClicked = null;
    if (pm.checkBoundary(mouseX, mouseY)) {
      pm.setIsSelected();
      pmClicked = pm;
    }
    return pmClicked;
  }
    
  static checkForSelectPlug(
    mouseX:number, mouseY:number,
    n:NodeModel
  ): void {
    const plugs = n.getPlugs();
    // const p = ApplicationModel.getP() as p5;
    plugs.forEach((plug) => {
      if (plug.checkBoundary(mouseX, mouseY)) {
        plug.setIsSelected();
      }
    })
  }

  // Move to InteractionManager?
  static checkForClickOnParam(
    mouseX: number, mouseY: number, appModel: ApplicationModel
  ):boolean {
    let foundParam = false;
    const params:(InputParameterModel|OutputParameterModel)[] = [];
    
    // Check for click on param
    const selectedNodes = appModel.getSelectedNodes();
    if (selectedNodes && selectedNodes.length > 0) {
      const inputParams = (selectedNodes[0] as NodeModel).getInputParameterList();
      const outputParams = (selectedNodes[0] as NodeModel).getOutputParameterList();
      params.push(...inputParams);
      params.push(...outputParams);
      console.log(`params.length: ${params.length}`);
      for (let i = 0; i < params.length; i += 1) {
        const nextParam:InputParameterModel|OutputParameterModel|undefined = params[i];
        if (nextParam === undefined) { continue; }
        foundParam = this.checkForSelectParam(
          mouseX, mouseY, nextParam
        ) !== null;
        // if (foundParam) { console.warn("FOUND PARAM, length is now: " + selectedNodes[0]?.getSelectedParameters().length); }
      }
    }
    return foundParam;
  }

  
  // INTERACTION
  // selectedNodes includes node to check if selected
  static checkForSelectNode(
    mouseX:number, mouseY:number, appModel:ApplicationModel
  ): void {
    console.log("checkForSelectNode")
    const nodes = appModel.getNodes();
    const mousePosition = new Position(
      mouseX,
      mouseY
    );
    
    for (let i = 0; i < nodes.length; i += 1) {
      if (nodes[i] !== null && nodes[i] !== undefined) {
        const node = nodes[i] as NodeModel;
        if (node.areParamsSelected() === false) {
          node.setIsSelected(false);
        }
        if (node.checkBoundary(mousePosition.x, mousePosition.y)) {
          // console.warn("FOUND NODE")
          // node.setIsSelected();
          node.clickAction()
        } else {
          // console.warn("DIDN'T FIND NODE")
        }
      }
    }
  }
}
export default ClickManager;