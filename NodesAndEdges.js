import p5 from "p5";
import { createSketch } from './nodes_and_edges/tsc-out/p5-util/sketch'; //"./nodes_and_edges/src/tsc-out/p5-util/sketch";
import { preload, setup, mouseClicked, doubleClicked, mouseDragged, mousePressed, mouseReleased, keyPressed, mouseMoved, } from "./nodes_and_edges/tsc-out/setup";
import { draw } from "./nodes_and_edges/tsc-out/draw";
const sketch = createSketch({
    preload,
    setup,
    draw,
    mouseClicked,
    doubleClicked,
    mouseDragged,
    mousePressed,
    mouseReleased,
    keyPressed,
    mouseMoved,
});
const NodesAndEdges = new p5(sketch);
export default NodesAndEdges;
