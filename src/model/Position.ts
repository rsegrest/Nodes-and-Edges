export class Position {
  constructor(
    public readonly x:number,
    public readonly y:number,
  ) {
    this.x = x;
    this.y = y;
  }
  public toString():string {
    return `Position:(x:${this.x}, y:${this.y})`;
  }
}
export default Position;
