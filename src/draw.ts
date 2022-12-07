import type p5 from "p5";
export const BASE_NODE_WIDTH = 100;
export const BASE_NODE_HEIGHT = 50;
// import {
//   fontRegular
// } from "./setup";
let nodes: any[] = [];
let p: p5;

const PlugPosition = {
  N: "N",
  E: "E",
  S: "S",
  W: "W",
  NE: "NE",
  SE: "SE",
  SW: "SW",
  NW: "NW",
};

type PlugPosition =
  | typeof PlugPosition
  | typeof PlugPosition[keyof typeof PlugPosition];

function drawPlug(
  outlet: PlugPosition,
  nodePosX: number,
  nodePosY: number,
  nodeWidth: number,
  nodeHeight: number
) {
  switch (outlet) {
    case PlugPosition.N:
      p.ellipse(nodePosX + BASE_NODE_WIDTH / 2, nodePosY, 5, 5);
      break;
    case PlugPosition.E:
      p.ellipse(
        nodePosX + BASE_NODE_WIDTH,
        nodePosY + BASE_NODE_HEIGHT / 2,
        5,
        5
      );
      break;
    case PlugPosition.S:
      p.ellipse(
        nodePosX + BASE_NODE_WIDTH / 2,
        nodePosY + BASE_NODE_HEIGHT,
        5,
        5
      );
      break;
    case PlugPosition.W:
      p.ellipse(nodePosX, nodePosY + BASE_NODE_HEIGHT / 2, 5, 5);
      break;
    case PlugPosition.NE:
      p.ellipse(nodePosX + BASE_NODE_WIDTH, nodePosY, 5, 5);
      break;
    case PlugPosition.SE:
      p.ellipse(nodePosX + BASE_NODE_WIDTH, nodePosY + BASE_NODE_HEIGHT, 5, 5);
      break;
    case PlugPosition.SW:
      p.ellipse(nodePosX, nodePosY + BASE_NODE_HEIGHT, 5, 5);
      break;
    case PlugPosition.NW:
      p.ellipse(nodePosX, nodePosY, 5, 5);
      break;
    default:
      break;
  }
}

function displayNode(
  posX: number,
  posY: number,
  label: string
  // node: any, plugs: any[] = []
) {
  const nodeWidth = BASE_NODE_WIDTH;
  const nodeHeight = BASE_NODE_HEIGHT;
  // const label = node.data.label;
  p.noStroke();
  p.fill("rgba(128,128,128,0.6)");
  p.rect(posX, posY + 5, nodeWidth, nodeHeight);
  p.fill(255, 255, 228);
  p.stroke(128);
  p.strokeWeight(1);
  p.rect(posX + 3, posY, nodeWidth, nodeHeight);
  p.fill(0);
  p.noStroke();
  p.textAlign(p.CENTER, p.CENTER);
  p.text(label, posX + 6, posY + 3, nodeWidth - 6, nodeHeight - 3);
  // const showNodes = true;
  // if (showNodes) {
  // plugs.forEach((plug) => {
  //   p.fill(255, 0, 0);
  //   p.ellipse(plug.x, plug.y, 5, 5);
  // });
  // drawPlug(PlugPosition.NE, posX, posY, nodeWidth, nodeHeight);
  // }
}

function layoutNodes() {
  displayNode(10, 10, "Solar Array");
  // nodes[0]);
}

export const draw = (_p: p5): void => {
  p = _p;
  p.createCanvas(800, 600);
  p.background("rgb(48, 0, 48)");
  layoutNodes();
};
