export class Dimension {
  public readonly width:number;
  public readonly height:number;
  constructor(
    width:number,
    height:number,
  ) {
    this.width = width;
    this.height = height;
  }
  public toString():string {
    return `Dimension:(width:${this.width},  height:${this.height})`;
  }
}
export default Dimension;
