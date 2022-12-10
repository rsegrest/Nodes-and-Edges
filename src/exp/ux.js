// const {
//   uxRect,
//   uxSquare,
//   uxTriangle,
//   uxCircle,
//   uxEllipse,
//  } = require(
//   "../p5-util/p5.experience.js-master/p5.experience.js"
// );
// import {
//   uxRect,
//   uxSquare,
//   uxTriangle,
//   uxCircle,
//   uxEllipse,
//  } from (
//   "../p5-util/p5.experience.js-master/p5.experience.js"
// );

class UX {
  constructor() {
    console.log("UX constructor");
  }
  static createUxRect(
    x,y,w,h,
    tl=0, tr=0, br=0, bl=0
  ) {
    return uxRect(
      x,y,w,h, tl=0, tr=0, br=0, bl=0);
  }
  static createUxSquare(x,y,s,corners) {
    return uxSquare(x,y,s,corners);
  }
  static createUxTriangle(x1,y1,x2,y2,x3,y3) {
    return uxTriangle(x1,y1,x2,y2,x3,y3);
  }
  static createUxCircle(x,y,d) {
    return uxCircle(x,y,d);
  }
  static createUxEllipse(x,y,w,h) {
    return uxEllipse(x,y,w,h);
  }

  // UXElement

  static setUxShadow(uxElement, x, y, blur, color) {
    uxElement.setShadow(x, y, blur, color);
  }

  static setUxFill(uxElement, color) {
    uxElement.setFill(color);
  }

  static setUxNoFill(uxElement) {
    uxElement.noFill();
  }

  static setUxStroke(uxElement, color) {
    uxElement.setStroke(color);
  }

  static setUxNoStroke(uxElement) {
    uxElement.noStroke();
  }

  static setUxStrokeWeight(uxElement, weight) {
    uxElement.strokeWeight(weight);
  }
  static setUxShape(uxElement, shape) {
    uxElement.setShape(shape);
  }
  static setUxEvent(uxElement, inputtype, callback) {
    uxElement.setEvent(inputtype, callback);
  }
  static setUxRender(uxElement, event) {
    uxElement.setRender(event);
  }

  // uxRectMode(mode)
  // uxEllipseMode(mode)

  // .uxShadow(XOffset, YOffset, blurIntensity, color));


}

// export default UX;