import GuiElementModel from "./GuiElement";
class InteractiveGuiElementModel extends GuiElementModel {
    constructor(position, dimensions) {
        super(true, position, dimensions);
    }
}
export default InteractiveGuiElementModel;
