
const NAME = "NAME";
const VALUE = "VALUE";
const UNITS = "UNITS";

type ParameterFieldType = typeof NAME
  | typeof VALUE
  | typeof UNITS;

export const ParameterFieldTypes = {
  NAME,
  VALUE,
  UNITS,
}
export default ParameterFieldType;