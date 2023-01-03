import Position from "./Position";
import Plug from './Plug';
import PlugPosition from "./PlugPosition";
export class NodeModel {
    constructor(id, label, position, dimensions) {
        this.id = id;
        this.label = label;
        this.position = position;
        this.dimensions = dimensions;
        this.showNodes = false;
        this.isSelected = false;
        this.id = id;
        this.label = label;
        this.position = position;
        this.dimensions = dimensions;
        this.plugs = this.createPlugs();
    }
    getBoundary() {
        return {
            left: this.position.x - 10,
            top: this.position.y - 10,
            right: this.position.x + 10 + this.dimensions.width,
            bottom: this.position.y + 10 + this.dimensions.height,
        };
    }
    checkMouseOver(mouseX, mouseY) {
        const boundary = this.getBoundary();
        const isOver = (mouseX >= (boundary.left) &&
            mouseX <= (boundary.right) &&
            mouseY >= (boundary.top) &&
            mouseY <= (boundary.bottom));
        return isOver;
    }
    createPlugs() {
        const plugArray = [];
        const plugPositions = [
            PlugPosition.NW,
            PlugPosition.SW,
            PlugPosition.SE,
            PlugPosition.NE,
            PlugPosition.N,
            PlugPosition.S,
            PlugPosition.E,
            PlugPosition.W,
        ];
        for (let i = 0; i < 8; i++) {
            const addPlug = new Plug(plugPositions[i], this.getPlugPosition(plugPositions[i]));
            plugArray.push(addPlug);
        }
        return plugArray;
    }
    setSelected(isSelected = true) {
        this.isSelected = isSelected;
    }
    deselect() {
        this.isSelected = false;
    }
    getIsSelected() {
        return this.isSelected;
    }
    getPlugPosition(plugPosition) {
        const x = this.position.x;
        const y = this.position.y;
        const width = this.dimensions.width;
        const height = this.dimensions.height;
        switch (plugPosition) {
            case PlugPosition.NW:
                return new Position(x + 3, y);
            case PlugPosition.N:
                return new Position(x + 3 + width / 2, y);
            case PlugPosition.NE:
                return new Position(x + 3 + width, y);
            case PlugPosition.SW:
                return new Position(x + 3, y + height);
            case PlugPosition.S:
                return new Position(x + 3 + width / 2, y + height);
            case PlugPosition.SE:
                return new Position(x + 3 + width, y + height);
            case PlugPosition.W:
                return new Position(x + 3, y + height / 2);
            case PlugPosition.E:
                return new Position(x + 3 + width, y + height / 2);
            default:
                return new Position(0, 0);
        }
    }
    getID() {
        return this.id;
    }
    getLabel() {
        return this.label;
    }
    getShowNodes() {
        return this.showNodes;
    }
    getPlugs() {
        return this.plugs;
    }
    getPlugByPosition(plugPosition) {
        return this.plugs.find((plug) => plug.plugPosition === plugPosition);
    }
    toString() {
        // console.log("NODE MODEL TO STRING")
        return `NodeModel: ${this.id} ${this.label} ${this.position.toString()} ${this.dimensions.toString()}`;
    }
}
export default NodeModel;
