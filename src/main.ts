import p5 from "p5";
import { createSketch } from "./p5-util/sketch";
import {
  preload,
  setup,
  mouseDragged,
  mousePressed,
  mouseReleased,
  keyPressed,
  // doubleClicked,
} from "./setup";
import {
  draw,
  mouseClicked,
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
  // doubleClicked,
});

new p5(sketch);
