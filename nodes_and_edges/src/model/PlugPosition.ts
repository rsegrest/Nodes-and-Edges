const PlugPosition = {
  type: "PlugPosition",
  N: 'N',
  S: 'S',
  E: 'E',
  W: 'W',
  NE: 'NE',
  NW: 'NW',
  SE: 'SE',
  SW: 'SW',
}
type PlugPosition = typeof PlugPosition
 | typeof PlugPosition.N | typeof PlugPosition.S
 | typeof PlugPosition.E | typeof PlugPosition.W
 | typeof PlugPosition.NE | typeof PlugPosition.NW
 | typeof PlugPosition.SE | typeof PlugPosition.SW;
export default PlugPosition;