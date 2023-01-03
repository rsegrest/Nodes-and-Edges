class DragManager {
    static checkForEdgeDragTargets(appModel) {
        const edgeList = appModel.getEdges();
        // find edge drag targets
        if (edgeList.length > 0) {
            for (let i = 0; i < edgeList.length; i += 1) {
                const edge = edgeList[i];
                if (typeof edge === 'undefined') {
                    continue;
                }
                if (edge === null) {
                    continue;
                }
                if (edge === null || edge === void 0 ? void 0 : edge.getIsRolledOver()) {
                    return edge;
                }
            }
        }
        return null;
    }
    static checkForPlugDragTargets(appModel) {
        const plugList = appModel.getNodes().flatMap((node) => node.getPlugs());
        // find plug drag targets
        if (plugList.length > 0) {
            for (let i = 0; i < plugList.length; i += 1) {
                const plug = plugList[i];
                if (typeof plug === 'undefined') {
                    continue;
                }
                if (plug === null) {
                    continue;
                }
                if (plug.getIsRolledOver()) {
                    return plug;
                }
            }
        }
        return null;
    }
    static checkForNodeDragTargets(appModel) {
        const nodeList = appModel.getNodes();
        // find node drag targets
        if (nodeList.length > 0) {
            for (let i = 0; i < nodeList.length; i += 1) {
                const node = nodeList[i];
                if (typeof node === 'undefined') {
                    continue;
                }
                if (node === null) {
                    continue;
                }
                if (node === null || node === void 0 ? void 0 : node.getIsRolledOver()) {
                    return node;
                }
            }
        }
        return null;
    }
    static checkForToolsDragTargets(appModel) {
        // check tools for drag targets
        const toolbox = appModel.getToolbox();
        if (toolbox) {
            if (toolbox.getIsRolledOver()) {
                const toolList = toolbox.getToolList();
                // toolList.forEach((tool) => {
                for (let i = 0; i < toolList.length; i += 1) {
                    const tool = toolList[i];
                    if (tool.getIsRolledOver()) {
                        return tool;
                    }
                }
                ;
            }
        }
        return null;
    }
    // INTERACTION (MOUSE)
    static clearDragTargets(appModel) {
        // const appModel:ApplicationModel = (ChartManager.getApplicationModel() as ApplicationModel);
        appModel.getNodes().forEach((node) => {
            node.setIsDragging(false);
            node.getPlugs().forEach((plug) => plug.setIsDragging(false));
        });
        appModel.getEdges().forEach((edge) => edge.setIsDragging(false));
        appModel.getToolbox().getToolList().forEach((tool) => tool.setIsDragging(false));
    }
    // INTERACTION (MOUSE)
    static getDragTarget(appModel) {
        // const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
        const tool = DragManager.checkForToolsDragTargets(appModel);
        if (tool) {
            tool.setIsDragging(true);
            return tool;
        }
        const plug = DragManager.checkForPlugDragTargets(appModel);
        if (plug) {
            plug.setIsDragging(true);
            return plug;
        }
        const edge = DragManager.checkForEdgeDragTargets(appModel);
        if (edge) {
            edge.setIsDragging(true);
            return edge;
        }
        ;
        const node = DragManager.checkForNodeDragTargets(appModel);
        if (node) {
            console.log('dragging node', node);
        }
        if (node) {
            node.setIsDragging(true);
            return node;
        }
        ;
        return null;
    }
}
export default DragManager;
