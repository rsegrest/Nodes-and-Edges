import type p5 from "p5";
import { applicationModel } from "./setup";
import RenderApplication from "./view/RenderApplication";
import ApplicationModel from "./model/ApplicationModel";
import MouseManager from "./controller/MouseManager";
import InteractionManager from "./controller/InteractionManager";
let p: p5;
let lastWindowDimensionX: number | null = null;
let lastWindowDimensionY: number | null = null;

export function mouseClicked(): void {
  // console.log(`draw.ts: mouseClicked()`);
  MouseManager.mouseClicked(applicationModel as ApplicationModel);
}

export const draw = (_p: p5): void => {
  p = _p;
  if (
    lastWindowDimensionX !== p.windowWidth ||
    lastWindowDimensionY !== p.windowHeight
  ) {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    InteractionManager.resizeCanvas(
      applicationModel as ApplicationModel,
      p.windowWidth,
      p.windowHeight
    );
    lastWindowDimensionX = p.windowWidth;
    lastWindowDimensionY = p.windowHeight;
  }
  p.background("rgb(180,180,200)");
  RenderApplication.renderElements(applicationModel as ApplicationModel);
};
