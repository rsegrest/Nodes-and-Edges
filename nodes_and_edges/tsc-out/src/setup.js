import ChartManager from "./controller/ChartManager";
import CreationManager from "./controller/CreationManager";
import RenderEdge from "./view/RenderEdge";
import RenderGuides from "./view/RenderGuide";
import RenderNode from "./view/RenderNode";
// import * as p5gui from "./p5.gui";
export let chartManager;
export let creationManager;
export let fontRegular;
export const nodeTypes = {
    BASIC: "BASIC",
    ELEMENT: "ELEMENT",
};
export const preload = (p) => {
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
export const setup = (p) => {
    p.createCanvas(800, 600);
    p.background(248);
    // Classes with static methods that need access to p5.js
    new RenderNode(p);
    new RenderEdge(p);
    new RenderGuides(p);
    chartManager = ChartManager.createInstance(p);
    creationManager = CreationManager.createInstance();
    // const gui = createGui("My awesome GUI");
};
