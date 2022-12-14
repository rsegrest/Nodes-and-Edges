import p5 from "p5";
import ApplicationModel from "../model/ApplicationModel";

class RenderApplication {
  private static p:p5|null = null;
  // private static rowCount = 0;
  // public static readonly Y_FIRST_ROW_OFFSET = 45;
  // public static readonly Y_EACH_ROW_OFFSET = 20;
  // public static readonly NAME_COLUMN_WIDTH = 150;
  constructor(p:p5) {
    RenderApplication.p = p;
  }

  static render(
    application:ApplicationModel,
    // inspector:InspectorModel,
    // isFirstParameter=false,
    // shouldAddHorizontalDivider=false,
  ):void {
    const p = this.p;
    if (p === null) { throw(new Error('p is null in RenderApplication')); }
    p.push();
    // p.translate(
    
    // );
    p.pop();
    
  }
}
export default RenderApplication;