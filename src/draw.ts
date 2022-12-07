import type p5 from "p5";
import Dimension from "./model/Dimension";
import NodeModel from "./model/NodeModel";
import EdgeModel from './model/EdgeModel';
import Position from "./model/Position";
import RenderNode from "./view/RenderNode";
// import RenderEdges from "./view/RenderEdges";
// export const BASE_NODE_WIDTH = 100;
// export const BASE_NODE_HEIGHT = 50;
export const nodeMetadata: any[] = [];
export const nodes:NodeModel[] = [];
export const edges:EdgeModel[] = [];

let p: p5;

export function mouseClicked():void {
  nodes.forEach((n,i) => {
    console.log(`${i}: Looking at nodes: ${n.toString()}`)
    const isOver = n.checkMouseOver(p.mouseX, p.mouseY);
    if (isOver) {
      if (n.getIsSelected()) {
        n.deselect();
      } else {
        n.setSelected();
      }
    }
  })
  
}

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


function renderNodes():void {
  nodes.forEach((n) => {
    RenderNode.render(n);
  })
}


export const draw = (_p: p5): void => {
  p = _p;
  
  p.background("rgb(220,200,220)");
  p.push(); 
  renderNodes();
  p.pop();
};
