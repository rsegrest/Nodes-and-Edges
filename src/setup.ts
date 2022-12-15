import type p5 from "p5";
import CreationManager from "./controller/CreationManager";
import InteractionManager from "./controller/InteractionManager";
import MouseManager from "./controller/MouseManager";
import ApplicationModel from "./model/ApplicationModel";
import RenderApplication from "./view/RenderApplication";
import RenderEdge from "./view/RenderEdge";
import RenderGuides from "./view/RenderGuide";
import RenderInspector from "./view/RenderInspector";
import RenderNode from "./view/RenderNode";
import RenderParameter from "./view/RenderParameter";
import RenderParameterField from "./view/RenderParameterField";
import RenderTool from "./view/RenderTool";
import RenderToolbox from "./view/RenderToolbox";

export let applicationModel: ApplicationModel | null = null;
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

export const mouseDragged = (p: p5): void => {
  MouseManager.mouseDragged(p, applicationModel as ApplicationModel);
};

export const mousePressed = (
  // p: p5
): void => {
  MouseManager.mousePressed(
    // p
  );
};

export const mouseReleased = (p: p5): void => {
  MouseManager.mouseReleased(p, applicationModel as ApplicationModel);
};

export const keyPressed = (p: p5): void => {
  InteractionManager.handleKeyPress(p);
}

/** This is a setup function. */
export const setup = (p: p5): void => {
  p.createCanvas(p.windowWidth, p.windowHeight);
  p.frameRate(30);
  p.background(248);
  // Classes with static methods that need access to p5.js
  initializeRenderers(p);
};
