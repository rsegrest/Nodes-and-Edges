import p5 from "p5";
import { createSketch } from "./p5-util/sketch";
import {
  preload,
  setup,
  mouseClicked,
  mouseDragged,
  mousePressed,
  mouseReleased,
  keyPressed,
  mouseMoved,
} from "./setup";
import {
  draw,
} from "./draw";

const sketch = createSketch({
  preload,
  setup,
  draw,
  mouseClicked,
  mouseDragged,
  mousePressed,
  mouseReleased,
  keyPressed,
  mouseMoved,
});

new p5(sketch);
