import p5 from "p5";

export class Layout {
  private instance:Layout|null = null;
  private width = 0;
  private height = 0;

  private constructor(p:p5) {
    this.width = p.width;
    this.height = p.height;
  }
  public createInstance(p:p5):Layout {
    if (this.instance === null) {
      this.instance = new Layout(p);
    }
    return this.instance;
  }
  public getInstance():Layout {
    if (this.instance === null) {
      throw new Error('Layout instance is not created yet');
    }
    return this.instance;
  }
}
export default Layout;