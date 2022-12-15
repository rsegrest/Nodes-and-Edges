import p5 from 'p5';
import ParameterFieldModel from '../model/ParameterFieldModel';
import Boundary from '../model/positioning/Boundary';
import ToolModel from '../model/ToolModel';

class RenderParameterField {
  // TODO: Check whether currently editing
  // TODO: Test by rendering text color from model, which will change blue/red
  // TODO: Record keystrokes and edit parameter value

  private static p: p5;
  constructor(
    p:p5
  ) {
    RenderParameterField.p = p;
  }
  public static getP(): p5 {
    return RenderParameterField.p;
  }
  static drawRolloverGuide(boundary: Boundary, p: p5): void {
    p.push();
    p.noFill();
    p.stroke("rgb(0,255,255)");
    p.strokeWeight(1);
    if (boundary === null) {
      console.warn("boundary is null in RenderParameterField.drawRolloverGuide");
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
  static render(pfm: ParameterFieldModel): void {
    const p = RenderParameterField.getP();
    const boundary = pfm?.getBoundary();

    p.push();
    const pos = pfm?.getPosition();
    const dim = pfm?.getPosition();
    if (
      (pos === null)
      || (dim === null)
      || (typeof pos === 'undefined')
      || (typeof dim === 'undefined')
    ) {
      // was throw
      console.warn('param field position data is null');
      return;
    }
    if (pfm.getIsEditing()) {
      p.fill('rgba(255,255,128,1)');
    } else {
      p.fill('rgba(255,255,255,1)');
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
      pfm.getContent(),
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
export default RenderParameterField;