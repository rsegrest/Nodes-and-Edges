class RolloverManager {
    static checkForInspectorInfoRowRollover(mouseX, mouseY, appModel) {
        // console.log(`MouseManager.checkForInspectorInfoRowRollover(): mouseX: ${mouseX}, mouseY: ${mouseY}`)
        const inspector = appModel.getInspector();
        const inspectorTable = inspector.getTable();
        const infoRows = inspectorTable.getInfoRows();
        // working above, but not below
        for (let i = 0; i < infoRows.length; i += 1) {
            const infoRow = infoRows[i];
            console.log(`infoRow: ${infoRow}`);
            if (infoRow.checkBoundary(mouseX, mouseY, true)) {
                return infoRow;
            }
        }
        return null;
    }
    static checkForRollover(mouseX, mouseY, appModel) {
        // console.log(`MouseManager.mouseMoved(): mouseX: ${mouseX}, mouseY: ${mouseY}`);
        // Check all elements for rollover
        const foundPlug = this.checkForPlugRollover(mouseX, mouseY, appModel);
        if (foundPlug) {
            return;
        }
        const foundParam = this.checkForParamRollover(mouseX, mouseY, appModel);
        if (foundParam) {
            return;
        }
        const foundTool = this.checkForToolsRollover(mouseX, mouseY, appModel);
        if (foundTool) {
            return;
        }
        const foundNode = this.checkForNodeRollover(mouseX, mouseY, appModel);
        if (foundNode) {
            return;
        }
        const foundEdge = this.checkForEdgeRollover(mouseX, mouseY, appModel);
        if (foundEdge) {
            return;
        }
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
    static checkForPlugRollover(mouseX, mouseY, appModel) {
        let foundPlug = null;
        const nodes = appModel.getNodes();
        for (let i = 0; i < nodes.length; i += 1) {
            const node = nodes[i];
            const plugs = node.getPlugs();
            for (let i = 0; i < plugs.length; i += 1) {
                const plug = plugs[i];
                if (plug.checkBoundary(mouseX, mouseY)) {
                    plug.setIsRolledOver();
                    foundPlug = plug;
                }
                else {
                    plug.setIsRolledOver(false);
                }
            }
        }
        ;
        return foundPlug;
    }
    static checkForParamRollover(mouseX, mouseY, appModel) {
        let foundParam = null;
        // Input Params
        const selectedNodes = appModel.getSelectedNodes();
        for (let i = 0; i < selectedNodes.length; i += 1) {
            const node = selectedNodes[i];
            const inputParams = node.getInputParameterList();
            for (let i = 0; i < inputParams.length; i += 1) {
                const inputParam = inputParams[i];
                if (inputParam.checkBoundary(mouseX, mouseY)) {
                    // console.warn(`MouseManager.mouseMoved(): inputParam->setIsRolledOver(): [\n\t${inputParam}\n\t]()}]`);
                    inputParam.setIsRolledOver();
                    foundParam = inputParam;
                }
                else {
                    inputParam.setIsRolledOver(false);
                }
            }
        }
        // Output Params
        for (let i = 0; i < selectedNodes.length; i += 1) {
            const node = selectedNodes[i];
            const outputParams = node.getOutputParameterList();
            for (let i = 0; i < outputParams.length; i += 1) {
                const outputParam = outputParams[i];
                if (outputParam.checkBoundary(mouseX, mouseY)) {
                    outputParam.setIsRolledOver();
                    foundParam = outputParam;
                }
                else {
                    outputParam.setIsRolledOver(false);
                }
            }
        }
        ;
        return foundParam;
    }
    static checkForNodeRollover(mouseX, mouseY, appModel) {
        let foundNode = null;
        // Nodes
        const nodes = appModel.getNodes();
        for (let i = 0; i < nodes.length; i += 1) {
            const node = nodes[i];
            if (node.checkBoundary(mouseX, mouseY)) {
                foundNode = node;
                node.setIsRolledOver();
            }
            else {
                node.setIsRolledOver(false);
            }
        }
        ;
        return foundNode;
    }
    ;
    static checkForToolsRollover(mouseX, mouseY, appModel) {
        let foundTool = null;
        // Tools
        const toolList = appModel.getToolbox().getToolList();
        for (let i = 0; i < toolList.length; i += 1) {
            const tool = toolList[i];
            if (tool.checkBoundary(mouseX, mouseY)) {
                // console.warn(`MouseManager.mouseMoved(): getToolList->setIsRolledOver(): [\n\t${tool}\n\t]()}]`);
                foundTool = tool;
                tool.setIsRolledOver();
            }
            else {
                tool.setIsRolledOver(false);
            }
        }
        ;
        return foundTool;
    }
    static checkForEdgeRollover(mouseX, mouseY, appModel) {
        const foundEdge = null;
        // Edges
        const edges = appModel.getEdges();
        for (let i = 0; i < edges.length; i += 1) {
            const edge = edges[i];
            if (edge.checkBoundary(mouseX, mouseY)) {
                // console.warn(`MouseManager.mouseMoved(): getToolList->setIsRolledOver(): [\n\t${edge}\n\t]()}]`);
                edge.setIsRolledOver();
            }
            else {
                edge.setIsRolledOver(false);
            }
        }
        ;
        return foundEdge;
    }
}
export default RolloverManager;
