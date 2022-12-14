import type p5 from "p5";
import { chartManager, applicationModel } from "./setup";
import ChartManager from "./controller/ChartManager";
import RenderApplication from "./view/RenderApplication";
import ApplicationModel from "./model/ApplicationModel";
let p: p5;
let lastWindowDimensionX:number|null = null;
let lastWindowDimensionY:number|null = null;

export function mouseClicked(): void {
  // console.log(`draw.ts: mouseClicked()`);
  (chartManager as ChartManager).mouseClicked(
    applicationModel as ApplicationModel);
}

export const draw = (_p: p5): void => {
  p = _p;
  if (lastWindowDimensionX !== p.windowWidth || lastWindowDimensionY !== p.windowHeight) {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    (chartManager as ChartManager).resizeCanvas(p.windowWidth, p.windowHeight);
    lastWindowDimensionX = p.windowWidth;
    lastWindowDimensionY = p.windowHeight;
  }
  p.background("rgb(180,180,200)");
  RenderApplication.renderElements(applicationModel as ApplicationModel);
};
