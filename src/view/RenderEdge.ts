import p5 from "p5";
import EdgeModel from "../model/EdgeModel";
import NodeModel from "../model/NodeModel";
import Position from "../model/Position";

class RenderEdge {
  private static p: p5;
  constructor(p:p5) {
    RenderEdge.p = p;
  }
  
  static plotLinesBetweenNodes(
    node1:NodeModel, node2:NodeModel
  ):Position[] {
    const p = RenderEdge.p;
    const start = node1.position;
    const end = node2.position;

    // TODO: Verify next line
    const mid_1x = start.x + (end.x - start.x) / 2;
    const mid_1y = start.y;

    const mid_2x = mid_1x;
    const mid_2y = end.y;
    const mid_1 = new Position(mid_1x, mid_1y);
    const mid_2 = new Position(mid_2x, mid_2y);
    return [start, mid_1, mid_2, end]

  }
  // currently, up to three lines are drawn, double L shape
  static renderLines(positions:Position[]):void {
    const p = RenderEdge.p;
    p.push();
    p.noFill();
    p.strokeWeight(2);
    p.stroke('rgb(255,0,255)');
    for (let i = 1; i < positions.length; i += 1) {
      const start = positions[i-1];
      const end = positions[i];
      p.line(
        (start as Position).x,
        (start as Position).y,
        (end as Position).x,
        (end as Position).y
      );
    }
    p.pop();
  }

  static render(edge: EdgeModel): void {
    const start = edge.getSourceNode();
    const end = edge.getTargetNode();
    const positions = this.plotLinesBetweenNodes(
      start as NodeModel, end as NodeModel
    );
    this.renderLines(positions);
  }
}
export default RenderEdge;