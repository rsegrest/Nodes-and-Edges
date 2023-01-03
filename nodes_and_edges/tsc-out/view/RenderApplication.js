import InteractionManager from "../controller/InteractionManager";
import Position from "../model/positioning/Position";
import P5Reference from "./P5Reference";
import RenderEdge from "./RenderEdge";
import RenderGuides from "./RenderGuide";
import RenderInspector from "./RenderInspector";
import RenderNode from "./RenderNode";
import RenderTool from "./RenderTool";
import RenderToolbox from "./RenderToolbox";
class RenderApplication {
    // private static rowCount = 0;
    // public static readonly Y_FIRST_ROW_OFFSET = 45;
    // public static readonly Y_EACH_ROW_OFFSET = 20;
    // public static readonly NAME_COLUMN_WIDTH = 150;
    constructor(p) {
        RenderApplication.p = p;
    }
    // RENDER
    static renderNodes(p, appModel) {
        const nodes = appModel === null || appModel === void 0 ? void 0 : appModel.getNodes();
        nodes === null || nodes === void 0 ? void 0 : nodes.forEach((n) => {
            // check for rollover
            // TODO: Move this logic to MouseManager / GuiElement class
            // const mouseIsOverNode = n.checkBoundary(p.mouseX, p.mouseY);
            // if (mouseIsOverNode) {
            //   n.setIsRolledOver();
            // } else {
            //   n.setIsRolledOver(false);
            // }
            // if node is being dragged, update its position
            // TODO: Move to Mouse Manager
            // if (n.getIsDragging()) {
            //   n.dragToPosition(new Position(p.mouseX - 40, p.mouseY - 20));
            // }
            RenderNode.render(n, P5Reference.p);
        });
        // const hotSpots = RenderNode.getClickHotSpots();
        // console.log("hotSpots: ", hotSpots);
    }
    static drawLeadLine(p, appModel, startPosition, mousePosition) {
        const lineArray = [startPosition, mousePosition];
        RenderEdge.renderLines(lineArray, "rgb(0,128,255)");
    }
    // RENDER
    static renderElements(appModel) {
        const p = P5Reference.p;
        // const appModel:ApplicationModel = (ChartManager.getApplicationModel() as ApplicationModel);
        const toolbox = appModel === null || appModel === void 0 ? void 0 : appModel.getToolbox();
        const inspector = appModel === null || appModel === void 0 ? void 0 : appModel.getInspector();
        // const nodes = appModel?.getNodes();
        // const edges = appModel?.getEdges();
        // const tools = toolbox?.getToolList();
        const dynamicTool = appModel === null || appModel === void 0 ? void 0 : appModel.getDynamicTool();
        // const selectedNodes = appModel?.getSelectedNodes();
        // const selectedEdges = appModel?.getSelectedEdges();
        // const selectedPlugs = appModel?.getSelectedPlugs();
        // 1. RENDER TOOLBOX
        RenderToolbox.render(toolbox);
        // 2. RENDER INSPECTOR (and parameters in node)
        RenderInspector.render(inspector);
        // Do this in MouseManager
        // const mouseIsOverToolbox = toolbox?.checkBoundary(p.mouseX, p.mouseY);
        // if (mouseIsOverToolbox) {
        //   toolbox?.setIsRolledOver();
        // }
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
        // 8. RENDER LEAD LINE if Plug is selected
        const selectedPlugs = appModel.getSelectedPlugs();
        if (selectedPlugs.length === 1) {
            RenderApplication.drawLeadLine(p, appModel, selectedPlugs[0].getPosition(), new Position(p.mouseX, p.mouseY));
        }
    }
    // 5. RENDER EDGES
    static renderEdges(appModel) {
        // const appModel:ApplicationModel = (ChartManager.getApplicationModel() as ApplicationModel);
        const edges = appModel.getEdges();
        edges === null || edges === void 0 ? void 0 : edges.forEach((e) => {
            RenderEdge.render(e);
        });
    }
    // 3. RENDER TOOLS
    static renderTools(p, appModel) {
        // const appModel:ApplicationModel = (ChartManager.getApplicationModel() as ApplicationModel);
        const toolbox = appModel.getToolbox();
        toolbox === null || toolbox === void 0 ? void 0 : toolbox.getToolList().forEach((t) => {
            // check for rollover
            // TODO: Move this logic to abstract GuiElement class
            if (t.getIsDragging()) {
                InteractionManager.dragDynamicTool(appModel, new Position(p.mouseX - 40, p.mouseY - 20), t);
            }
            // TODO: This should be done in MouseManager -- Verify if this is done there
            // const mouseIsOverTool = (t as ToolModel).checkBoundary(
            //   p.mouseX,
            //   p.mouseY
            // );
            // if (mouseIsOverTool) {
            //   t.setIsRolledOver();
            // } else {
            //   t.setIsRolledOver(false);
            // }
        });
    }
}
RenderApplication.p = null;
export default RenderApplication;
