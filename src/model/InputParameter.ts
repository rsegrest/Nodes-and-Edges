import Parameter from "./abstract/Parameter";

class InputParameter extends Parameter {
    constructor(
        name: string,
        value: string,
        units: string|null = null
    ) {
      super(name, value, units);
    }
}
export default InputParameter;