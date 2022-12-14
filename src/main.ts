import p5 from "p5";
import { createSketch } from "./p5-util/sketch";
import {
  preload,
  setup,
  mouseDragged,
  mousePressed,
  mouseReleased,
} from "./setup";
import {
  draw,
  mouseClicked,
} from "./draw";
import ApplicationModel from "./model/ApplicationModel";

const sketch = createSketch({
  preload,
  setup,
  draw,
  mouseClicked,
  mouseDragged,
  mousePressed,
  mouseReleased,
});

new p5(sketch);
