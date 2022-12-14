import p5 from 'p5';
import Position from '../model/positioning/Position';
import ToolboxModel from '../model/ToolboxModel';
import RenderTool from './RenderTool';
class RenderToolbox {
  private static p: p5;
  private static toolLocations:Position[];

  constructor(
    p:p5
  ) {
    RenderToolbox.p = p;
  }
  public static getP(): p5 {
    return RenderToolbox.p;
  }
  static renderTitle(tbm: ToolboxModel):void {
    const p = RenderToolbox.getP();
    const pos = tbm.getPosition();
    if (!pos) return;
    // title
    p.push()
    p.fill(255);
    p.noStroke();
    p.text("TOOLBOX", pos.x+10, pos.y+20);
    p.push()
  }

  static renderTitleBar(tbm: ToolboxModel):void {
    const p = RenderToolbox.getP();
    const pos = tbm.getPosition();
    const dim = tbm.getDimensions();
    if (!pos || !dim) return;
    p.push();
    p.fill('rgba(32,32,64,0.8)');
    p.noStroke();
    p.rect(pos.x, pos.y, dim.width, 30);
    p.fill(255);
    p.text("TOOLBOX", pos.x+10, pos.y+20);
    p.pop();

    RenderToolbox.renderTitle(tbm);
  }

  static renderTools(tbm: ToolboxModel):void {
    const toolList = tbm.getToolList();
    toolList.forEach((tool) => {
      RenderTool.render(tool);
    })
  }
  // TEST

  static render(tbm: ToolboxModel):void {
    if (tbm) {
      RenderToolbox.renderBackground(tbm);
      RenderToolbox.renderTBBorder(tbm);
      RenderToolbox.renderTitleBar(tbm);
      RenderToolbox.renderTools(tbm);
    } else {
      console.warn('RenderToolbox.render: tbm is null')
    }
  }
  static renderBackground(tbm: ToolboxModel):void {
    const p = RenderToolbox.getP();
    const pos = tbm.getPosition();
    const dim = tbm.getDimensions();
    if (!pos || !dim) return;
    // background
    p.push();
    p.fill('rgba(255,255,255,0.85)')
    p.noStroke();
    p.rect(pos.x, pos.y+30, dim.width, dim.height-30);
    p.pop();
  }
  static renderTBBorder(tbm: ToolboxModel):void {
    const p = RenderToolbox.getP();
    const pos = tbm.getPosition();
    const dim = tbm.getDimensions();
    if (!pos || !dim) return;
    // border
    p.noFill();
    p.stroke('rgba(32,32,64,0.8)');
    p.strokeWeight(3);
    p.rect(pos.x, pos.y, dim.width, dim.height);
  }
}
export default RenderToolbox;