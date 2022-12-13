import Parameter from "./abstract/Parameter";

class OutputParameterModel extends Parameter {
    public readonly type = "OutputParameter";
    constructor(
        name: string,
        value: string|number,
        units: string|null = null
    ) {
      super(name, value, units);
    }
}
export default OutputParameterModel;