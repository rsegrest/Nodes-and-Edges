import type p5 from "p5";
import RenderEdge from "./view/RenderEdge";
import RenderNode from "./view/RenderNode";

export let fontRegular: p5.Font;
export const nodeTypes = {
  BASIC: "BASIC",
  ELEMENT: "ELEMENT",
};

export const preload = (p: p5): void => {
  fontRegular = p.loadFont(
    "./font/Regular.otf"
  );
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
export const setup = (p: p5): void => {
  p.createCanvas(800, 600);
  p.background(248);
  new RenderNode(p);
  // new RenderNode3D(p);
  new RenderEdge(p);
};
