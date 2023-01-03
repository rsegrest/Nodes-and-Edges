import GuiElementModel from "./abstract/GuiElement";
import Dimension from "./positioning/Dimension";
import Position from "./positioning/Position";
import ToolModel from "./ToolModel";
class ToolboxModel extends GuiElementModel {
    doubleClickAction() {
        throw new Error("Method not implemented.");
    }
    constructor() {
        super(true, false, // _isDraggable: fixed for now, might make this draggable later
        false, // _isResizable: future feature
        false, // _isSelectable: future feature
        new Position(600, 10), new Dimension(190, 580));
        this.type = "Toolbox";
        this.toolList = [];
        this.isCollapsed = false;
        this.initialize();
    }
    initialize() {
        this.toolList.push(new ToolModel("Element", "E", "Element"));
        this.toolList.push(new ToolModel("Subelement", "S", "Subelement"));
        this.toolList.push(new ToolModel("Edge", "E", "Edge"));
        this.setToolLayout();
    }
    static findHorizontalCenterLine(tbm) {
        const pos = tbm.getPosition();
        if (!pos)
            return 0;
        return pos.x + 95;
    }
    // ~80
    static findFirstRowOffsetY(tbm) {
        const pos = tbm.getPosition();
        if (!pos)
            return 0;
        const FIRST_ROW_OFFSET_Y = 30 + pos.y;
        return FIRST_ROW_OFFSET_Y;
    }
    // Center of [rowNum] (Y)
    static findRowCenterLineY(tbm, row) {
        const firstRowOffsetY = this.findFirstRowOffsetY(tbm);
        return firstRowOffsetY + (row * this.ROW_SPACING);
    }
    static calcNumToolGridColumns(
    // tbm: ToolboxModel
    ) {
        return 2;
    }
    static calcNumToolGridRows(
    // tbm: ToolboxModel
    ) {
        return 6;
    }
    // NOT CURRENTLY USED?
    // TODO: Use this function to calculate position in ToolModel
    // static buildLocationSet(tbm: ToolboxModel):Position[]|null {
    //   // const p = RenderToolbox.getP();
    //   const pos = tbm.getPosition();
    //   if (!pos) return null;
    //   // const dim = tbm.getDimensions();
    //   const toolList = tbm.getToolList();
    //   const toolLocations:Position[] = [];
    //   // const CENTER_OFFSET_X = 45;
    //   // TODO: Use row and column count to calculate position
    //   // const rows = RenderToolbox.calcNumToolGridRows();
    //   // const columns = RenderToolbox.calcNumToolGridColumns();
    //   // find center line
    //   // find row center lines
    //   toolList.forEach((tool,i) => {
    //     const thisX = this.findHorizontalCenterLine(tbm); // -CENTER_OFFSET_X;
    //     // if (i%2 !== 0) {
    //     //   thisX += (CENTER_OFFSET_X*2);
    //     // }
    //     toolLocations.push(
    //       new Position(
    //         // if two rows, center plus or minus horizontal offset
    //         thisX,
    //         pos.y+(
    //           this.findFirstRowOffsetY(tbm)
    //         )+(Math.floor(i/2)*60)
    //       )
    //     );
    //   })
    //   return toolLocations;
    // }
    setToolLayout() {
        const toolList = this.getToolList();
        const toolCount = toolList.length;
        // TODO: make this dynamic (2 lines)
        const toolWidth = 80;
        const toolHeight = 40;
        const FIRST_ROW_Y = 40;
        const OFFSET_X = 10;
        for (let i = 0; i < toolCount; i++) {
            const tool = toolList[i];
            tool.setDimensions(new Dimension(toolWidth, toolHeight));
            tool.setPosition(new Position((OFFSET_X + this.position.x + (90 * (i % 2))), // - (toolWidth + 10) + ((i % 2)*(toolWidth + 10))
            this.position.y + FIRST_ROW_Y + (Math.floor(i / 2)) * 50));
        }
    }
    getToolList() {
        return this.toolList;
    }
    clickAction() {
        console.log("toolbox clicked");
    }
    // public getDimensions(): Dimension {
    //   return this.dimensions;
    // }
    // public setDimensions(dimensions: Dimension): void {
    //   this.dimensions = dimensions;
    // }
    // public getPosition(): { x: number; y: number } {
    //   return this.position;
    // }
    // public setPosition(position: { x: number; y: number }): void {
    //   this.position = position;
    // }
    setIsCollapsed(isCollapsed = true) {
        this.isCollapsed = isCollapsed;
    }
    getIsCollapsed() {
        return this.isCollapsed;
    }
    // public getBoundary(): { left: number; top: number; right: number; bottom: number } | null {
    //   if (!this.position || !this.dimensions) {
    //     return null;
    //   }
    //   return {
    //     left: (this.position as Position).x,
    //     top: (this.position as Position).y,
    //     right: (this.position as Position).x + this.dimensions.width,
    //     bottom: (this.position as Position).y + this.dimensions.height,
    //   };
    // }
    checkBoundary(mouseX, mouseY) {
        const boundary = this.getBoundary();
        if (!boundary) {
            return false;
        }
        const isOver = (mouseX >= (boundary.getLeft()) &&
            mouseX <= (boundary.getRight()) &&
            mouseY >= (boundary.getTop()) &&
            mouseY <= (boundary.getBottom()));
        return isOver;
    }
    // override toString
    toString() {
        return "ToolboxModel";
    }
}
ToolboxModel.ROW_SPACING = 60;
export default ToolboxModel;
