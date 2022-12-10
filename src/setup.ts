import type p5 from "p5";
// const exp = require('p5-util/p5.experience.js-master/p5.experience.js')
import ChartManager from "./controller/ChartManager";
import CreationManager from "./controller/CreationManager";
// import exp from './p5-util/p5.experience.js-master/p5.experience.js';
// import * as UX from "./exp/ux.js";
// import Layout from "./model/Layout";
import RenderEdge from "./view/RenderEdge";
import RenderGuides from "./view/RenderGuide";
import RenderNode from "./view/RenderNode";
export let chartManager: ChartManager | null;
export let creationManager: CreationManager | null;
export let fontRegular: p5.Font;
export let p:p5;
export const nodeTypes = {
  BASIC: "BASIC",
  ELEMENT: "ELEMENT",
};

export const preload = (p: p5): void => {
  fontRegular = p.loadFont("./font/Regular.otf");
};

// FOR 3D orthographic
// function setOrthographicProjection(p: p5):void {
//   const width = p.width;
//   const height = p.height;
//   p.ortho(
//     -width/2, width/2,
//     height/2, -height/2,
//     0, 500);
// }

/** This is a setup function. */
export const setup = (_p: p5): void => {
  p = _p;
  // exp(p);
  p.createCanvas(800, 600);
  p.frameRate(1);
  p.background(248);
  // Classes with static methods that need access to p5.js
  new RenderNode(p);
  new RenderEdge(p);
  new RenderGuides(p);
  chartManager = ChartManager.createInstance(p);
  creationManager = CreationManager.createInstance();

  console.log('p');
  console.log(p);
  
  // const uxr = p.uxRect(10,10,100,100);
  // console.log(`uxRect: ${uxRect}`);
  // UX.setUxFill(uxRect, 'rgb(255,0,0)');
  // UX.setUxEvent(uxRect, () => {
  //   console.log('CLICKED!')
  // });
  
  // const gui = createGui("My awesome GUI");
};
