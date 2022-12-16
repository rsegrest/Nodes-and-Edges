import EditableField from "../abstract/EditableField";
import Position from "../positioning/Position";
import Dimension from "../positioning/Dimension";
import ParameterFieldType from "../abstract/ParameterFieldType";

class InspectorFieldModel extends EditableField {
    protected dimension: Dimension;
    protected content:string;
    public constructor(
        parameterType: ParameterFieldType,
        content: string,
        position: Position,
        dimension: Dimension,
    ) {
        super(parameterType);
        this.content = content;
        this.position = position;
        this.dimension = dimension;
    }
    public getPosition(): Position|null {
        return this.position;
    }
    public getDimension(): Dimension {
        return this.dimension;
    }
    public setPosition(position: Position): void {
        this.position = position;
    }
    public setDimension(dimension: Dimension): void {
        this.dimension = dimension;
    }
    public getContent(): string {
      return this.content;
    }
    public setContent(content:string): void {
      this.content = content;
    }
    public toString(): string {
        return `ParameterFieldModel[fieldType: ${this.fieldType}, content: ${this.content.toString()}, position: ${this.position?.toString()}, dimension: ${this.dimension.toString()}]`;
    }
}
export default InspectorFieldModel;