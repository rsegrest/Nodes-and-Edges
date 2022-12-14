import Parameter from "./abstract/Parameter";

class InputParameterModel extends Parameter {
    public readonly type = "InputParameter";
    constructor(
        name: string,
        value: string|number,
        units: string|null = null
    ) {
      super(name, value, units);
    }
}
export default InputParameterModel;