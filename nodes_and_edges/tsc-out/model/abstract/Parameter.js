import GuiElementModel from "./GuiElement";
class Parameter extends GuiElementModel {
    constructor(name, value, units = null) {
        super(true, false, false, true);
        this.isHighlit = false;
        this.editingField = null;
        this.typeColor = "blue";
        this.name = name;
        this.value = value;
        this.units = units;
    }
    getName() {
        return this.name;
    }
    getValue() {
        return this.value;
    }
    getUnits() {
        return this.units;
    }
    getEditingField() {
        return this.editingField;
    }
    setValue(value) {
        this.value = value;
    }
    setUnits(units) {
        this.name = `${this.name} (${units})`;
    }
    setEditingField(pft) {
        this.editingField = pft;
    }
    clickAction() {
        this.isSelected = true;
        this.isHighlit = true;
    }
    toJson() {
        return JSON.stringify(this);
    }
    toString() {
        let outputString = `Parameter: ${this.name}, value: ${this.value}`;
        if (this.units !== null) {
            outputString += `, units: ${this.units}`;
        }
        return outputString;
    }
}
export default Parameter;
