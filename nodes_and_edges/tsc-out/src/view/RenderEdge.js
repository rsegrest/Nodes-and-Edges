import Position from "../model/Position";
class RenderEdge {
    constructor(p) {
        RenderEdge.p = p;
    }
    static plotLinesBetweenNodes(node1, node2) {
        const start_x = node1.position.x + node1.dimensions.width / 2;
        const start_y = node1.position.y + node1.dimensions.height / 2;
        const end_x = node2.position.x + node2.dimensions.width / 2;
        const end_y = node2.position.y + node2.dimensions.height / 2;
        const mid_1x = start_x + (end_x - start_x) / 2;
        const mid_1y = start_y;
        const mid_2x = mid_1x;
        const mid_2y = end_y;
        const mid_1 = new Position(mid_1x, mid_1y);
        const mid_2 = new Position(mid_2x, mid_2y);
        return [
            new Position(start_x, start_y),
            mid_1,
            mid_2,
            new Position(end_x, end_y),
        ];
    }
    // currently, up to three lines are drawn, double L shape
    // TODO: Add label to edge
    static renderLines(positions, strokeColor = "rgb(200,0,0)") {
        const p = RenderEdge.p;
        p.push();
        p.noFill();
        p.strokeWeight(3);
        p.stroke(strokeColor);
        for (let i = 1; i < positions.length; i += 1) {
            const start = positions[i - 1];
            const end = positions[i];
            p.line(start.x, start.y, end.x, end.y);
        }
        p.pop();
    }
    static render(edge) {
        const start = edge.getSourceNode();
        const end = edge.getTargetNode();
        const positions = this.plotLinesBetweenNodes(start, end);
        this.renderLines(positions);
    }
}
export default RenderEdge;
