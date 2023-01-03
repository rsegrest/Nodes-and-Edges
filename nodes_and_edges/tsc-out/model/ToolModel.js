import ElementGenerator from "./abstract/DraggableGuiElement";
class ToolModel extends ElementGenerator {
    doubleClickAction() {
        throw new Error("Method not implemented.");
    }
    constructor(name, icon, objectType, // describes object to create
    position = null, dimensions = null, type = "Tool") {
        super(position, dimensions, false);
        this.name = name;
        this.type = type;
        this.name = name;
        this.icon = icon;
        this.objectType = objectType;
        this.setUpBoundary();
    }
    getName() {
        return this.name;
    }
    getIcon() {
        return this.icon;
    }
    getObjectType() {
        return this.objectType;
    }
    clickAction() {
        console.log('tool clicked');
    }
    dragToPosition(position) {
        // throw(new Error('hit dragToPosition in ToolModel'));
        // console.warn('SHOULD HIT in TM -- tool dragged to position:  ', position);
        this.setPosition(position);
    }
    // override toString()
    toString() {
        return `Tool: ${this.name}, ${this.icon}, ${this.objectType},\n\tPos: ${this.position},\n\tDim:${this.dimensions}`;
    }
}
export default ToolModel;
