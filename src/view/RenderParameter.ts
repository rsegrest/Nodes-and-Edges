import p5 from "p5";
import InputParameterModel from "../model/InputParameterModel";
import InspectorModel from "../model/InspectorModel";
import OutputParameterModel from "../model/OutputParameterModel";
import Boundary from "../model/positioning/Boundary";
import Dimension from "../model/positioning/Dimension";
import Position from "../model/positioning/Position";

class RenderParameter {
  private static p:p5|null = null;
  private static rowCount = 0;
  public static readonly Y_FIRST_ROW_OFFSET = 45;
  public static readonly Y_EACH_ROW_OFFSET = 20;
  public static readonly NAME_COLUMN_WIDTH = 150;
  constructor(p:p5) {
    RenderParameter.p = p;
  }
  static drawColumnDivider(inspector:InspectorModel):void {
    const p = this.p;
    const inspectorPos:Position = inspector.getPosition() as Position;
    if (p === null) { throw(new Error('p is null in RenderParameter')); }
    p.push();
    p.noStroke();
    p.translate(
      inspectorPos.x+5,
      inspectorPos.y+this.Y_FIRST_ROW_OFFSET
    );
    // draw divider
    p.stroke(72);
    p.strokeWeight(1);
    const xStartLine = this.NAME_COLUMN_WIDTH-10;
    const xEndLine = xStartLine;
    const yStartLine = -15;
    const yEndLine = (inspector.boundary as Boundary).getBottom();
    p.line(
      xStartLine, yStartLine,
      xEndLine, yEndLine
    );
    p.noStroke();
    p.pop();
  }
  static renderText(
    parameter:InputParameterModel|OutputParameterModel,
    inspector:InspectorModel,
  ):void {
    const p = this.p;
    const inspectorPos:Position = inspector.getPosition() as Position;
    if (p === null) { throw(new Error('p is null in RenderParameter')); }
    p.push();

    p.translate(
      inspectorPos.x+5,
      inspectorPos.y+this.Y_FIRST_ROW_OFFSET+(this.rowCount*this.Y_EACH_ROW_OFFSET)
    );
    p.fill(0);
    p.text(
      parameter.getName(),
      0,0
    );
    let secondColumnText = parameter.getValue();
    if (typeof secondColumnText === 'number') {
      secondColumnText = secondColumnText.toFixed(3);
    }
    if (parameter.getUnits()) {
      secondColumnText += ` ${parameter.getUnits()}`;
    }
    p.text(
      secondColumnText,
      this.NAME_COLUMN_WIDTH,0
    );
    p.pop();
  }
  static setParameterPosition(
    parameter:InputParameterModel|OutputParameterModel,
    inspector:InspectorModel,
    row:number
  ):void {
    const inspectorPos:Position = inspector.getPosition() as Position;

    parameter.setPosition(new Position(
      inspectorPos.x,
      inspectorPos.y
        +7
        +(row*this.Y_EACH_ROW_OFFSET)
    ));
  }
  static setParameterDimensions(
    parameter: InputParameterModel | OutputParameterModel,
    inspector: InspectorModel
  ):void {
    parameter.setDimensions(
      new Dimension(
        (inspector.dimensions as Dimension).width as number,
        this.Y_EACH_ROW_OFFSET
      )
    )
  }
  static renderParameterRowInInspector(
    parameter:InputParameterModel|OutputParameterModel,
    inspector:InspectorModel,
    isFirstParameter = false,
    shouldAddHorizontalDivider = false,
  ):void {
    if (isFirstParameter) {
      RenderParameter.rowCount = 0;
      this.addHorizontalDivider(inspector, "Input Parameters")
    }
    if (shouldAddHorizontalDivider) {
      this.addHorizontalDivider(inspector, "Output Parameters");
    }
    if (RenderParameter.rowCount >= 8) { return; }
    const p = RenderParameter.p;
    // const inspectorPos = inspector.getPosition();
    if (p === null) { throw(new Error('p is null in RenderParameter')); }
    // if (inspectorPos === null) { throw(new Error('inspector position is null in RenderParameter')); }

    this.renderText(parameter, inspector as InspectorModel);
    RenderParameter.rowCount += 1;
  }
  static addHorizontalDivider(inspector:InspectorModel, label: string|null=null ):void {
    const p = this.p;
    const inspectorPos = inspector.getPosition();
    if (p === null) { throw(new Error('p is null in RenderParameter')); }
    if (inspectorPos === null) { throw(new Error('inspector position is null in RenderParameter')); }
    p.push();
    if (label === "Output Parameters") {
      p.fill('rgba(11,255,11,1)');
    } else {
      p.fill('rgba(255,255,148,1)');
    }
    p.translate(
      (
        (inspector.boundary as Boundary).getLeft()+2
      ),(
        (inspector.boundary as Boundary).getTop()
        +((this.rowCount)*this.Y_EACH_ROW_OFFSET)
        +30
      )
    );
    p.rect(
      0,0,
      (inspector.boundary as Boundary).getRight()-15,
      this.Y_EACH_ROW_OFFSET,
    )
    p.fill(0);
    if (label !== null) {
      // const textWidth = 
      p.text(label,5,15);
      p.stroke(0);
      p.strokeWeight(0.5);
      p.line(5,18,(inspector.dimensions as Dimension).width*.9,18);
    }
    p.pop();
    RenderParameter.rowCount += 1;
  }
  static drawOverPositionAndDimensions(parameter:InputParameterModel|OutputParameterModel):void {
    const p = this.p;
    if (p === null) { throw(new Error('p is null in RenderParameter')); }
    p.push();
    p.translate(
      (parameter.position as Position).x,
      (parameter.position as Position).y
    );
    p.fill('rgba(255,100,0,1)');
    p.circle(0,0,5);
    p.noFill();
    p.stroke('rgba(0,255,255,0.7)');
    p.strokeWeight(1);
    p.rect(
      0,0,
      (parameter.dimensions as Dimension).width,
      (parameter.dimensions as Dimension).height,
    );
    p.pop();
  }

  static render(
    parameter:InputParameterModel|OutputParameterModel,
    inspector:InspectorModel,
    isFirstParameter=false,
    shouldAddHorizontalDivider=false,
  ):void {
    RenderParameter.setParameterPosition(parameter, inspector, RenderParameter.rowCount);
    RenderParameter.setParameterDimensions(parameter, inspector);
    RenderParameter.drawOverPositionAndDimensions(parameter);
    const p = this.p;
    if (p === null) { throw(new Error('p is null in RenderParameter')); }
    p.push();
    p.translate(
      (inspector.boundary as Boundary).getLeft(),
      (inspector.boundary as Boundary).getTop()
    );
    p.pop();
    this.renderParameterRowInInspector(
        parameter,
        inspector,
        isFirstParameter,
        shouldAddHorizontalDivider,
    );
  }
}
export default RenderParameter;