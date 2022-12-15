import p5 from "p5";
import InteractionManager from "../controller/InteractionManager";
import ApplicationModel from "../model/ApplicationModel";
import NodeModel from "../model/NodeModel";
import Position from "../model/positioning/Position";
import ToolModel from "../model/ToolModel";
import RenderEdge from "./RenderEdge";
import RenderGuides from "./RenderGuide";
import RenderInspector from "./RenderInspector";
import RenderNode from "./RenderNode";
import RenderTool from "./RenderTool";
import RenderToolbox from "./RenderToolbox";

class RenderApplication {
  private static p: p5 | null = null;
  // private static rowCount = 0;
  // public static readonly Y_FIRST_ROW_OFFSET = 45;
  // public static readonly Y_EACH_ROW_OFFSET = 20;
  // public static readonly NAME_COLUMN_WIDTH = 150;
  constructor(p: p5) {
    RenderApplication.p = p;
  }
  // RENDER
  static renderNodes(p: p5, appModel: ApplicationModel): void {
    const nodes = appModel?.getNodes();
    nodes?.forEach((n) => {
      // check for rollover
      // TODO: Move this logic to abstract GuiElement class
      const mouseIsOverNode = n.checkMouseOver(p.mouseX, p.mouseY);
      if (mouseIsOverNode) {
        n.setIsRolledOver();
      } else {
        n.setIsRolledOver(false);
      }
      // if node is being dragged, update its position
      if (n.getIsDragging()) {
        n.dragToPosition(new Position(p.mouseX - 40, p.mouseY - 20));
      }

      RenderNode.render(n, ApplicationModel.getP() as p5);
    });
  }
  static drawLeadLine(p: p5, appModel: ApplicationModel,
    startPosition:Position, mousePosition:Position): void {
    const lineArray = [startPosition as Position, mousePosition];
    RenderEdge.renderLines(lineArray, "rgb(0,128,255)");
  }
  // RENDER
  static renderElements(appModel: ApplicationModel): void {
    const p = ApplicationModel.getP() as p5;
    // const appModel:ApplicationModel = (ChartManager.getApplicationModel() as ApplicationModel);

    const toolbox = appModel?.getToolbox();
    const inspector = appModel?.getInspector();
    // const nodes = appModel?.getNodes();
    // const edges = appModel?.getEdges();
    // const tools = toolbox?.getToolList();
    const dynamicTool = appModel?.getDynamicTool();
    // const selectedNodes = appModel?.getSelectedNodes();
    // const selectedEdges = appModel?.getSelectedEdges();
    // const selectedPlugs = appModel?.getSelectedPlugs();

    // 1. RENDER TOOLBOX
    RenderToolbox.render(toolbox);

    // 2. RENDER INSPECTOR (and parameters in node)
    RenderInspector.render(
      inspector,
      appModel?.getSelectedNodes()[0] as NodeModel
    );
    const mouseIsOverToolbox = toolbox?.checkMouseOver(p.mouseX, p.mouseY);
    if (mouseIsOverToolbox) {
      toolbox?.setIsRolledOver();
    }

    // 3. RENDER TOOLS
    this.renderTools(p, appModel);

    // 4. RENDER EDGES
    this.renderEdges(appModel);

    // 5. RENDER NODES
    this.renderNodes(p, appModel);

    // 6. RENDER DYNAMIC TOOL
    if (dynamicTool !== null) {
      // this.dynamicTool.render();
      RenderTool.render(dynamicTool);
    }

    // 7. (DEBUG): RENDER GRID & GUIDES
    RenderGuides.render();
    // const htmlContainer = document.getElementById('htmlContainer');
    // CreationManager.createContainer(p, htmlContainer as HTMLElement);
  }

  // 5. RENDER EDGES
  static renderEdges(appModel: ApplicationModel): void {
    // const appModel:ApplicationModel = (ChartManager.getApplicationModel() as ApplicationModel);
    const edges = appModel.getEdges();
    edges?.forEach((e) => {
      RenderEdge.render(e);
    });
  }
  // 3. RENDER TOOLS
  static renderTools(p: p5, appModel: ApplicationModel): void {
    // const appModel:ApplicationModel = (ChartManager.getApplicationModel() as ApplicationModel);
    const toolbox = appModel.getToolbox();
    toolbox?.getToolList().forEach((t) => {
      // check for rollover
      // TODO: Move this logic to abstract GuiElement class
      if (t.getIsDragging()) {
        InteractionManager.dragDynamicTool(
          appModel,
          new Position(p.mouseX - 40, p.mouseY - 20),
          t
        );
      }
      const mouseIsOverTool = (t as ToolModel).checkMouseOver(
        p.mouseX,
        p.mouseY
      );
      if (mouseIsOverTool) {
        t.setIsRolledOver();
      } else {
        t.setIsRolledOver(false);
      }
    });
  }
}
export default RenderApplication;

// Node to node selection -- not using this interaction for now.
// if (appModel.getSelectedNodes().length > 0) {
//   // TODO: Only draw line if user is hovering over another node:
//   //  1. iterate through plugs and check closest
//   const plugArray =
//     InteractionManager.getClosestPlugsOnSelectedNode(appModel);
//   // console.log('plugArray: '+plugArray);

//   // TODO: Draw this line only when dragging or selecting a plug
//   // const closestPlugOnSelectedNode = plugArray[0];
//   // const closestPlugPosition = closestPlugOnSelectedNode?.getPosition();
//   // const mousePosition = new Position(p.mouseX, p.mouseY);
//   // this.drawLeadLine(p, appModel,
//   //   closestPlugPosition as Position, mousePosition);
// }

// static render(
//   application:ApplicationModel,
//   // inspector:InspectorModel,
//   // isFirstParameter=false,
//   // shouldAddHorizontalDivider=false,
// ):void {
//   const p = this.p;
//   if (p === null) { throw(new Error('p is null in RenderApplication')); }
//   p.push();
//   // p.translate(

//   // );
//   p.pop();

// }
