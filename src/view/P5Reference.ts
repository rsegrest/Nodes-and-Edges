import p5 from "p5";
class P5Reference {

  private static instance:P5Reference | null = null;
  public static p:p5|null = null;
  private constructor(
    p:p5
  ) {
    P5Reference.p = p;
  }

  public static createInstance(p:p5):P5Reference {
    P5Reference.instance = new P5Reference(p);
    return P5Reference.instance;
  }

  public static getInstance():P5Reference {
    if (P5Reference.instance === null) {
      throw(new Error('P5Reference instance is null'));
    }
    return P5Reference.instance;
  }

}
export default P5Reference;