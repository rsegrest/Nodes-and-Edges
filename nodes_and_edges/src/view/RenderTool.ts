import p5 from 'p5';
import Boundary from '../model/positioning/Boundary';
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
  static drawRolloverGuide(boundary: Boundary, p: p5): void {
    p.push();
    p.noFill();
    p.stroke("rgb(0,255,255)");
    p.strokeWeight(1);
    if (boundary === null) {
      console.warn("boundary is null in RenderNode.drawRolloverGuide");
      return;
    }
    p.translate(boundary.getLeft(), boundary.getTop());
    p.rect(
      0,
      0,
      boundary.getRight() - boundary.getLeft(),
      boundary.getBottom() - boundary.getTop()
    );
    p.pop();
  }
  static render(tool: ToolModel): void {
    const p = RenderTool.getP();
    const boundary = tool?.getBoundary();

    p.push();
    const pos = tool?.getPosition();
    const dim = tool?.getPosition();
    if (
      (pos === null)
      || (dim === null)
      || (typeof pos === 'undefined')
      || (typeof dim === 'undefined')
    ) {
      console.warn('tool position data is null');
      return;
    }
    if (tool?.type === 'DynamicTool') {
      p.fill('rgba(255,255,0,1)');
    } else if ( tool?.type === 'Tool') {
      p.fill('rgba(100,100,255,1)');
    } else {
      p.fill('rgba(128,0,255,1)');
    }
    
    p.stroke(72);
    p.strokeWeight(2);
    p.translate((boundary as Boundary).getLeft(), (boundary as Boundary).getTop());
    p.rect(
      0,
      0,
      (boundary as Boundary).getRight() - (boundary as Boundary).getLeft(),
      (boundary as Boundary).getBottom() - (boundary as Boundary).getTop()
    );
    p.noStroke();
    p.fill(255);
    p.text(
      tool.getName(),
      5, 5, // start
      // right and bottom bounds
      (boundary as Boundary).getRight() - (boundary as Boundary).getLeft(),
      (boundary as Boundary).getBottom() - (boundary as Boundary).getTop()
    );
    p.pop();
    
    if (boundary === null) {
      console.warn('boundary is null in RenderTool.render');
      return;
    }
    this.drawRolloverGuide(boundary, p);
  }
}
export default RenderTool;