import p5 from "p5";
import { createSketch } from "../p5-util/sketch";
describe("Nodes & Edges tests", () => {
    let p;
    beforeEach(() => {
        const setup = (p) => {
            p.createCanvas(400, 400);
        };
        const draw = (p) => {
            p.createCanvas(800, 600);
            p.background(10);
        };
        const sketch = createSketch({
            setup,
            draw,
        });
        expect(sketch).not.toBeNull();
        p = new p5(sketch);
    });
    it('should contain one test', () => {
        expect(true).toBe(true);
    });
});
