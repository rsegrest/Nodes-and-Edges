import CreationManager from "./CreationManager";
import ApplicationModel from "../model/ApplicationModel";
import RolloverManager from "./mouse/RolloverManager";
import ClickManager from "./mouse/ClickManager";
import DragManager from "./mouse/DragManager";
import Position from "../model/positioning/Position";
class MouseManager {
    static mouseMoved(mouseX, mouseY, appModel) {
        RolloverManager.checkForRollover(mouseX, mouseY, appModel);
    }
    // INTERACTION (MOUSE)
    static mouseDragged(mouseX, mouseY, appModel) {
        // console.log(`mouse dragged to : ${p.mouseX}, ${p.mouseY}`);
        DragManager.getDragTarget(appModel);
        ApplicationModel.getInstance().getDraggingNodes().forEach((draggingNode) => {
            draggingNode.dragToPosition(new Position(mouseX - 20, mouseY - 20));
        });
    }
    // INTERACTION (MOUSE)
    static mouseClicked(mouseX, mouseY, appModel) {
        ApplicationModel.clearEditTarget();
        ClickManager.checkElementsForClick(mouseX, mouseY, appModel);
    }
    // LEFT OFF HERE
    // TODO: Make node editable on double click
    static doubleClicked(mouseX, mouseY, appModel) {
        console.log(`mouse double clicked`);
        const node = RolloverManager.checkForNodeRollover(mouseX, mouseY, appModel);
        if (node) {
            // node.setIsEditing(true);
            node.doubleClickAction();
        }
        console.log('about to call checkforInspectorInfoRowRollover');
        const infoRow = RolloverManager.checkForInspectorInfoRowRollover(mouseX, mouseY, appModel);
        console.log(`parameter: ${infoRow}`);
        if (infoRow) {
            console.log(`infoRow double clicked`);
            infoRow.doubleClickAction();
            // if (infoRow instanceof OutputParameterModel) {
            //   infoRow.doubleClickAction(null);
            // }
            console.log(`editTarget is : ${ApplicationModel.getEditTarget()}`);
        }
    }
    // INTERACTION (MOUSE -- STUB)
    static mousePressed(mouseX, mouseY, appModel) {
        // console.log(`mouse pressed at : ${p.mouseX}, ${p.mouseY}`);
    }
    // INTERACTION (MOUSE)
    static mouseReleased(mouseX, mouseY, appModel) {
        // const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
        if (appModel.getDynamicTool() !== null) {
            const newlyMintedNode = CreationManager.createNewObjectFromDynamicTool(appModel.getDynamicTool());
            appModel.getNodes().push(newlyMintedNode);
            appModel.setDynamicTool(null);
        }
        appModel.setDynamicTool(null);
        // if there is a dynamicTool in the slot,
        //  set the dynamicTool to null
        //  then create the new class (has info?) 
        DragManager.clearDragTargets(appModel);
    }
}
export default MouseManager;
