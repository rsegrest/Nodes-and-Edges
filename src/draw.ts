import type p5 from "p5";
import { applicationModel } from "./setup";
import RenderApplication from "./view/RenderApplication";
import ApplicationModel from "./model/ApplicationModel";
import InteractionManager from "./controller/InteractionManager";
import Layout from "./model/positioning/Layout";
let p: p5;
let lastWindowDimensionX: number | null = null;
let lastWindowDimensionY: number | null = null;

export const draw = (_p: p5): void => {
  p = _p;
  if (
    lastWindowDimensionX !== p.windowWidth ||
    lastWindowDimensionY !== p.windowHeight
  ) {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    Layout.resizeCanvas(p.windowWidth, p.windowHeight);
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
