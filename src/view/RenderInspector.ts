import p5 from 'p5';
import InputParameterModel from '../model/InputParameterModel';
import InspectorModel from '../model/InspectorModel';
import NodeModel from '../model/NodeModel';
import OutputParameterModel from '../model/OutputParameterModel';
import RenderParameter from './RenderParameter';

class RenderInspector {

  private static p:p5;

  constructor(p:p5) {
    RenderInspector.p = p;
  }

  // TEST

  static render(ipm:InspectorModel, node:NodeModel|null):void {
    let inputParameterList:InputParameterModel[] = [];
    let outputParameterList:OutputParameterModel[] = [];
    if (node) {
      inputParameterList = node.getInputParameterList();
      outputParameterList = node.getOutputParameterList();
    }
    if (ipm) {
      RenderInspector.renderBackground(ipm);
      RenderInspector.renderInspectorBorder(ipm);
      RenderInspector.renderTitleBar(ipm);
      const inputParamLength = inputParameterList.length;
      for (let i = 0; i < inputParamLength; i += 1) {
        RenderParameter.render(
          inputParameterList[i] as InputParameterModel,
          ipm,
          (i === 0)
        );
      }

      const outputParamLength = outputParameterList.length;
      for (let i = 0; i < outputParamLength; i += 1) {
        RenderParameter.render(
          outputParameterList[i] as OutputParameterModel,
          ipm,
          false,
          (i === 0)
        );
      }
    } else {
      console.warn('InspectorModel is null');
    }
  }
  // calculate column position
  // set row height
  static renderTitle(ipm: InspectorModel):void {
    const p = RenderInspector.getP();
    const pos = ipm.getPosition();
    if (!pos) return;
    // title
    p.push()
    p.fill(255);
    p.noStroke();
    p.text("Object Inspector", pos.x+10, pos.y+20);
    p.push()
  }
  static renderTitleBar(ipm: InspectorModel):void {
    const p = RenderInspector.getP();
    const pos = ipm.getPosition();
    const dim = ipm.getDimensions();
    if (!pos || !dim) return;
    p.push();
    p.fill('rgba(32,32,64,0.8)');
    p.noStroke();
    p.rect(pos.x, pos.y, dim.width, 30);
    p.pop();


    RenderInspector.renderTitle(ipm);
  }
  static renderBackground(ipm: InspectorModel):void {
    const p = RenderInspector.getP();
    if (ipm) {
      const pos = ipm.getPosition();
      const dim = ipm.getDimensions();
      if (!pos || !dim) return;
      // background
      p.push();
      p.fill('rgba(255,255,255,0.9)')
      p.noStroke();
      p.rect(pos.x, pos.y+30, dim.width, dim.height-30);
      p.pop();
    } else {
      console.warn('InspectorModel is null')
    }
  }
  static renderInspectorBorder(ipm: InspectorModel):void {
    const p = RenderInspector.getP();
    const pos = ipm.getPosition();
    const dim = ipm.getDimensions();
    if (!pos || !dim) return;
    // border
    p.push();
    p.noFill();
    p.stroke('rgba(32,32,64,0.8)');
    p.strokeWeight(3);
    p.rect(pos.x, pos.y, dim.width, dim.height);
    p.pop();
  }
  static getP():p5 {
    return RenderInspector.p;
  }
}
export default RenderInspector;