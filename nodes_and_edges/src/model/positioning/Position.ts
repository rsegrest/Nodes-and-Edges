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
  public static getDistance(p1:Position, p2:Position):number {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx*dx + dy*dy);
  }
  public getDistance(p2:Position):number {
    return Position.getDistance(this, p2);
  }
}
export default Position;
