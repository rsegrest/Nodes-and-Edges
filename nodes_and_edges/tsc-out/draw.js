import { applicationModel } from "./setup";
import RenderApplication from "./view/RenderApplication";
import InteractionManager from "./controller/InteractionManager";
import Layout from "./model/positioning/Layout";
import CreationManager from "./controller/CreationManager";
let p;
let lastWindowDimensionX = null;
let lastWindowDimensionY = null;
export const draw = (_p) => {
    p = _p;
    if (lastWindowDimensionX !== p.windowWidth ||
        lastWindowDimensionY !== p.windowHeight) {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        Layout.resizeCanvas(p.windowWidth, p.windowHeight);
        InteractionManager.resizeCanvas(applicationModel, p.windowWidth, p.windowHeight);
        lastWindowDimensionX = p.windowWidth;
        lastWindowDimensionY = p.windowHeight;
    }
    p.background("rgb(180,180,200)");
    CreationManager.advanceState();
    RenderApplication.renderElements(applicationModel);
};
