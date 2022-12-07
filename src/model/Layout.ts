import p5 from "p5";
import Position from "./Position";

export class Layout {
  private static instance:Layout|null = null;
  public static readonly BASE_NODE_WIDTH = 100;
  public static readonly BASE_NODE_HEIGHT = 50;

  private width = 0;
  private height = 0;

  private constructor(p:p5) {
    this.width = p.width;
    this.height = p.height;
  }
  public createInstance(p:p5):Layout {
    if (Layout.instance === null) {
      Layout.instance = new Layout(p);
    }
    return Layout.instance;
  }
  public getInstance():Layout {
    if (Layout.instance === null) {
      throw new Error('Layout instance is not created yet');
    }
    return Layout.instance;
  }
  public static getDistance(
    position1:Position,
    position2:Position
  ):number {
    const x = position1.x - position2.x;
    const y = position1.y - position2.y;
    return Math.sqrt(x*x + y*y);
  }
}
export default Layout;