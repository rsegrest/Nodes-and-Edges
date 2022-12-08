import p5 from "p5";

class RenderGuides {
  private static p:p5;
  constructor(p:p5) {
    RenderGuides.p = p;
  }
  static render():void {
    const p = RenderGuides.p;
    p.push();
    p.noFill();
    p.strokeWeight(1);
    p.stroke('rgb(255,255,255,0.5)');
    for (let col = 1; col < p.width/100; col += 1) {
      p.line((col*100), 0, (col*100), p.height);
    }
    for (let row = 1; row < p.height/100; row += 1) {
      p.line(0, (row*100), p.width, (row*100));
    }
    p.pop();
  }
  static getP():p5 {
    return RenderGuides.p;
  }
}
export default RenderGuides;