import { chartManager } from "./setup";
let p;
export function mouseClicked() {
    // console.log(`draw.ts: mouseClicked()`);
    chartManager.mouseClicked();
}
export const draw = (_p) => {
    p = _p;
    p.background("rgb(180,180,200)");
    chartManager.renderElements();
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
