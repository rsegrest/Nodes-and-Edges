import GuiElementModel from "./GuiElement";
class EditableField extends GuiElementModel {
    constructor(fieldType, isEditing = false) {
        super(true, false, false, true);
        this.fieldType = fieldType;
        this.isEditing = isEditing;
    }
    doubleClickAction() {
        this.setIsEditing(true);
    }
    clickAction() {
        // do nothing
    }
    getIsEditing() {
        return this.isEditing;
    }
    setIsEditing(isEditing) {
        this.isEditing = isEditing;
    }
}
export default EditableField;
