import type p5 from "p5";
import Dimension from "./model/Dimension";
import NodeModel from "./model/NodeModel";
import Position from "./model/Position";
import RenderNode from "./view/RenderNode";
// import RenderNode from "./view/RenderNode";
import RenderNode3D from "./view_3d/RenderNode3D";
export const BASE_NODE_WIDTH = 100;
export const BASE_NODE_HEIGHT = 50;
// import {
//   fontRegular
// } from "./setup";
const nodes: any[] = [];
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
  node:NodeModel,
):void {
  switch (outlet) {
    case PlugPosition.N:
      p.ellipse(node.position.x + BASE_NODE_WIDTH / 2, node.position.y, 5, 5);
      break;
    case PlugPosition.E:
      p.ellipse(
        node.position.x + BASE_NODE_WIDTH,
        node.position.y + BASE_NODE_HEIGHT / 2,
        5,
        5
      );
      break;
    case PlugPosition.S:
      p.ellipse(
        node.position.x + BASE_NODE_WIDTH / 2,
        node.position.y + BASE_NODE_HEIGHT,
        5,
        5
      );
      break;
    case PlugPosition.W:
      p.ellipse(node.position.x, node.position.y + BASE_NODE_HEIGHT / 2, 5, 5);
      break;
    case PlugPosition.NE:
      p.ellipse(node.position.x + BASE_NODE_WIDTH, node.position.y, 5, 5);
      break;
    case PlugPosition.SE:
      p.ellipse(node.position.x + BASE_NODE_WIDTH, node.position.y + BASE_NODE_HEIGHT, 5, 5);
      break;
    case PlugPosition.SW:
      p.ellipse(node.position.x, node.position.y + BASE_NODE_HEIGHT, 5, 5);
      break;
    case PlugPosition.NW:
      p.ellipse(node.position.x, node.position.y, 5, 5);
      break;
    default:
      break;
  }
}


function layoutNodes():void {
  const testNode = new NodeModel(
    "1",
    "Solar Array",
    new Position(10, 10),
    new Dimension(100, 50)
  )

  const isOver = testNode.checkMouseOver(p.mouseX, p.mouseY);
  console.log('isOver', isOver);
  RenderNode.render(testNode, isOver);
  // RenderNode3D.render(testNode);
    // 10, 10, "Solar Array");
}

export const draw = (_p: p5): void => {
  p = _p;
  // const width = p.width;
  // const height = p.height;
  // p.orbitControl(); // tilt the camera with the mouse
  // p.normalMaterial();
  // p.box(150, 75, 10);
  p.background("rgb(220,200,220)");
  p.push(); 
  layoutNodes();
  p.pop();
};
