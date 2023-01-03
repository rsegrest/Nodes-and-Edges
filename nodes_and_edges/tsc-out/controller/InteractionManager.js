import DynamicToolModel from "../model/DynamicToolModel";
import Layout from "../model/positioning/Layout";
class InteractionManager {
    // INTERACTION
    static resizeCanvas(appModel, windowWidth, windowHeight) {
        // const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
        this.repositionElementOnResize(appModel === null || appModel === void 0 ? void 0 : appModel.getToolbox(), windowWidth, windowHeight);
        this.repositionElementOnResize(appModel === null || appModel === void 0 ? void 0 : appModel.getInspector(), windowWidth, windowHeight);
        // move Toolbox
        // move Tools
        // move Inspector
    }
    // INTERACTION -- MOVE TO DRAG MANAGER?
    static dragDynamicTool(appModel, pos, tool = null) {
        let dynamicTool = appModel.getDynamicTool();
        if (dynamicTool === null) {
            // CREATE NEW
            dynamicTool = new DynamicToolModel(tool === null || tool === void 0 ? void 0 : tool.getName(), tool === null || tool === void 0 ? void 0 : tool.getIcon(), tool === null || tool === void 0 ? void 0 : tool.getObjectType(), tool === null || tool === void 0 ? void 0 : tool.position, tool === null || tool === void 0 ? void 0 : tool.dimensions);
            appModel.setDynamicTool(dynamicTool);
        }
        dynamicTool.dragToPosition(pos);
    }
    // INTERACTION
    static repositionElementOnResize(element, windowWidth, windowHeight) {
        Layout.resizeCanvas(windowWidth, windowHeight);
        Layout.positionPanel(element);
        return;
    }
}
export default InteractionManager;
