export class RenderNode3D {
    constructor(p) {
        RenderNode3D.p = p;
    }
    static render(
    // node:NodeModel
    ) {
        const p = RenderNode3D.p;
        console.log('RenderNode3D.render() called');
        p.box(150, 75, 10);
    }
}
export default RenderNode3D;
