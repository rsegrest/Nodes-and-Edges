import type p5 from "p5";
import { chartManager } from "./setup";
import ChartManager from "./controller/ChartManager";

let p: p5;

export function mouseClicked(): void {
  // console.log(`draw.ts: mouseClicked()`);
  (chartManager as ChartManager).mouseClicked();
}

export const draw = (_p: p5): void => {
  p = _p;
  p.background("rgb(180,180,200)");
  (chartManager as ChartManager).renderElements();
};

// function renderNodes():void {
//   nodes.forEach((n) => {
//     RenderNode.render(n);
//   })
// }

// INTERFACE?
// function generatedNodeData(
//   id:string,
//   label:string
// ):{
//   id:string,
//   label:string,
//   position:Position,
//   dimension:Dimension,
// } {
//   // const position = new Position(10, 10);
//   // const dimension = new Dimension(100, 50);
//   return {
//     id,
//     label,
//     position,
//     dimension,
//   }
// }
