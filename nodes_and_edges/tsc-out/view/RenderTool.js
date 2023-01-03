class RenderTool {
    constructor(p) {
        RenderTool.p = p;
    }
    static getP() {
        return RenderTool.p;
    }
    static drawRolloverGuide(boundary, p) {
        p.push();
        p.noFill();
        p.stroke("rgb(0,255,255)");
        p.strokeWeight(1);
        if (boundary === null) {
            console.warn("boundary is null in RenderNode.drawRolloverGuide");
            return;
        }
        p.translate(boundary.getLeft(), boundary.getTop());
        p.rect(0, 0, boundary.getRight() - boundary.getLeft(), boundary.getBottom() - boundary.getTop());
        p.pop();
    }
    static render(tool) {
        const p = RenderTool.getP();
        const boundary = tool === null || tool === void 0 ? void 0 : tool.getBoundary();
        p.push();
        const pos = tool === null || tool === void 0 ? void 0 : tool.getPosition();
        const dim = tool === null || tool === void 0 ? void 0 : tool.getPosition();
        if ((pos === null)
            || (dim === null)
            || (typeof pos === 'undefined')
            || (typeof dim === 'undefined')) {
            console.warn('tool position data is null');
            return;
        }
        if ((tool === null || tool === void 0 ? void 0 : tool.type) === 'DynamicTool') {
            p.fill('rgba(255,255,0,1)');
        }
        else if ((tool === null || tool === void 0 ? void 0 : tool.type) === 'Tool') {
            p.fill('rgba(100,100,255,1)');
        }
        else {
            p.fill('rgba(128,0,255,1)');
        }
        p.stroke(72);
        p.strokeWeight(2);
        p.translate(boundary.getLeft(), boundary.getTop());
        p.rect(0, 0, boundary.getRight() - boundary.getLeft(), boundary.getBottom() - boundary.getTop());
        p.noStroke();
        p.fill(255);
        p.text(tool.getName(), 5, 5, // start
        // right and bottom bounds
        boundary.getRight() - boundary.getLeft(), boundary.getBottom() - boundary.getTop());
        p.pop();
        if (boundary === null) {
            console.warn('boundary is null in RenderTool.render');
            return;
        }
        this.drawRolloverGuide(boundary, p);
    }
}
export default RenderTool;
