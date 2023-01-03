import InspectorHeadingRow from '../model/inspector/InspectorHeadingRow';
import InspectorInfoRow from '../model/inspector/InspectorInfoRow';
import LayoutInspector from '../model/inspector/LayoutInspector';
// import InputParameterModel from '../model/InputParameterModel';
// import NodeModel from '../model/NodeModel';
// import OutputParameterModel from '../model/OutputParameterModel';
// import RenderParameter from './RenderParameter';
class RenderInspector {
    constructor(p) {
        RenderInspector.p = p;
    }
    static renderInfoRow(row) {
        const p = this.p;
        const thisRowsColumns = row.getColumns();
        if (p === null) {
            throw (new Error('p is null in RenderParameter'));
        }
        p.push();
        p.translate(row.position.x, row.position.y);
        p.noFill();
        if (row.getIsRolledOver()) {
            p.stroke('rgba(255,255,0,1)');
            p.fill('rgba(255,255,0,0.2)');
        }
        else {
            p.stroke('rgba(0,255,255,0.7)');
        }
        p.strokeWeight(1);
        p.rect(0, 0, row.dimensions.width, row.dimensions.height);
        p.fill(0);
        p.noStroke();
        p.text(thisRowsColumns[0].getContent(), 10, 20);
        p.text(thisRowsColumns[1].getContent(), LayoutInspector.PARAM_NAME_COLUMN_WIDTH, 20);
        p.pop();
    }
    static renderTable(ipm) {
        var _a;
        const p = RenderInspector.getP();
        const pos = ipm.getPosition();
        const table = ipm.getTable();
        const numRows = table === null || table === void 0 ? void 0 : table.getNumRows();
        if (!pos)
            return;
        p.push();
        p.translate(pos.x, pos.y);
        p.pop();
        for (let i = 0; i < numRows; i++) {
            const row = (_a = ipm.getTable()) === null || _a === void 0 ? void 0 : _a.getRow(i);
            if (row instanceof InspectorInfoRow) {
                RenderInspector.renderInfoRow(row);
            }
            if (row instanceof InspectorHeadingRow) {
                RenderInspector.renderHeadingRow(row);
            }
        }
    }
    static renderHeadingRow(row) {
        const p = this.p;
        if (p === null) {
            throw (new Error('p is null in RenderHeadingRow'));
        }
        p.push();
        p.translate(row.position.x, row.position.y);
        p.noFill();
        p.fill('rgba(200,255,200,1)');
        // p.strokeWeight(1);
        p.rect(0, 0, row.dimensions.width, row.dimensions.height);
        p.fill(0);
        p.text(row.getContent(), 10, 20);
        p.pop();
    }
    static render(ipm) {
        if (ipm) {
            RenderInspector.renderBackground(ipm);
            RenderInspector.renderInspectorBorder(ipm);
            RenderInspector.renderTitleBar(ipm);
            RenderInspector.renderTable(ipm);
        }
    }
    // calculate column position
    // set row height
    static renderTitle(ipm) {
        const p = RenderInspector.getP();
        const pos = ipm.getPosition();
        if (!pos)
            return;
        // title
        p.push();
        p.fill(255);
        p.noStroke();
        p.text("Object Inspector", pos.x + 10, pos.y + 20);
        p.push();
    }
    static renderTitleBar(ipm) {
        const p = RenderInspector.getP();
        const pos = ipm.getPosition();
        const dim = ipm.getDimensions();
        if (!pos || !dim)
            return;
        p.push();
        p.fill('rgba(32,32,64,0.8)');
        p.noStroke();
        p.rect(pos.x, pos.y, dim.width, 30);
        p.pop();
        RenderInspector.renderTitle(ipm);
    }
    static renderBackground(ipm) {
        const p = RenderInspector.getP();
        if (ipm) {
            const pos = ipm.getPosition();
            const dim = ipm.getDimensions();
            if (!pos || !dim)
                return;
            // background
            p.push();
            p.fill('rgba(255,255,255,0.9)');
            p.noStroke();
            p.rect(pos.x, pos.y + 30, dim.width, dim.height - 30);
            p.pop();
        }
        else {
            console.warn('InspectorModel is null');
        }
    }
    static renderInspectorBorder(ipm) {
        const p = RenderInspector.getP();
        const pos = ipm.getPosition();
        const dim = ipm.getDimensions();
        if (!pos || !dim)
            return;
        // border
        p.push();
        p.noFill();
        p.stroke('rgba(32,32,64,0.8)');
        p.strokeWeight(3);
        p.rect(pos.x, pos.y, dim.width, dim.height);
        p.pop();
    }
    static getP() {
        return RenderInspector.p;
    }
}
export default RenderInspector;
