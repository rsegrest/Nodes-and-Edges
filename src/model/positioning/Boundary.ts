class Boundary {

  private left: number;
  private top: number;
  private right: number;
  private bottom: number;
  constructor(left:number, top:number, right:number, bottom:number) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }
  getLeft():number {
    return this.left;
  }
  getTop():number {
    return this.top;
  }
  getRight():number {
    return this.right;
  }
  getBottom():number {
    return this.bottom;
  }
  getBoundary():{left:number, top:number, right:number, bottom:number} {
    return {
      left: this.left,
      top: this.top,
      right: this.right,
      bottom: this.bottom,
    };
  }
  toString():string {
    return `Boundary=[left: ${this.left}, top: ${this.top}, right: ${this.right}, bottom: ${this.bottom}]`;
  }
}

export default Boundary;