import Parameter from "./abstract/Parameter";
import ApplicationModel from "./ApplicationModel";
class InputParameterModel extends Parameter {
    doubleClickAction(info) {
        this.isEditing = true;
        ApplicationModel.setEditTarget(this.value);
    }
    constructor(name, value, units = null, isEditing = false) {
        super(name, value, units);
        this.isEditing = isEditing;
        this.type = "InputParameter";
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
    getIsEditing() {
        return this.isEditing;
    }
    setIsEditing(isEditing) {
        this.isEditing = isEditing;
    }
}
export default InputParameterModel;
