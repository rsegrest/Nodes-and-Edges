import type p5 from "p5";
import CreationManager from "./controller/CreationManager";
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

export let applicationModel: ApplicationModel | null = null;
export let creationManager: CreationManager | null;
export let fontRegular: p5.Font;

export const nodeTypes = {
  BASIC: "BASIC",
  ELEMENT: "ELEMENT",
};

export const preload = (p: p5): void => {
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
const initializeRenderers = (p: p5): void => {
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

export const mouseMoved = (p: p5): void => {
  MouseManager.mouseMoved(p.mouseX, p.mouseY, applicationModel as ApplicationModel);
}

export const mouseClicked = (p: p5): void => {
  MouseManager.mouseClicked(p.mouseX, p.mouseY, applicationModel as ApplicationModel);
}

export const mouseDragged = (p: p5): void => {
  MouseManager.mouseDragged(
    p.mouseX, p.mouseY,
    applicationModel as ApplicationModel
  );
};

export const mousePressed = (
  p: p5
): void => {
  MouseManager.mousePressed(
    p.mouseX, p.mouseY, applicationModel as ApplicationModel
  );
};

export const mouseReleased = (p: p5): void => {
  MouseManager.mouseReleased(p.mouseX, p.mouseY, applicationModel as ApplicationModel);
};

export const keyPressed = (p: p5): void => {
  KeyboardManager.handleKeyPress(
    p.keyCode, p.key
  );
}

export const doubleClicked = (p: p5): void => {
  MouseManager.doubleClicked(p.mouseX, p.mouseY, applicationModel as ApplicationModel);
}

/** This is a setup function. */
export const setup = (p: p5): void => {

  p.createCanvas(p.windowWidth, p.windowHeight);
  p.frameRate(30);
  p.background(248);
  // Classes with static methods that need access to p5.js
  initializeRenderers(p);
};