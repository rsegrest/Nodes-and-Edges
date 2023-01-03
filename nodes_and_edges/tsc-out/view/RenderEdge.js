import PlugModel from "../model/PlugModel";
import Dimension from "../model/positioning/Dimension";
import Position from "../model/positioning/Position";
class RenderEdge {
    constructor(p) {
        RenderEdge.p = p;
    }
    static plotConnection(source, target) {
        let sourceDim = source.dimensions;
        if (source instanceof PlugModel) {
            sourceDim = new Dimension(0, 0);
        }
        let targetDim = target.dimensions;
        if (target instanceof PlugModel) {
            targetDim = new Dimension(0, 0);
        }
        const start_x = source.position.x + sourceDim.width / 2;
        const start_y = source.position.y + sourceDim.height / 2;
        const end_x = target.position.x + targetDim.width / 2;
        const end_y = target.position.y + targetDim.height / 2;
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
        const sourcePlug = edge.getSourcePlug();
        const targetPlug = edge.getTargetPlug();
        let positions = [];
        if (sourcePlug === null || targetPlug === null) {
            const start = edge.getSourceNode();
            const end = edge.getTargetNode();
            positions = this.plotConnection(start, end);
        }
        else {
            const start = edge.getSourcePlug();
            const end = edge.getTargetPlug();
            positions = this.plotConnection(start, end);
        }
        this.renderLines(positions);
    }
}
export default RenderEdge;
