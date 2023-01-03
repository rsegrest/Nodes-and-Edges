import GuiElementModel from "./GuiElement";
class DraggableGuiElementModel extends GuiElementModel {
    constructor(position = null, dimensions = null, isResizable = false, // placeholder for future
    boundary = null) {
        super(true, true, true, isResizable, position, dimensions, boundary);
        this.isResizable = isResizable;
        this.isDragging = false;
    }
    setCursor(isGrabbing) {
        const defaultCanvas = document.getElementById('defaultCanvas0');
        let cursorType = 'pointer';
        if (isGrabbing) {
            cursorType = 'grab';
        }
        const htmltag = defaultCanvas;
        htmltag["style"].cursor = cursorType;
    }
    setIsDragging(isDragging) {
        this.isDragging = isDragging;
    }
    getIsDragging() {
        return this.isDragging;
    }
}
export default DraggableGuiElementModel;
