import Boundary from "../positioning/Boundary";
class GuiElementModel {
    constructor(_isClickable, _isDraggable, _isResizable, _isSelectable, position = null, dimensions = null, boundary = null) {
        this._isClickable = true;
        this._isSelectable = false;
        this._isDraggable = false;
        this._isResizable = false;
        this.position = null;
        this.dimensions = null;
        this.boundary = null;
        this.isVisible = true;
        this.isSelected = false;
        this.isRolledOver = false;
        this._isClickable = _isClickable;
        this._isDraggable = _isDraggable;
        this._isResizable = _isResizable;
        this._isSelectable = _isSelectable;
        position && (this.setPosition(position));
        dimensions && (this.setDimensions(dimensions));
        boundary && (this.setUpBoundary());
    }
    checkBoundary(mouseX, mouseY, output = false) {
        const boundary = this.getBoundary();
        if (output)
            console.log("checkBoundary: " + boundary);
        if (!boundary) {
            return false;
        }
        const isOver = (mouseX >= (boundary.getLeft()) &&
            mouseX <= (boundary.getRight()) &&
            mouseY >= (boundary.getTop()) &&
            mouseY <= (boundary.getBottom()));
        return isOver;
    }
    getIsDraggable() {
        return this._isDraggable;
    }
    getIsClickable() {
        return this._isClickable;
    }
    getIsResizable() {
        return this._isResizable;
    }
    rolloverAction() {
        this.isRolledOver = true;
    }
    setPosition(position) {
        this.position = position;
        this.setUpBoundary();
    }
    getPosition() {
        return this.position;
    }
    setDimensions(dimensions) {
        this.dimensions = dimensions;
        this.setUpBoundary();
    }
    getDimensions() {
        return this.dimensions;
    }
    setUpBoundary(addMargin = 0) {
        const pos = this.getPosition();
        const dim = this.getDimensions();
        if ((pos === null) || (typeof pos === 'undefined')
            || (dim === null) || (typeof dim === 'undefined')) {
            return;
        }
        const boundary = new Boundary(this.position.x - addMargin, this.position.y - addMargin, this.position.x + this.dimensions.width + addMargin, this.position.y + this.dimensions.height + addMargin);
        // if (checkOutput) { console.table(boundary); }
        // console.log("setUpBoundary: " + boundary)
        this.boundary = boundary;
    }
    getBoundary() {
        return this.boundary;
    }
    setVisible(visible = true) {
        this.isVisible = visible;
    }
    setHidden(isHidden = true) {
        this.isVisible = !isHidden;
    }
    getIsVisible() {
        return this.isVisible;
    }
    getIsHidden() {
        return !this.isVisible;
    }
    getIsRolledOver() {
        return this.isRolledOver;
    }
    setIsRolledOver(isRolledOver = true) {
        this.isRolledOver = isRolledOver;
    }
    getIsSelected() {
        return this.isSelected;
    }
    setIsSelected(isSelected = true) {
        this.isSelected = isSelected;
    }
    getIsSelectable() {
        return this._isSelectable;
    }
    setSelectable(isSelectable = true) {
        this._isSelectable = isSelectable;
    }
}
export default GuiElementModel;
