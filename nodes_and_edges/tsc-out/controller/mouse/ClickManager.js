import Position from "../../model/positioning/Position";
class ClickManager {
    static checkElementsForClick(mouseX, mouseY, appModel) {
        const nodes = appModel.getNodes();
        let foundParam = false;
        // Params currently added to inspector
        if (appModel) {
            foundParam = this.checkForClickOnParam(mouseX, mouseY, appModel);
            // TODO: Deal with potential for more than one selected node
            // END Check for click on param
            if (foundParam) {
                return;
            }
            nodes.forEach((n) => {
                this.checkForSelectPlug(mouseX, mouseY, n);
                this.checkForSelectNode(mouseX, mouseY, appModel);
            });
        }
    }
    // TODO: Rename or simplify
    static checkForSelectParam(mouseX, mouseY, pm) {
        // const p = ApplicationModel.getP() as p5;
        let pmClicked = null;
        if (pm.checkBoundary(mouseX, mouseY)) {
            pm.setIsSelected();
            pmClicked = pm;
        }
        return pmClicked;
    }
    static checkForSelectPlug(mouseX, mouseY, n) {
        const plugs = n.getPlugs();
        // const p = ApplicationModel.getP() as p5;
        plugs.forEach((plug) => {
            if (plug.checkBoundary(mouseX, mouseY)) {
                plug.setIsSelected();
            }
        });
    }
    // Move to InteractionManager?
    static checkForClickOnParam(mouseX, mouseY, appModel) {
        let foundParam = false;
        const params = [];
        // Check for click on param
        const selectedNodes = appModel.getSelectedNodes();
        if (selectedNodes && selectedNodes.length > 0) {
            const inputParams = selectedNodes[0].getInputParameterList();
            const outputParams = selectedNodes[0].getOutputParameterList();
            params.push(...inputParams);
            params.push(...outputParams);
            // console.log(`params.length: ${params.length}`);
            for (let i = 0; i < params.length; i += 1) {
                const nextParam = params[i];
                if (nextParam === undefined) {
                    continue;
                }
                foundParam = this.checkForSelectParam(mouseX, mouseY, nextParam) !== null;
                // if (foundParam) { console.warn("FOUND PARAM, length is now: " + selectedNodes[0]?.getSelectedParameters().length); }
            }
        }
        return foundParam;
    }
    // INTERACTION
    // selectedNodes includes node to check if selected
    static checkForSelectNode(mouseX, mouseY, appModel) {
        // console.log("checkForSelectNode")
        const nodes = appModel.getNodes();
        const mousePosition = new Position(mouseX, mouseY);
        for (let i = 0; i < nodes.length; i += 1) {
            if (nodes[i] !== null && nodes[i] !== undefined) {
                const node = nodes[i];
                if (node.areParamsSelected() === false) {
                    node.setIsSelected(false);
                }
                if (node.checkBoundary(mousePosition.x, mousePosition.y)) {
                    node.clickAction();
                }
            }
        }
    }
}
export default ClickManager;
