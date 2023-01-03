import CreationManager from "../controller/CreationManager";
// TODO: Manage positions for toolbox and inspector, other in this class?
import NodeModel from "./NodeModel";
import InspectorModel from "./inspector/InspectorModel";
import ToolboxModel from "./ToolboxModel";
import InspectorInfoRow from "./inspector/InspectorInfoRow";
class ApplicationModel {
    clearPlugsSelected() {
        const nodes = this.getNodes();
        if (nodes.length > 0) {
            for (let i = 0; i < nodes.length; i++) {
                const plugsForNode = nodes[i].getPlugs();
                plugsForNode.forEach((plug) => {
                    plug.setIsSelected(false);
                });
            }
        }
        return;
    }
    getPlugParent(plug) {
        var _a;
        const nodes = this.getNodes().filter((node) => node.getPlugs().includes(plug));
        if (nodes.length > 0) {
            for (let i = 0; i < nodes.length; i++) {
                if ((_a = nodes[i]) === null || _a === void 0 ? void 0 : _a.getPlugs().includes(plug)) {
                    return nodes[i];
                }
            }
        }
        return null;
    }
    getDraggingNodes() {
        return this.getNodes().filter((node) => node.getIsDragging());
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
        this.nodes = [];
        this.edges = [];
        this.toolbox = new ToolboxModel();
        this.inspector = new InspectorModel();
        this.dynamicTool = null;
        // getRolledOverObjects
        this.rolledOverObjects = [];
        this.initializeForDev();
    }
    // FOR DEVELOPMENT TESTING
    initializeForDev() {
        this.nodes = CreationManager.createNodes();
        // this.edges = CreationManager.createEdges(this.nodes);
        this.edges = [];
    }
    static addCharacterToEditTarget(key) {
        if (this.editTarget === null)
            return;
        if (this.editTarget instanceof NodeModel) {
            this.editTarget.setLabel(this.editTarget.getLabel() + key);
        }
        if (this.editTarget instanceof InspectorInfoRow) {
            console.warn(`InspectorInfoRow: ${this.editTarget.getValue()}`);
            this.editTarget.setValue(this.editTarget.getValue() + key);
        }
    }
    static backspaceEditTarget() {
        if (this.editTarget === null)
            return;
        let content = null;
        // let setFunction = null;
        if (this.editTarget instanceof NodeModel) {
            content = this.editTarget.getLabel();
            // setFunction = this.editTarget.setLabel;
            // if (content === null) return;
            const bsLabelContent = content.toString().slice(0, -1);
            console.log(bsLabelContent);
            this.editTarget.setLabel(bsLabelContent);
        }
        else if (this.editTarget instanceof InspectorInfoRow) {
            console.log('bet-- iir');
            content = this.editTarget.getValue();
            console.log(content);
            const bsLabelContent = content.toString().slice(0, -1);
            this.editTarget.setValue(bsLabelContent);
            return;
        }
    }
    static getEditTarget() {
        return ApplicationModel.editTarget;
    }
    static setEditTarget(editingString) {
        ApplicationModel.editTarget = editingString;
    }
    static clearEditTarget() {
        ApplicationModel.editTarget = null;
        // nodes
        ApplicationModel.getInstance().getNodes().forEach((node) => {
            node.setIsEditing(false);
        });
        // TODO: clear edit target for parameters (edge labels?)
    }
    addNode(node) {
        this.nodes.push(node);
    }
    removeNode(node) {
        const index = this.nodes.indexOf(node);
        if (index > -1) {
            this.nodes.splice(index, 1);
        }
    }
    addEdge(edge) {
        this.edges.push(edge);
    }
    removeEdge(edge) {
        const index = this.edges.indexOf(edge);
        if (index > -1) {
            this.edges.splice(index, 1);
        }
    }
    // GETTERS
    getSelectedNodes() {
        return this.nodes.filter((node) => node.getIsSelected());
    }
    getSelectedEdges() {
        return this.edges.filter((edge) => edge.getIsSelected());
    }
    getSelectedPlugs() {
        const selectedPlugs = [];
        this.nodes.forEach((node) => {
            selectedPlugs.push(...node.getSelectedPlugs());
        });
        return selectedPlugs;
    }
    getSelectedParameters() {
        const selectedParameters = [];
        this.nodes.forEach((node) => {
            selectedParameters.push(...node.getSelectedParameters());
        });
        return selectedParameters;
    }
    getRolledOverNodes() {
        return this.nodes.filter((node) => node.getIsRolledOver());
    }
    getNodes() {
        return this.nodes;
    }
    getEdges() {
        return this.edges;
    }
    getInspector() {
        return this.inspector;
    }
    getToolbox() {
        return this.toolbox;
    }
    static createInstance() {
        if (ApplicationModel.instance === null) {
            ApplicationModel.instance = new ApplicationModel();
        }
        return ApplicationModel.instance;
    }
    static getInstance() {
        if (ApplicationModel.instance === null) {
            console.warn("ApplicationModel instance is null");
            ApplicationModel.instance = new ApplicationModel();
        }
        return ApplicationModel.instance;
    }
    getDynamicTool() {
        return this.dynamicTool;
    }
    // SETTERS
    setDynamicTool(dtool) {
        this.dynamicTool = dtool;
    }
    setDynamicSlot(dt) {
        this.dynamicTool = dt;
    }
    // OVERLOADS
    toString() {
        let returnStr = `ApplicationModel:\n\t${this.nodes.length} nodes,\n\t${this.edges.length}\n`;
        returnStr += "NODES: [\n\t";
        this.nodes.forEach((node) => {
            returnStr += `\t${node.toString()},\n`;
        });
        returnStr += "]\nEDGES: [\n\t";
        this.edges.forEach((edge) => {
            returnStr += `\t${edge.toString()},\n`;
        });
        returnStr += "";
        return returnStr;
    }
}
ApplicationModel.instance = null;
ApplicationModel.editTarget = null;
export default ApplicationModel;
