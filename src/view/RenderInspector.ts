import p5 from 'p5';
import InspectorHeadingRow from '../model/inspector/InspectorHeadingRow';
import InspectorInfoColumn from '../model/inspector/InspectorInfoColumn';
import InspectorInfoRow from '../model/inspector/InspectorInfoRow';
import InspectorModel from '../model/inspector/InspectorModel';
import LayoutInspector from '../model/inspector/LayoutInspector';
import Dimension from '../model/positioning/Dimension';
import Position from '../model/positioning/Position';
// import InputParameterModel from '../model/InputParameterModel';
// import NodeModel from '../model/NodeModel';
// import OutputParameterModel from '../model/OutputParameterModel';
// import RenderParameter from './RenderParameter';

class RenderInspector {

  private static p:p5;

  constructor(p:p5) {
    RenderInspector.p = p;
  }

  static renderInfoRow(
    row:InspectorInfoRow
  ):void {
    const p = this.p;
    const thisRowsColumns = row.getColumns();
    if (p === null) { throw(new Error('p is null in RenderParameter')); }
    p.push();
    p.translate(
      (row.position as Position).x,
      (row.position as Position).y
    );
    p.noFill();
    if (row.getIsRolledOver()) {
      p.stroke('rgba(255,255,0,1)');
      p.fill('rgba(255,255,0,0.2)');
    } else {
      p.stroke('rgba(0,255,255,0.7)');
    }
    p.strokeWeight(1);
    p.rect(
      0,0,
      (row.dimensions as Dimension).width,
      (row.dimensions as Dimension).height,
    );
    p.fill(0);
    p.noStroke();
    p.text((thisRowsColumns[0] as InspectorInfoColumn).getContent(), 10, 20);
    p.text((thisRowsColumns[1] as InspectorInfoColumn).getContent(), LayoutInspector.PARAM_NAME_COLUMN_WIDTH, 20);
    p.pop();
  }

  static renderTable(ipm:InspectorModel):void {
    const p = RenderInspector.getP();
    const pos = ipm.getPosition();
    const table = ipm.getTable();
    const numRows = table?.getNumRows() as number;
    if (!pos) return;
    p.push();
    p.translate(pos.x, pos.y);
    for (let i = 0; i < numRows; i++) {
      const row = ipm.getTable()?.getRow(i);
      if (row instanceof InspectorInfoRow) { RenderInspector.renderInfoRow(row); }
      if (row instanceof InspectorHeadingRow) { RenderInspector.renderHeadingRow(row); }
    }
    p.pop();
  }
  static renderHeadingRow(row: InspectorHeadingRow):void {
    const p = this.p;
    if (p === null) { throw(new Error('p is null in RenderHeadingRow')); }
    p.push();
    p.translate(
      (row.position as Position).x,
      (row.position as Position).y
    );
    p.noFill();
    p.fill('rgba(200,255,200,1)');
    
    // p.strokeWeight(1);
    p.rect(
      0,0,
      (row.dimensions as Dimension).width,
      (row.dimensions as Dimension).height,
    );
    p.fill(0);
    p.text(
      row.getContent(),
      10,
      20,
    )
    p.pop();
  }
  static render(ipm:InspectorModel):void {
    
    if (ipm) {
      RenderInspector.renderBackground(ipm);
      RenderInspector.renderInspectorBorder(ipm);
      RenderInspector.renderTitleBar(ipm);
      RenderInspector.renderTable(ipm);
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
