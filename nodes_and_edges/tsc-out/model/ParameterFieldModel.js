import EditableField from "./abstract/EditableField";
class ParameterFieldModel extends EditableField {
    constructor(parameterType, content, position, dimension) {
        super(parameterType);
        this.content = content;
        this.position = position;
        this.dimension = dimension;
    }
    getPosition() {
        return this.position;
    }
    getDimension() {
        return this.dimension;
    }
    setPosition(position) {
        this.position = position;
    }
    setDimension(dimension) {
        this.dimension = dimension;
    }
    getContent() {
        return this.content;
    }
    setContent(content) {
        this.content = content;
    }
    toString() {
        var _a;
        return `ParameterFieldModel[fieldType: ${this.fieldType}, content: ${this.content.toString()}, position: ${(_a = this.position) === null || _a === void 0 ? void 0 : _a.toString()}, dimension: ${this.dimension.toString()}]`;
    }
}
export default ParameterFieldModel;
