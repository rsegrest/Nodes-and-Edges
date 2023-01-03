export class RenderNode {
    constructor(p) {
        this.isSelected = false;
        RenderNode.p = p;
    }
    static renderPlug(plug, p) {
        const pos = plug.getPosition();
        const x = pos.x;
        const y = pos.y;
        // const p = RenderNode.p;
        const mouseIsOver = plug.checkMouseOver(p.mouseX, p.mouseY);
        let plugStroke = "rgba(200,200,200,0.7)";
        let plugFill = "rgba(255,255,200,0.7)";
        if (mouseIsOver) {
            plugStroke = "rgba(255,255,72,1)";
            plugFill = "rgba(0,0,0,0.8)";
        }
        p.push();
        p.stroke(plugStroke);
        p.strokeWeight(2);
        p.fill(plugFill);
        p.circle(x, y, 8);
        p.pop();
    }
    static showNodes(node, p) {
        node.getPlugs().forEach((plug) => {
            this.renderPlug(plug, p);
        });
    }
    static render(node, p) {
        console.log(`Rendering node : ${node.toString()}`);
        // test variables
        const TEST_ROLLOVER_GUIDE = true;
        const boundary = node.getBoundary();
        // END test variables
        const width = node.dimensions.width;
        const height = node.dimensions.height;
        const x = node.position.x;
        const y = node.position.y;
        const label = node.getLabel();
        let fillColor = "rgba(228,200,200,1)";
        if (node.getIsSelected()) {
            fillColor = "rgba(255,255,200,1)";
        }
        p.push();
        p.translate(x, y);
        p.noStroke();
        p.fill("rgba(0,0,0,0.5)");
        p.rect(0, 5, width, height);
        p.fill(fillColor);
        p.stroke(128);
        p.strokeWeight(1);
        p.rect(3, 0, width, height);
        p.fill(0);
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.text(label, 6, 3, width - 6, height - 6);
        p.pop();
        const showNodes = node.checkMouseOver(p.mouseX, p.mouseY);
        if (showNodes) {
            this.showNodes(node, p);
        }
        if (TEST_ROLLOVER_GUIDE) {
            RenderNode.drawRolloverGuide(boundary, p);
        }
    }
    static drawRolloverGuide(boundary, p) {
        p.push();
        p.noFill();
        p.stroke("rgb(0,255,255)");
        p.strokeWeight(1);
        p.translate(boundary.left, boundary.top);
        p.rect(0, 0, boundary.right - boundary.left, boundary.bottom - boundary.top);
        p.pop();
    }
}
export default RenderNode;
