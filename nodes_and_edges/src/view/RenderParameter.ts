import p5 from "p5";
import { ParameterFieldTypes } from "../model/abstract/ParameterFieldType";
import InputParameterModel from "../model/InputParameterModel";
import LayoutInspector from "../model/inspector/LayoutInspector";
import InspectorModel from "../model/inspector/InspectorModel";
import OutputParameterModel from "../model/OutputParameterModel";
import Boundary from "../model/positioning/Boundary";
import Dimension from "../model/positioning/Dimension";
import Position from "../model/positioning/Position";

class RenderParameter {

  private static p:p5|null = null;

  constructor(p:p5) {
    RenderParameter.p = p;
  }

  static drawColumnDivider(inspector:InspectorModel):void {
    // const p = this.p;
    // const inspectorPos:Position = inspector.getPosition() as Position;
    // if (p === null) { throw(new Error('p is null in RenderParameter')); }
    // p.push();
    // p.noStroke();
    // p.translate(
    //   inspectorPos.x+5,
    //   inspectorPos.y+InspectorLayout.Y_FIRST_ROW_OFFSET
    // );
    // // draw divider
    // p.stroke(72);
    // p.strokeWeight(1);
    // const xStartLine = InspectorLayout.PARAM_NAME_COLUMN_WIDTH-10;
    // const xEndLine = xStartLine;
    // const yStartLine = -15;
    // const yEndLine = (inspector.boundary as Boundary).getBottom();
    // p.line(
    //   xStartLine, yStartLine,
    //   xEndLine, yEndLine
    // );
    // p.noStroke();
    // p.pop();
  }

  static renderText(
    parameter:InputParameterModel|OutputParameterModel,
    inspector:InspectorModel,
  ):void {
    // const p = this.p;
    // const inspectorPos:Position = inspector.getPosition() as Position;
    // if (p === null) { throw(new Error('p is null in RenderParameter')); }
    // p.push();

    // p.translate(
    //   inspectorPos.x+5,
    //   inspectorPos.y+InspectorLayout.Y_FIRST_ROW_OFFSET+(
    //     this.rowCount*InspectorLayout.Y_EACH_ROW_OFFSET)
    // );
    // p.fill(0);
    // p.text(
    //   parameter.getName(),
    //   0,0
    // );

    // let secondColumnText = parameter.getValue();

    // if (typeof secondColumnText === 'number') {
    //   secondColumnText = secondColumnText.toFixed(3);
    // }

    // if (parameter.getUnits()) {
    //   secondColumnText += ` ${parameter.getUnits()}`;
    // }

    // if (parameter.getEditingField() === ParameterFieldTypes.VALUE) {
    //   p.fill('rgba(200,0,0,1)');
    // }
    // // display value with units
    // p.text(
    //   secondColumnText,
    //   InspectorLayout.PARAM_NAME_COLUMN_WIDTH,0
    // );

    // p.pop();
  }

  // will be inspectorHeadingRow
  // static addHorizontalDivider(inspector:InspectorModel, label: string|null=null):void {
    // const p = this.p;
    // const inspectorPos = inspector.getPosition();
    // if (p === null) { throw(new Error('p is null in RenderParameter')); }
    // if (inspectorPos === null) { throw(new Error('inspector position is null in RenderParameter')); }
    // p.push();
    // if (label === "Output Parameters") {
    //   p.fill('rgba(11,255,11,1)');
    // } else {
    //   p.fill('rgba(255,255,148,1)');
    // }
    // const yDivider = (
    //   inspector.boundary as Boundary).getTop()+(
    //     (this.rowCount)*InspectorLayout.Y_EACH_ROW_OFFSET) +30
    // p.translate(
    //   (
    //     (inspector.boundary as Boundary).getLeft()+2
    //   ),(
    //     (inspector.boundary as Boundary).getTop()
    //     +((this.rowCount)*InspectorLayout.Y_EACH_ROW_OFFSET)
    //     +30
    //   )
    // );
    // p.rect(
    //   0,0,
    //   (inspector.boundary as Boundary).getRight()-15,
    //   InspectorLayout.Y_EACH_ROW_OFFSET,
    // )
    // p.fill(0);
    // if (label !== null) {
    //   // const textWidth = 
    //   p.text(label,5,15);
    //   p.stroke(0);
    //   p.strokeWeight(0.5);
    //   p.line(5,18,(inspector.dimensions as Dimension).width*.9,18);
    // }
    // p.pop();
  // }

  // Can I salvage this method?
  static drawOverPositionAndDimensions(parameter:InputParameterModel|OutputParameterModel):void {
    const p = this.p;
    if (p === null) { throw(new Error('p is null in RenderParameter')); }
    p.push();
    p.translate(
      (parameter.position as Position).x,
      (parameter.position as Position).y
    );
    p.noFill();
    if (parameter.getIsRolledOver()) {
      p.stroke('rgba(255,255,0,1)');
      p.fill('rgba(255,255,0,0.2)');
    } else {
      p.stroke('rgba(0,255,255,0.7)');
    }
    p.strokeWeight(1);
    const shape = p.rect(
      0,0,
      (parameter.dimensions as Dimension).width,
      (parameter.dimensions as Dimension).height,
    );
    shape.mouseClicked = () => {
      parameter.clickAction();
    }
    shape.doubleClicked = () => {
      parameter.doubleClickAction(null);
    }
    p.pop();
  }

  // CHANGE TO RENDER inspectorTable, inspectorRow, inspectorCol
  static render(
    parameter:InputParameterModel|OutputParameterModel,
    inspector:InspectorModel,
    isFirstParameter=false,
    shouldAddHorizontalDivider=false,
  ):void {
    // console.log('rendering parameter: ', parameter.getName());
    
    // if (isFirstParameter) {
    //   this.addHorizontalDivider(inspector, "Input Parameters")
    //   RenderParameter.rowCount = 1;
    // }
    // if (shouldAddHorizontalDivider) {
    //   this.addHorizontalDivider(inspector, "Output Parameters");
    //   RenderParameter.rowCount += 1;
    // }
    // RenderParameter.setParameterPosition(parameter, inspector, RenderParameter.rowCount);
    // RenderParameter.setParameterDimensions(parameter, inspector);
    // RenderParameter.drawOverPositionAndDimensions(parameter);
    // this.renderText(
    //     parameter,
    //     inspector,
    // );
    // RenderParameter.rowCount += 1;
  }
}
export default RenderParameter;