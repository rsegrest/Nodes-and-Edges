import p5 from "p5";
import NodeModel from "../model/NodeModel";

export class RenderNode {
  public static p:p5;
  constructor(p:p5) {
    RenderNode.p = p;
  }
  static showNodes(
    node:NodeModel,
  ):void {
    const p = RenderNode.p;
    const width = node.dimensions.width;
    const height = node.dimensions.height;
    const x = node.position.x;
    const y = node.position.y;

    p.stroke('rgba(200,200,200,0.7)')
    p.strokeWeight(1);
    p.fill('rgba(255,255,255,0.7)');
    // NW
    p.circle(x+3,y,8);
		// N
		p.circle(x+3+width/2,y,8);
		// NE
		p.circle(x+3+width,y,8);
		// SW
		p.circle((x+3),(y+height),8);
		// S
		p.circle((x+3+width/2),(y+height),8);
		// SE
		p.circle((x+3+width),(y+height),8);
		// W
		p.circle(x+3,y+height/2,8);
		// E
		p.circle(x+3+width,y+height/2,8);
  }
  static render(node:NodeModel, showNodes:boolean):void {
    const p = RenderNode.p;
    const width = node.dimensions.width;
    const height = node.dimensions.height;
    const x = node.position.x;
    const y = node.position.y;
    const label = node.getLabel();
    p.push();
    p.translate(x, y);
    p.noStroke();
    p.fill('rgba(0,0,0,0.5)');

    p.rect(x,(y+5),width,height);
    p.fill(255,255,228);
    p.stroke(128);
    p.strokeWeight(1);
    p.rect(x+3,y,width,height);
    p.fill(0);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.text(label, (x+6),(y+3),
      (width-6),(height-6));
    if (showNodes) {
      this.showNodes(node);
    }
    p.pop();
  }
}
export default RenderNode;