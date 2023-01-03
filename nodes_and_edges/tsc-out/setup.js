import KeyboardManager from "./controller/KeyboardManager";
import MouseManager from "./controller/MouseManager";
import ApplicationModel from "./model/ApplicationModel";
import P5Reference from "./view/P5Reference";
import RenderApplication from "./view/RenderApplication";
import RenderEdge from "./view/RenderEdge";
import RenderGuides from "./view/RenderGuide";
import RenderInspector from "./view/RenderInspector";
import RenderNode from "./view/RenderNode";
import RenderParameter from "./view/RenderParameter";
import RenderParameterField from "./view/RenderParameterField";
import RenderTool from "./view/RenderTool";
import RenderToolbox from "./view/RenderToolbox";
// import InteractionManager from "./controller/InteractionManager";
export let applicationModel = null;
export let creationManager;
export let fontRegular;
export const nodeTypes = {
    BASIC: "BASIC",
    ELEMENT: "ELEMENT",
};
export const preload = (p) => {
    applicationModel = ApplicationModel.createInstance();
    fontRegular = p.loadFont("./font/Regular.otf");
    P5Reference.createInstance(p);
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
const initializeRenderers = (p) => {
    new RenderNode(p);
    new RenderEdge(p);
    new RenderGuides(p);
    new RenderTool(p);
    new RenderToolbox(p);
    new RenderInspector(p);
    new RenderParameter(p);
    new RenderApplication(p);
    new RenderParameterField(p);
};
export const mouseMoved = (p) => {
    MouseManager.mouseMoved(p.mouseX, p.mouseY, applicationModel);
};
export const mouseClicked = (p) => {
    MouseManager.mouseClicked(p.mouseX, p.mouseY, applicationModel);
};
export const mouseDragged = (p) => {
    MouseManager.mouseDragged(p.mouseX, p.mouseY, applicationModel);
};
export const mousePressed = (p) => {
    MouseManager.mousePressed(p.mouseX, p.mouseY, applicationModel);
};
export const mouseReleased = (p) => {
    MouseManager.mouseReleased(p.mouseX, p.mouseY, applicationModel);
};
export const keyPressed = (p) => {
    KeyboardManager.handleKeyPress(p.keyCode, p.key);
};
export const doubleClicked = (p) => {
    MouseManager.doubleClicked(p.mouseX, p.mouseY, applicationModel);
};
/** This is a setup function. */
export const setup = (p) => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.frameRate(30);
    p.background(248);
    // Classes with static methods that need access to p5.js
    initializeRenderers(p);
};
