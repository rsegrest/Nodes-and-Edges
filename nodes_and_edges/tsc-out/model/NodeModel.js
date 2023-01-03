import Position from "./positioning/Position";
import PlugModel from './PlugModel';
import PlugPosition from "./PlugPosition";
import DraggableGuiElementModel from "./abstract/DraggableGuiElement";
import ApplicationModel from "./ApplicationModel";
export class NodeModel extends DraggableGuiElementModel {
    // protected parameterList:ParameterModel[] = [];
    constructor(id, label, position, dimensions, inputParameterList = [], outputParameterList = []) {
        super(position, dimensions);
        this.id = id;
        this.label = label;
        this.position = position;
        this.dimensions = dimensions;
        this.inputParameterList = inputParameterList;
        this.outputParameterList = outputParameterList;
        this.type = "Node";
        this.showNodes = false;
        this.isHighlit = false;
        this.isEditing = false;
        this.id = id;
        this.label = label;
        this.position = position;
        this.dimensions = dimensions;
        this.plugs = this.createPlugs();
        this.setUpBoundary();
    }
    getBoundary() {
        return super.getBoundary();
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
            const addPlug = new PlugModel(plugPositions[i], this.getPlugPosition(plugPositions[i]));
            plugArray.push(addPlug);
        }
        return plugArray;
    }
    getIsEditing() {
        return this.isEditing;
    }
    setLabel(newLabel) {
        this.label = newLabel;
    }
    setIsEditing(isEditing) {
        console.log("setIsEditing: " + isEditing);
        this.isEditing = isEditing;
    }
    // NOT USED (yet)
    // deselect():void {
    //   this.isSelected = false;
    // }
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
    highlightClosestPlug(mouseX, mouseY) {
        this.plugs.forEach((plug) => {
            plug.setIsHighlit(false);
        });
        const closestPlug = this.getPlugClosestToMouse(mouseX, mouseY);
        if (closestPlug) {
            closestPlug.setIsHighlit();
        }
    }
    getPlugClosestToMouse(mouseX, mouseY) {
        let closestPlug = null;
        let closestDistance = 100000;
        for (let i = 0; i < this.plugs.length; i++) {
            const plug = this.plugs[i];
            const distance = plug.position
                .getDistance(new Position(mouseX, mouseY));
            if (distance < closestDistance) {
                closestDistance = distance;
                closestPlug = plug;
            }
        }
        return closestPlug;
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
    getSelectedPlugs() {
        return this.plugs.filter((plug) => plug.getIsSelected());
    }
    getPlugByPosition(plugPosition) {
        return this.plugs.find((plug) => plug.plugPosition === plugPosition);
    }
    setIsRolledOver(isRolledOver = true) {
        this.isRolledOver = isRolledOver;
    }
    getIsRolledOver() {
        return this.isRolledOver;
    }
    // override GUIElementModel
    rolloverAction() {
        this.isRolledOver = true;
        this.isHighlit = true;
        throw ('NodeModel rolloverAction not implemented');
        // console.log('NodeModel rolloverAction', this.toString());
    }
    // override GUIElementModel
    clickAction() {
        // console.log('clickAction: ');
        // console.log('this: ', this);
        this.isSelected = true;
        this.isHighlit = true;
        const inspector = ApplicationModel.getInstance().getInspector();
        inspector.createTable(this);
        // console.log('NodeModel onClick', this.toString());
    }
    // override GUIElementModel
    doubleClickAction() {
        this.isEditing = true;
        ApplicationModel.setEditTarget(this);
        // console.log('NodeModel doubleClickAction', this.toString());
    }
    // override setUpBoundary
    setUpBoundary() {
        super.setUpBoundary(10);
    }
    // override GUIElementModel
    setIsDragging(isDragging) {
        this.setCursor(isDragging);
        this.isDragging = isDragging;
        this.plugs.forEach((plug) => {
            plug.setIsDragging(true);
        });
    }
    dragToPosition(position) {
        // console.log(`NodeModel dragToPosition ${position.toString()}`);
        const lastPosition = this.position;
        this.position = position;
        const deltaX = position.x - lastPosition.x;
        const deltaY = position.y - lastPosition.y;
        this.setUpBoundary();
        this.plugs.forEach((plug) => {
            if (plug !== null) {
                plug.setPosition(new Position((plug).position.x + deltaX, (plug).position.y + deltaY));
            }
        });
    }
    getInputParameterList() {
        return this.inputParameterList;
    }
    getOutputParameterList() {
        return this.outputParameterList;
    }
    addInputParameter(inputParameter) {
        this.inputParameterList.push(inputParameter);
    }
    addOutputParameter(outputParameter) {
        this.outputParameterList.push(outputParameter);
    }
    setInputParameterList(inputParameterList) {
        this.inputParameterList = inputParameterList;
    }
    setOutputParameterList(outputParameterList) {
        this.outputParameterList = outputParameterList;
    }
    getSelectedParameters() {
        return [...this.inputParameterList, ...this.outputParameterList]
            .filter((parameter) => parameter.getIsSelected());
    }
    areParamsSelected() {
        return this.getSelectedParameters().length > 0;
    }
    toString() {
        return `NodeModel: ${this.id} ${this.label} ${this.position.toString()} ${this.dimensions.toString()}`;
    }
    toDyreqtJson() {
        throw (new Error('NodeModel-- toDyreqtJson: not yet implemented'));
        return JSON.stringify({
            id: this.id,
            label: this.label,
            position: this.position,
            dimensions: this.dimensions,
        });
    }
}
export default NodeModel;
