import p5 from "p5"
import NodeModel from "../model/NodeModel";

export class RenderNode3D {
  private static p:p5;
  constructor(p:p5) {
    RenderNode3D.p = p;
  }
  static render(
    // node:NodeModel
  ):void {
    const p = RenderNode3D.p;
    console.log('RenderNode3D.render() called');
    p.box(150, 75, 10);
  }
}
export default RenderNode3D;