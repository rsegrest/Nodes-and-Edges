import type p5 from "p5";

export let fontRegular: p5.Font;
export const nodeTypes = {
  BASIC: "BASIC",
  ELEMENT: "ELEMENT",
};

export const preload = (p: p5): void => {
  fontRegular = p.loadFont("./font/Regular.otf");
};

/** This is a setup function. */
export const setup = (p: p5): void => {
  p.createCanvas(800, 600);
  p.background(248);
};
