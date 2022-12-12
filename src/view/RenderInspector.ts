import p5 from 'p5';
import InspectorPanelModel from '../model/InspectorPanelModel';

class RenderInspector {

  private static p:p5;

  constructor(p:p5) {
    RenderInspector.p = p;
  }

  // TEST

  static render(ipm:InspectorPanelModel):void {
    const p = RenderInspector.getP();
    // const pos = ipm.getPosition();
    // const dim = ipm.getDimensions();

    RenderInspector.renderBackground(ipm);
    RenderInspector.renderInspectorBorder(ipm);
    RenderInspector.renderTitleBar(ipm);
    p.pop();
  }
  // calculate column position
  // set row height
  static renderTitle(ipm: InspectorPanelModel):void {
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
  static renderTitleBar(ipm: InspectorPanelModel):void {
    const p = RenderInspector.getP();
    const pos = ipm.getPosition();
    const dim = ipm.getDimensions();
    if (!pos || !dim) return;
    p.push();
    p.fill('rgba(32,32,64,0.8)');
    p.noStroke();
    p.rect(pos.x, pos.y, dim.width, 30);
    // p.fill(255);
    // p.text("Inspector", pos.x+10, pos.y+20);
    p.pop();


    RenderInspector.renderTitle(ipm);
  }
  static renderBackground(ipm: InspectorPanelModel):void {
    const p = RenderInspector.getP();
    const pos = ipm.getPosition();
    const dim = ipm.getDimensions();
    if (!pos || !dim) return;
    // background
    p.push();
    p.fill('rgba(255,255,255,0.2)')
    p.noStroke();
    p.rect(pos.x, pos.y+30, dim.width, dim.height-30);
    p.pop();
  }
  static renderInspectorBorder(ipm: InspectorPanelModel):void {
    const p = RenderInspector.getP();
    const pos = ipm.getPosition();
    const dim = ipm.getDimensions();
    if (!pos || !dim) return;
    // border
    p.noFill();
    p.stroke('rgba(32,32,64,0.8)');
    p.strokeWeight(3);
    p.rect(pos.x, pos.y, dim.width, dim.height);
  }
  static getP():p5 {
    return RenderInspector.p;
  }
}
export default RenderInspector;
// import p5 from 'p5';
// import Position from '../model/positioning/Position';
// import ToolboxModel from '../model/ToolboxModel';
// import RenderTool from './RenderTool';

// class RenderToolbox {
//   private static p: p5;
//   // private static toolLocations:Position[];

//   constructor(
//     p:p5
//   ) {
//     RenderToolbox.p = p;
//   }
//   public static getP(): p5 {
//     return RenderToolbox.p;
//   }
//   static renderTitle(tbm: ToolboxModel):void {
//     const p = RenderToolbox.getP();
//     const pos = tbm.getPosition();
//     if (!pos) return;
//     // title
//     p.push()
//     p.fill(255);
//     p.noStroke();
//     p.text("TOOLBOX", pos.x+10, pos.y+20);
//     p.push()
//   }

//   static renderTitleBar(tbm: ToolboxModel):void {
//     const p = RenderToolbox.getP();
//     const pos = tbm.getPosition();
//     const dim = tbm.getDimensions();
//     if (!pos || !dim) return;
//     p.push();
//     p.fill('rgba(32,32,64,0.8)');
//     p.noStroke();
//     p.rect(pos.x, pos.y, dim.width, 30);
//     p.fill(255);
//     p.text("TOOLBOX", pos.x+10, pos.y+20);
//     p.pop();

//     RenderToolbox.renderTitle(tbm);
//   }
//   static calcNumToolGridColumns(
//     // tbm: ToolboxModel
//   ):number {
//     return 2;
//   }
//   static calcNumToolGridRows(
//     // tbm: ToolboxModel
//   ):number {
//     return 6;
//   }
//   static ROW_SPACING = 60;
//   static findFirstRowOffset(tbm: ToolboxModel):number {
//     const pos = tbm.getPosition();
//     if (!pos) return 0;
//     const FIRST_ROW_OFFSET_Y = 70 + pos.y;
//     return FIRST_ROW_OFFSET_Y;
//   }
//   // should this be in the model?
//   static findHorizontalCenterLine(
//     tbm: ToolboxModel
//   ):number {
//     const pos = tbm.getPosition();
//     if (!pos) return 0;
//     return pos.x+95;
//   }

//   // should this be in the model?
//   static findRowCenterLine(tbm:ToolboxModel, row:number):number {
//     return RenderToolbox.findFirstRowOffset(tbm)+(row*RenderToolbox.ROW_SPACING);
//   }

//   // static buildLocationSet(tbm: ToolboxModel):Position[]|null {
//   //   const p = RenderToolbox.getP();
//   //   const pos = tbm.getPosition();
//   //   if (!pos) return null;
//   //   // const dim = tbm.getDimensions();
//   //   const toolList = tbm.getToolList();

//   //   const toolLocations:Position[] = [];
//   //   const CENTER_OFFSET_X = 45;

//   //   // TODO: Use row and column count to calculate position
//   //   // const rows = RenderToolbox.calcNumToolGridRows();
//   //   // const columns = RenderToolbox.calcNumToolGridColumns();
    
//   //   // find center line
//   //   // find row center lines
//   //   toolList.forEach((tool,i) => {
//   //     let thisX = this.findHorizontalCenterLine(tbm)-CENTER_OFFSET_X;
//   //     if (i%2 !== 0) {
//   //       thisX += (CENTER_OFFSET_X*2);
//   //     }
//   //     toolLocations.push(
//   //       new Position(
//   //         // if two rows, center plus or minus horizontal offset
//   //         thisX,
//   //         pos.y+(
//   //           RenderToolbox.findFirstRowOffset(tbm)
//   //         )+(Math.floor(i/2)*60)
//   //       )
//   //     );
//   //   })
//   //   return toolLocations;
//   // }

// }