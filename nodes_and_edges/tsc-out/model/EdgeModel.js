import DraggableGuiElementModel from "./abstract/DraggableGuiElement";
class EdgeModel extends DraggableGuiElementModel {
    doubleClickAction() {
        throw new Error("Method not implemented.");
    }
    constructor(id, sourceNode, targetNode, sourcePlug, targetPlug) {
        super(null, null, false);
        this.type = "Edge";
        this.sourceNode = null;
        this.targetNode = null;
        this.sourcePlug = null;
        this.targetPlug = null;
        this.id = id;
        this.sourceNode = sourceNode;
        if (targetNode) {
            this.targetNode = targetNode;
        }
        if (sourcePlug) {
            this.sourcePlug = sourcePlug;
        }
        if (targetPlug) {
            this.targetPlug = targetPlug;
        }
    }
    connectSource(node, plug = null) {
        this.sourceNode = node;
        if (plug) {
            this.sourcePlug = plug;
        }
    }
    connectTarget(node, plug = null) {
        this.targetNode = node;
        if (plug) {
            this.targetPlug = plug;
        }
    }
    getSourceNode() {
        return this.sourceNode;
    }
    getTargetNode() {
        return this.targetNode;
    }
    getSourcePlug() {
        return this.sourcePlug;
    }
    getTargetPlug() {
        return this.targetPlug;
    }
    getId() {
        return this.id;
    }
    dragToPosition(position) {
        throw new Error("Method not implemented.");
    }
    clickAction() {
        throw new Error("Method not implemented.");
    }
    toString() {
        return `EdgeModel: ${this.id}, sourceNode: ${this.sourceNode}, targetNode: ${this.targetNode}, sourcePlug: ${this.sourcePlug}, targetPlug: ${this.targetPlug}`;
    }
    toDyreqtJson() {
        throw new Error("EdgeModel-- toDyreqtJson: Method not implemented.");
        const json = {
            id: this.id,
            sourceNode: this.sourceNode,
            targetNode: this.targetNode,
            sourcePlug: this.sourcePlug,
            targetPlug: this.targetPlug
        };
        return JSON.parse(JSON.stringify(json));
    }
}
export default EdgeModel;
