import GuiElementModel from "./GuiElement";
import Position from "../positioning/Position";
import Dimension from "../positioning/Dimension";

abstract class DraggableGuiElementModel extends GuiElementModel {

  protected isDragging = false;
  constructor(
      position:Position|null = null,
      dimensions:Dimension|null = null,
      protected isResizable=false, // placeholder for future
    ) {
        super(true,true,true,isResizable,position,dimensions);
    }

    public setCursor(isGrabbing:boolean):void {
      const defaultCanvas = document.getElementById('defaultCanvas0');
      let cursorType = 'pointer';
      if (isGrabbing) { cursorType = 'grab'; }
      console.log('defaultCanvas');
      console.log(defaultCanvas);
      const htmltag = defaultCanvas as HTMLElement;
      htmltag["style"].cursor = cursorType;
    }
    
    
    // public startDragAction():void {
    //   this.isDragging = (true);
    // }
    // public stopDragAction():void {
    //   this.isDragging = (false);
    // }
    public setIsDragging(isDragging:boolean): void {
      this.isDragging = isDragging;
    }
    public getIsDragging(): boolean {
      return this.isDragging;
    }
    public abstract dragToPosition(position:Position): void;

}
export default DraggableGuiElementModel;