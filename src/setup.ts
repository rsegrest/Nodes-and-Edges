import type p5 from "p5";
// const exp = require('p5-util/p5.experience.js-master/p5.experience.js')
import ChartManager from "./controller/ChartManager";
import CreationManager from "./controller/CreationManager";
import ApplicationModel from "./model/ApplicationModel";
import RenderApplication from "./view/RenderApplication";
// import UX from "./exp/ux.js";
// import Layout from "./model/Layout";
import RenderEdge from "./view/RenderEdge";
import RenderGuides from "./view/RenderGuide";
import RenderInspector from "./view/RenderInspector";
import RenderNode from "./view/RenderNode";
import RenderParameter from "./view/RenderParameter";
import RenderTool from "./view/RenderTool";
import RenderToolbox from "./view/RenderToolbox";
export let applicationModel: ApplicationModel|null = null;
export let chartManager: ChartManager | null;
export let creationManager: CreationManager | null;
export let fontRegular: p5.Font;
export const nodeTypes = {
  BASIC: "BASIC",
  ELEMENT: "ELEMENT",
};

export const preload = (p: p5): void => {
  applicationModel = ApplicationModel.createInstance(p);
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
const initializeRenderers = (p:p5): void => {
  new RenderNode(p);
  new RenderEdge(p);
  new RenderGuides(p);
  new RenderTool(p);
  new RenderToolbox(p);
  new RenderInspector(p);
  new RenderParameter(p);
  new RenderApplication(p);
}
export const mouseDragged = (p: p5): void => {
  ChartManager.getInstance().mouseDragged(p);
}
export const mousePressed = (p: p5): void => {
  ChartManager.getInstance().mousePressed(p);
}
export const mouseReleased = (p: p5): void => {
  ChartManager.getInstance().mouseReleased(p);
}
/** This is a setup function. */
export const setup = (p: p5): void => {
  chartManager = ChartManager.createInstance(p);
  creationManager = CreationManager.createInstance();
  p.createCanvas(p.windowWidth, p.windowHeight);
  p.frameRate(30);
  p.background(248);
  // Classes with static methods that need access to p5.js
  initializeRenderers(p);

  // const uxRect = UX.createUxRect(10,10,100,100);
  // UX.setUxFill(uxRect, 'rgb(255,0,0)');
  // UX.setUxEvent(uxRect, () => {
  //   ('CLICKED!')
  // });
  
  // const gui = createGui("My awesome GUI");
};
