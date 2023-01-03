class EdgeModel {
    constructor(id, sourceNode, targetNode, sourcePlug, targetPlug) {
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
    toString() {
        return `EdgeModel: ${this.id}, sourceNode: ${this.sourceNode}, targetNode: ${this.targetNode}, sourcePlug: ${this.sourcePlug}, targetPlug: ${this.targetPlug}`;
    }
}
export default EdgeModel;
