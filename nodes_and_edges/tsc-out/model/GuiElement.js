class GuiElementModel {
    constructor(_isInteractive, position = null, dimensions = null) {
        this._isInteractive = false;
        this.position = null;
        this.dimensions = null;
        this._isInteractive = _isInteractive;
        position && (this.position = position);
        dimensions && (this.dimensions = dimensions);
    }
}
export default GuiElementModel;
