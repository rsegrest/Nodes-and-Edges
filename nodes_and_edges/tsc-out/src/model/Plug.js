import Layout from "./Layout";
import Position from "./Position";
class Plug {
    constructor(plugPosition, position) {
        this.plugPosition = plugPosition;
        this.position = position;
        // Edge that this plug is plugged into (null if not plugged in)
        this.plugSocket = null;
        this.plugPosition = plugPosition;
        this.position = position;
    }
    getPosition() {
        return this.position;
    }
    checkMouseOver(mouseX, mouseY) {
        const distance = Layout.getDistance(this.position, new Position(mouseX, mouseY));
        return distance < 15;
    }
    plugIn(edge) {
        this.plugSocket = edge;
    }
    toString() {
        return `Plug: ${this.plugPosition}, position: ${this.position}, plugSocket: ${this.plugSocket}`;
    }
}
export default Plug;
