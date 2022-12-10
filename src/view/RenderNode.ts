import p5 from "p5";
import NodeModel, { Boundary } from "../model/NodeModel";
import Plug from "../model/Plug";

export class RenderNode {
  public static p: p5;
  private isSelected = false;
  constructor(p: p5) {
    RenderNode.p = p;
  }
  static renderPlug(plug: Plug, p: p5, showNodes:boolean): void {
    const pos = plug.getPosition();
    const isSelected = plug.getIsSelected();
    const x = pos.x;
    const y = pos.y;
    // const p = RenderNode.p;
    const mouseIsOver = plug.checkMouseOver(p.mouseX, p.mouseY);
    let plugStroke = "rgba(200,200,200,0.7)";
    let plugFill = "rgba(255,255,200,0.7)";
    // if mouse is over and user clicks, select plug
    // if another plug is selected and user clicks a plug, make an edge to connect
    if (mouseIsOver) {
      plugStroke = "rgba(255,255,72,1)";
      plugFill = "rgba(0,0,0,0.8)";
    }
    if (isSelected) {
      plugStroke = "rgba(255,0,72,1)";
      plugFill = "rgba(255,0,72,1)";
    }
    p.push();
    p.stroke(plugStroke);
    p.strokeWeight(2);
    p.fill(plugFill);
    if (isSelected || showNodes) {
      p.circle(x, y, 8);
    }
    p.pop();
  }

  static showNodes(node: NodeModel, p: p5, showNodes:boolean): void {
    node.getPlugs().forEach((plug) => {
      this.renderPlug(plug, p, showNodes);
    });
  }

  static render(node: NodeModel, p: p5, highlit=false): void {
    // test variables
    const TEST_ROLLOVER_GUIDE = true;
    const CORNER_RADIUS = 10;
    const boundary = node.getBoundary();
    // END test variables
    const width = node.dimensions.width;
    const height = node.dimensions.height;
    const x = node.position.x;
    const y = node.position.y;

    const label = node.getLabel();
    let fillColor = "rgba(228,200,200,1)";

    if (node.getIsSelected()) {
      fillColor = "rgba(255,255,200,1)";
    }

    p.push();
    p.translate(x, y);
    p.noStroke();
    p.fill("rgba(0,0,0,0.5)");

    let strokeColor = 'rgb(128,128,128)';
    let strokeWeight = 1;
    if (highlit) {
      strokeColor = 'rgb(255,200,0)';
      strokeWeight = 3;
    }
    // round all corners except top-left
    p.rect(0, 5, width, height, 0, CORNER_RADIUS, CORNER_RADIUS, CORNER_RADIUS);
    p.fill(fillColor);
    p.stroke(strokeColor);
    p.strokeWeight(strokeWeight);
    // TODO: modify gray corner radii to line up with borders on top shape 
    p.rect(3, 0, width, height, 0, CORNER_RADIUS, CORNER_RADIUS, CORNER_RADIUS);
    p.fill(0);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.text(label, 6, 3, width - 6, height - 6);
    p.pop();
    const showNodes = node.checkMouseOver(p.mouseX, p.mouseY);
    this.showNodes(node, p, showNodes);
    if (TEST_ROLLOVER_GUIDE) {
      RenderNode.drawRolloverGuide(boundary, p);
    }
  }
  static drawRolloverGuide(boundary: Boundary, p: p5): void {
    p.push();
    p.noFill();
    p.stroke("rgb(0,255,255)");
    p.strokeWeight(1);
    p.translate(boundary.left, boundary.top);
    p.rect(
      0,
      0,
      boundary.right - boundary.left,
      boundary.bottom - boundary.top
    );
    p.pop();
  }
}
export default RenderNode;
