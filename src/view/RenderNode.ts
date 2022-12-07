import p5 from "p5";
import NodeModel from "../model/NodeModel";
import Plug from "../model/Plug";

export class RenderNode {
  public static p:p5;
  private isSelected = false;
  constructor(p:p5) {
    RenderNode.p = p;
  }
  static renderPlug(plug:Plug):void {
    const pos = plug.getPosition();
    const x = pos.x;
    const y = pos.y;
    const p = RenderNode.p;
    const mouseIsOver = plug.checkMouseOver(p.mouseX, p.mouseY);
    let plugStroke = 'rgba(200,200,200,0.7)';
    let plugFill = 'rgba(255,255,255,0.7)';
    if (mouseIsOver) {
      plugStroke = 'rgba(255,255,128,1)';
      plugFill = 'rgba(0,0,0,0.8)';
    }
    p.push();
    p.stroke(plugStroke)
    p.strokeWeight(2);
    p.fill(plugFill);
    p.circle(x,y,8);
    p.pop();
  }
  static showNodes(
    node:NodeModel,
  ):void {
    node.getPlugs().forEach((plug) => {
      this.renderPlug(plug);
    });
  }
  static render(node:NodeModel):void {
    const p = RenderNode.p;
    const width = node.dimensions.width;
    const height = node.dimensions.height;
    const x = node.position.x;
    const y = node.position.y;
    const label = node.getLabel();
    let fillColor = 'rgba(228,200,200,1)';
    if (node.getIsSelected()) {
      fillColor = 'rgba(255,255,200,1)';
    }
    p.push();
    p.translate(x, y);
    p.noStroke();
    p.fill('rgba(0,0,0,0.5)');

    p.rect(x,(y+5),width,height);
    p.fill(fillColor);
    p.stroke(128);
    p.strokeWeight(1);
    p.rect(x+3,y,width,height);
    p.fill(0);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.text(label, (x+6),(y+3),
      (width-6),(height-6));
    const showNodes = node.checkMouseOver(p.mouseX, p.mouseY);
    if (showNodes) {
      this.showNodes(node);
    }
    p.pop();
  }
}
export default RenderNode;