import GuiElementModel from "./GuiElement";
import ParameterFieldType from "./ParameterFieldType";

class EditableField extends GuiElementModel {
  constructor(
    protected fieldType: ParameterFieldType,
    protected isEditing: boolean = false
  ) {
    super(true, false, false, true);
  }
  public doubleClickAction(): void {
    this.setIsEditing(true);
  }
  public clickAction(): void {
    // do nothing
  }
  public getIsEditing(): boolean {
    return this.isEditing;
  }
  public setIsEditing(isEditing: boolean): void {
    this.isEditing = isEditing;
  }

}
export default EditableField;