import { Boundary } from "../NodeModel";
import Dimension from "../positioning/Dimension";
import Position from "../positioning/Position";

abstract class GuiElementModel {
    protected _isClickable = true;
    protected _isSelectable = false;
    protected _isDraggable = false;
    protected _isResizable = false;
    public position:Position|null = null;
    public dimensions:Dimension|null = null;
    public isVisible = true;
    protected isSelected = false;
    protected isRolledOver = false;

    constructor(
      _isClickable:boolean,
      _isDraggable:boolean,
      _isResizable:boolean,
      _isSelectable:boolean,
      position:Position|null = null,
      dimensions:Dimension|null = null,
    ) {
        this._isClickable = _isClickable;
        this._isDraggable = _isDraggable;
        this._isResizable = _isResizable;
        this._isSelectable = _isSelectable;
        position && (this.position = position);
        dimensions && (this.dimensions = dimensions);
    }
    public checkMouseOver(mouseX: number, mouseY: number): boolean {
      const boundary = this.getBoundary();
      if (!boundary) { return false; }
      const isOver = (
        mouseX >= (boundary.left) &&
        mouseX <= (boundary.right) &&
        mouseY >= (boundary.top) &&
        mouseY <= (boundary.bottom)
      );
      return isOver;
    }
    public getIsDraggable(): boolean {
      return this._isDraggable;
    }
    public getIsClickable(): boolean {
      return this._isClickable;
    }
    public getIsResizable(): boolean {
      return this._isResizable;
    }
    public abstract clickAction(): void;
    public setPosition(position:Position): void {
      this.position = position;
    }
    public getPosition(): Position|null {
      return this.position;
    }
    public setDimensions(dimensions:Dimension): void {
      this.dimensions = dimensions;
    }
    public getDimensions(): Dimension|null {
      return this.dimensions;
    }
    public getBoundary(addMargin=0):Boundary|null {
      if (!this.getPosition() || !this.getPosition()) {
        return null;
      }
      return {
        left: (this.position as Position).x-addMargin,
        top: (this.position as Position).y-addMargin,
        right: (this.position as Position).x + (this.dimensions as Dimension).width + addMargin,
        bottom: (this.position as Position).y + (this.dimensions as Dimension).height + addMargin,
      };
    }
    public setVisible(visible=true): void {
      this.isVisible = visible;
    }
    public setHidden(isHidden=true): void {
      this.isVisible = !isHidden;
    }
    public getIsVisible(): boolean {
      return this.isVisible;
    }
    public getIsHidden(): boolean {
      return !this.isVisible;
    }
    public getIsRolledOver(): boolean {
      return this.isRolledOver;
    }
    public setIsRolledOver(isRolledOver=true): void {
      this.isRolledOver = isRolledOver;
    }
    public getIsSelected(): boolean {
      return this.isSelected;
    }
    public setIsSelected(isSelected=true): void {
      this.isSelected = isSelected;
    }
    public getIsSelectable(): boolean {
      return this._isSelectable;
    }
    public setSelectable(isSelectable=true): void {
      this._isSelectable = isSelectable;
    }
}
export default GuiElementModel;