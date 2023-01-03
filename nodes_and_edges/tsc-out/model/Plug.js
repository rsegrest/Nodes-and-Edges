import Layout from "./positioning/Layout";
import Position from "./positioning/Position";
import DraggableGuiElementModel from "./abstract/DraggableGuiElement";
class Plug extends DraggableGuiElementModel {
    constructor(plugPosition, position, isHighlit = false) {
        super(position, null, // dimensions are null for plugs
        false // not resizable
        );
        this.plugPosition = plugPosition;
        this.isHighlit = isHighlit;
        // Edge that this plug is plugged into (null if not plugged in)
        this.plugSocket = null;
        this.plugPosition = plugPosition;
        this.position = position;
    }
    dragToPosition(position) {
        throw new Error("Method not implemented.");
    }
    clickAction() {
        throw new Error("Method not implemented.");
    }
    // override superclass method
    checkMouseOver(mouseX, mouseY) {
        if (this.position !== null) {
            const distance = Layout.getDistance(this.position, new Position(mouseX, mouseY));
            return distance < 15;
        }
        return false;
    }
    plugIn(edge) {
        this.plugSocket = edge;
    }
    toString() {
        return `Plug: ${this.plugPosition}, position: ${this.position}, plugSocket: ${this.plugSocket}`;
    }
    // setIsSelected(isSelected=true):void {
    //   this.isSelected = isSelected;
    // }
    // getIsSelected():boolean {
    //   return this.isSelected;
    // }
    setIsHighlit(isHighlit = true) {
        this.isHighlit = isHighlit;
    }
    getIsHighlit() {
        return this.isHighlit;
    }
}
export default Plug;
