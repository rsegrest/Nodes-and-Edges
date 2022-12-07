import p5 from "p5";
import EdgeModel from "../model/EdgeModel";

class RenderEdge {
  private static p: p5;
  constructor(p:p5) {
    RenderEdge.p = p;
  }
  static render(edge: EdgeModel): void {
    const p = RenderEdge.p;
    console.log('RenderEdge.render() called');
    // const start = edge.firstConnection;
    // const end = edge.secondConnection;
    // p.line(start.x, start.y, end.x, end.y);
  }
}
export default RenderEdge;