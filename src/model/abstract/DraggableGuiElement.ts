import GuiElementModel from "./GuiElement";
import Position from "../positioning/Position";
import Dimension from "../positioning/Dimension";
import Boundary from '../positioning/Boundary'
abstract class DraggableGuiElementModel extends GuiElementModel {

  protected isDragging = false;
  constructor(
      position:Position|null = null,
      dimensions:Dimension|null = null,
      protected isResizable=false, // placeholder for future
      boundary:Boundary|null = null,
    ) {
        super(true,true,true,isResizable,position,dimensions,boundary);
    }

    public setCursor(isGrabbing:boolean):void {
      const defaultCanvas = document.getElementById('defaultCanvas0');
      let cursorType = 'pointer';
      if (isGrabbing) { cursorType = 'grab'; }
      const htmltag = defaultCanvas as HTMLElement;
      htmltag["style"].cursor = cursorType;
    }
    public setIsDragging(isDragging:boolean): void {
      this.isDragging = isDragging;
    }
    public getIsDragging(): boolean {
      return this.isDragging;
    }
    public abstract dragToPosition(position:Position): void;

}
export default DraggableGuiElementModel;