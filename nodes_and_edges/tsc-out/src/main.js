import p5 from "p5";
import { createSketch } from "./p5-util/sketch";
import { preload, setup, } from "./setup";
import { draw, mouseClicked, } from "./draw";
const sketch = createSketch({
    preload,
    setup,
    draw,
    mouseClicked,
});
new p5(sketch);
