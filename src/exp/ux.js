// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* Had to import ux* functions into global scope in index.html */
import { p } from '../setup';

// import {
//   uxRect,
//   uxCircle,
//   uxSquare,
//   uxTriangle,
//   uxEllipse,
// } from "../p5-util/p5.experience.js-master/p5.experience.js";

// export default class UX {
  // constructor() {
  //   console.log("UX constructor");
  // }
  export function createUxRect(
    x,y,w,h,
    tl=0, tr=0, br=0, bl=0
  ) {
    return p.uxRect(
      x,y,w,h, tl, tr, br, bl);
  }

  export function createUxSquare(x,y,s,corners) {
    return p.uxSquare(x,y,s,corners);
  }
  export function createUxTriangle(x1,y1,x2,y2,x3,y3) {
    return p.uxTriangle(x1,y1,x2,y2,x3,y3);
  }
  export function createUxCircle(x,y,d) {
    return p.uxCircle(x,y,d);
  }
  export function createUxEllipse(x,y,w,h) {
    return p.uxEllipse(x,y,w,h);
  }

  // UXElement

  // export function setUxShadow(uxElement, x, y, blur, color) {
  //   uxElement.setShadow(x, y, blur, color);
  // }

  // export function setUxFill(uxElement, color) {
  //   uxElement.setFill(color);
  // }

  // export function setUxNoFill(uxElement) {
  //   uxElement.noFill();
  // }

  // export function setUxStroke(uxElement, color) {
  //   uxElement.setStroke(color);
  // }

  // export function setUxNoStroke(uxElement) {
  //   uxElement.noStroke();
  // }

  // export function setUxStrokeWeight(uxElement, weight) {
  //   uxElement.strokeWeight(weight);
  // }
  // export function setUxShape(uxElement, shape) {
  //   uxElement.setShape(shape);
  // }
  // export function setUxEvent(uxElement, inputtype, callback) {
  //   uxElement.setEvent(inputtype, callback);
  // }
  // export function setUxRender(uxElement, event) {
  //   uxElement.setRender(event);
  // }


  

  // uxRectMode(mode)
  // uxEllipseMode(mode)

  // .uxShadow(XOffset, YOffset, blurIntensity, color));


// }

// module.exports = UX;

// export default UX;