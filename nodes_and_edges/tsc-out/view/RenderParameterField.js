class RenderParameterField {
    constructor(p) {
        RenderParameterField.p = p;
    }
    static getP() {
        return RenderParameterField.p;
    }
    static drawRolloverGuide(boundary, p) {
        p.push();
        p.noFill();
        p.stroke("rgb(0,255,255)");
        p.strokeWeight(1);
        if (boundary === null) {
            console.warn("boundary is null in RenderParameterField.drawRolloverGuide");
            return;
        }
        p.translate(boundary.getLeft(), boundary.getTop());
        p.rect(0, 0, boundary.getRight() - boundary.getLeft(), boundary.getBottom() - boundary.getTop());
        p.pop();
    }
    static render(pfm) {
        const p = RenderParameterField.getP();
        const boundary = pfm === null || pfm === void 0 ? void 0 : pfm.getBoundary();
        p.push();
        const pos = pfm === null || pfm === void 0 ? void 0 : pfm.getPosition();
        const dim = pfm === null || pfm === void 0 ? void 0 : pfm.getPosition();
        if ((pos === null)
            || (dim === null)
            || (typeof pos === 'undefined')
            || (typeof dim === 'undefined')) {
            // was throw
            console.warn('param field position data is null');
            return;
        }
        if (pfm.getIsEditing()) {
            p.fill('rgba(255,255,128,1)');
        }
        else {
            p.fill('rgba(255,255,255,1)');
        }
        p.stroke(72);
        p.strokeWeight(2);
        p.translate(boundary.getLeft(), boundary.getTop());
        p.rect(0, 0, boundary.getRight() - boundary.getLeft(), boundary.getBottom() - boundary.getTop());
        p.noStroke();
        p.fill(255);
        p.text(pfm.getContent(), 5, 5, // start
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
export default RenderParameterField;
