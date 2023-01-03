import ApplicationModel from "../model/ApplicationModel";
class ChartManager {
    constructor(p) {
        ChartManager.setP(p);
        ChartManager.applicationModel = ApplicationModel.createInstance(p);
    }
    // // RENDER
    // renderNodes(p:p5): void {
    //   const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
    //   const nodes = appModel?.getNodes();
    //   nodes?.forEach((n,index) => {
    //     // check for rollover
    //     // TODO: Move this logic to abstract GuiElement class
    //     const mouseIsOverNode = n.checkMouseOver(p.mouseX, p.mouseY);
    //     if (mouseIsOverNode) { n.setIsRolledOver(); }
    //     else { n.setIsRolledOver(false); }
    //     // if node is being dragged, update its position
    //     if (n.getIsDragging()) {
    //       n.dragToPosition(new Position(p.mouseX-40, p.mouseY-20));
    //     }
    //     if (appModel.getSelectedNodes().length > 0) {
    //       // TODO: Only draw line if user is hovering over another node:
    //       //  1. iterate through plugs and check closest
    //       const plugArray = this.getClosestPlugsOnSelectedNode();
    //       // console.log('plugArray: '+plugArray);
    //       const closestPlugOnSelectedNode = plugArray[0];
    //       const closestPlugPosition = closestPlugOnSelectedNode?.getPosition();
    //       const mousePosition = new Position(p.mouseX, p.mouseY);
    //       const lineArray = [closestPlugPosition as Position, mousePosition];
    //       RenderEdge.renderLines(lineArray, "rgb(0,128,255)");
    //     }
    //     RenderNode.render(n, ChartManager.getP());
    //   });
    // }
    // // RENDER
    // renderElements(): void {
    //   const p = ChartManager.getP();
    //   const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
    //   const toolbox = appModel?.getToolbox();
    //   const inspector = appModel?.getInspector();
    //   const nodes = appModel?.getNodes();
    //   const edges = appModel?.getEdges();
    //   const tools = toolbox?.getToolList();
    //   const dynamicTool = appModel?.getDynamicTool();
    //   const selectedNodes = appModel?.getSelectedNodes();
    //   const selectedEdges = appModel?.getSelectedEdges();
    //   const selectedPlugs = appModel?.getSelectedPlugs();
    //   // 1. RENDER TOOLBOX
    //   RenderToolbox.render(toolbox);
    //   // 2. RENDER INSPECTOR (and parameters in node)
    //   RenderInspector.render(
    //     inspector,
    //     appModel?.getSelectedNodes()[0] as NodeModel
    //   );
    //   const mouseIsOverToolbox = toolbox?.checkMouseOver(p.mouseX, p.mouseY);
    //   if (mouseIsOverToolbox) { toolbox?.setIsRolledOver(); }
    //   // 3. RENDER TOOLS
    //   this.renderTools(p);
    //   // 4. RENDER EDGES
    //   this.renderEdges();
    //   // 5. RENDER NODES
    //   this.renderNodes(p);
    //   // 6. RENDER DYNAMIC TOOL
    //   if (dynamicTool !== null) {
    //     // this.dynamicTool.render();
    //     RenderTool.render(dynamicTool);
    //   }
    //   // 7. (DEBUG): RENDER GRID & GUIDES
    //   RenderGuides.render();
    //   const htmlContainer = document.getElementById('htmlContainer');
    //   CreationManager.createContainer(p, htmlContainer as HTMLElement);
    // }
    // // 5. RENDER EDGES
    // renderEdges(): void {
    //   const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
    //   const edges = appModel?.getEdges();
    //   edges?.forEach((e) => {
    //     RenderEdge.render(e);
    //   })
    //   // TODO: If a node is selected, show a preview of connection
    // }
    // // 3. RENDER TOOLS
    // renderTools(p: p5):void {
    //   const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
    //   const toolbox = appModel?.getToolbox();
    //   toolbox?.getToolList().forEach((t) => {
    //     // check for rollover
    //     // TODO: Move this logic to abstract GuiElement class
    //     if (t.getIsDragging()) {
    //       this.dragDynamicTool(new Position(p.mouseX-40, p.mouseY-20), t);
    //     }
    //     const mouseIsOverTool = (t as ToolModel).checkMouseOver(p.mouseX, p.mouseY);
    //     if (mouseIsOverTool) { t.setIsRolledOver(); }
    //     else { t.setIsRolledOver(false); }
    //   });
    // }
    static createInstance(p) {
        if (ChartManager.instance === null) {
            ChartManager.instance = new ChartManager(p);
        }
        return ChartManager.instance;
    }
    static getInstance() {
        if (ChartManager.instance === null) {
            throw new Error("ChartManager instance is not created yet");
        }
        return ChartManager.instance;
    }
    static getP() {
        return ChartManager.p;
    }
    static setP(p) {
        ChartManager.p = p;
    }
    // OVERLOADS
    toString() {
        const returnStr = 'ChartManager';
        // let returnStr = `ChartManager:\n\t${this.nodes.length} nodes,\n\t${this.edges.length}\n`;
        // returnStr += "NODES: [\n\t";
        // this.nodes.forEach((node) => {
        //   returnStr += `\t${node.toString()},\n`;
        // });
        // returnStr += "]\nEDGES: [\n\t";
        // this.edges.forEach((edge) => {
        //   returnStr += `\t${edge.toString()},\n`;
        // });
        // returnStr += "";
        return returnStr;
    }
}
ChartManager.instance = null;
export default ChartManager;
