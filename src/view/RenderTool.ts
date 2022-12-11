import p5 from 'p5';
import Position from '../model/positioning/Position';
import ToolModel from '../model/ToolModel';

class RenderTool {
  private static p: p5;
  constructor(
    p:p5
  ) {
    RenderTool.p = p;
  }
  public static getP(): p5 {
    return RenderTool.p;
  }
  static renderTool(tool: ToolModel, location:Position): void {
    const p = RenderTool.getP();
    p.push();
    p.translate(location.x, location.y);
    p.fill('rgba(255,200,100,1)');
    p.stroke(72);
    p.strokeWeight(2);
    p.rectMode(p.CENTER);
    p.rect(0,0, 80, 40);
    p.noStroke();
    p.fill(0);
    p.text(tool.getName(), -30, 5);
    p.pop();
  }
}
export default RenderTool;