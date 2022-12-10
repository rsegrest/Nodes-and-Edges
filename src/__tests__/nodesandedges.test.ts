import p5 from "p5";
import { setup } from "../setup";
import { draw } from "../draw";
import { createSketch } from "../p5-util/sketch";
describe("Nodes & Edges tests", () => {
  let p: p5;

  beforeEach(() => {
    const setup = (p: p5): void => {
      p.createCanvas(400, 400);
    };
    const draw = (p: p5): void => {
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
});
