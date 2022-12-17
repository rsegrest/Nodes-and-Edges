/**
 * This is a p5.js sketch made with p5js-template-petr-plus.
 *
 * @license CC0-1.0
 */

(function (p5) {
  "use strict";

  /** Creates a function object to be passed to `new p5()`. */
  const createSketch = (definition) => {
    const methodNames = Object.keys(definition);
    return (p) => {
      methodNames.forEach((methodName) => {
        const method = definition[methodName];
        if (method) p[methodName] = method.bind(undefined, p);
      });
    };
  };

  class Dimension {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
    toString() {
      return `Dimension:(width:${this.width},  height:${this.height})`;
    }
  }

  class Boundary {
    constructor(left, top, right, bottom) {
      this.left = left;
      this.top = top;
      this.right = right;
      this.bottom = bottom;
    }
    getLeft() {
      return this.left;
    }
    getTop() {
      return this.top;
    }
    getRight() {
      return this.right;
    }
    getBottom() {
      return this.bottom;
    }
    getBoundary() {
      return {
        left: this.left,
        top: this.top,
        right: this.right,
        bottom: this.bottom,
      };
    }
    toString() {
      return `Boundary=[left: ${this.left}, top: ${this.top}, right: ${this.right}, bottom: ${this.bottom}]`;
    }
  }

  class GuiElementModel {
    constructor(
      _isClickable,
      _isDraggable,
      _isResizable,
      _isSelectable,
      position = null,
      dimensions = null,
      boundary = null
    ) {
      this._isClickable = true;
      this._isSelectable = false;
      this._isDraggable = false;
      this._isResizable = false;
      this.position = null;
      this.dimensions = null;
      this.boundary = null;
      this.isVisible = true;
      this.isSelected = false;
      this.isRolledOver = false;
      this._isClickable = _isClickable;
      this._isDraggable = _isDraggable;
      this._isResizable = _isResizable;
      this._isSelectable = _isSelectable;
      position && this.setPosition(position);
      dimensions && this.setDimensions(dimensions);
      boundary && this.setUpBoundary();
    }
    checkBoundary(mouseX, mouseY) {
      const boundary = this.getBoundary();
      if (!boundary) {
        return false;
      }
      const isOver =
        mouseX >= boundary.getLeft() &&
        mouseX <= boundary.getRight() &&
        mouseY >= boundary.getTop() &&
        mouseY <= boundary.getBottom();
      return isOver;
    }
    getIsDraggable() {
      return this._isDraggable;
    }
    getIsClickable() {
      return this._isClickable;
    }
    getIsResizable() {
      return this._isResizable;
    }
    rolloverAction() {
      this.isRolledOver = true;
    }
    setPosition(position) {
      this.position = position;
      this.setUpBoundary();
    }
    getPosition() {
      return this.position;
    }
    setDimensions(dimensions) {
      this.dimensions = dimensions;
      this.setUpBoundary();
    }
    getDimensions() {
      return this.dimensions;
    }
    setUpBoundary(addMargin = 0) {
      const pos = this.getPosition();
      const dim = this.getDimensions();
      if (
        pos === null ||
        typeof pos === "undefined" ||
        dim === null ||
        typeof dim === "undefined"
      ) {
        return;
      }
      const boundary = new Boundary(
        this.position.x - addMargin,
        this.position.y - addMargin,
        this.position.x + this.dimensions.width + addMargin,
        this.position.y + this.dimensions.height + addMargin
      );

      // if (checkOutput) { console.table(boundary); }
      this.boundary = boundary;
    }
    getBoundary() {
      return this.boundary;
    }
    setVisible(visible = true) {
      this.isVisible = visible;
    }
    setHidden(isHidden = true) {
      this.isVisible = !isHidden;
    }
    getIsVisible() {
      return this.isVisible;
    }
    getIsHidden() {
      return !this.isVisible;
    }
    getIsRolledOver() {
      return this.isRolledOver;
    }
    setIsRolledOver(isRolledOver = true) {
      this.isRolledOver = isRolledOver;
    }
    getIsSelected() {
      return this.isSelected;
    }
    setIsSelected(isSelected = true) {
      this.isSelected = isSelected;
    }
    getIsSelectable() {
      return this._isSelectable;
    }
    setSelectable(isSelectable = true) {
      this._isSelectable = isSelectable;
    }
  }

  class DraggableGuiElementModel extends GuiElementModel {
    constructor(
      position = null,
      dimensions = null,
      isResizable = false, // placeholder for future
      boundary = null
    ) {
      super(true, true, true, isResizable, position, dimensions, boundary);
      this.isResizable = isResizable;
      this.isDragging = false;
    }
    setCursor(isGrabbing) {
      const defaultCanvas = document.getElementById("defaultCanvas0");
      let cursorType = "pointer";
      if (isGrabbing) {
        cursorType = "grab";
      }
      const htmltag = defaultCanvas;
      htmltag["style"].cursor = cursorType;
    }
    setIsDragging(isDragging) {
      this.isDragging = isDragging;
    }
    getIsDragging() {
      return this.isDragging;
    }
  }

  class EdgeModel extends DraggableGuiElementModel {
    doubleClickAction() {
      throw new Error("Method not implemented.");
    }
    constructor(id, sourceNode, targetNode, sourcePlug, targetPlug) {
      super(null, null, false);
      this.type = "Edge";
      this.sourceNode = null;
      this.targetNode = null;
      this.sourcePlug = null;
      this.targetPlug = null;
      this.id = id;
      this.sourceNode = sourceNode;
      if (targetNode) {
        this.targetNode = targetNode;
      }
      if (sourcePlug) {
        this.sourcePlug = sourcePlug;
      }
      if (targetPlug) {
        this.targetPlug = targetPlug;
      }
    }
    connectSource(node, plug = null) {
      this.sourceNode = node;
      if (plug) {
        this.sourcePlug = plug;
      }
    }
    connectTarget(node, plug = null) {
      this.targetNode = node;
      if (plug) {
        this.targetPlug = plug;
      }
    }
    getSourceNode() {
      return this.sourceNode;
    }
    getTargetNode() {
      return this.targetNode;
    }
    getSourcePlug() {
      return this.sourcePlug;
    }
    getTargetPlug() {
      return this.targetPlug;
    }
    getId() {
      return this.id;
    }
    dragToPosition(position) {
      throw new Error("Method not implemented.");
    }
    clickAction() {
      throw new Error("Method not implemented.");
    }
    toString() {
      return `EdgeModel: ${this.id}, sourceNode: ${this.sourceNode}, targetNode: ${this.targetNode}, sourcePlug: ${this.sourcePlug}, targetPlug: ${this.targetPlug}`;
    }
    toDyreqtJson() {
      throw new Error("EdgeModel-- toDyreqtJson: Method not implemented.");
    }
  }

  class Position {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.x = x;
      this.y = y;
    }
    toString() {
      return `Position:(x:${this.x}, y:${this.y})`;
    }
    static getDistance(p1, p2) {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
    getDistance(p2) {
      return Position.getDistance(this, p2);
    }
  }

  class InspectorRow extends GuiElementModel {
    constructor(rowNum) {
      super(true, false, false, false);
      this.rowNum = rowNum;
    }
  }

  class InspectorHeadingRow extends InspectorRow {
    constructor(content, rowNum) {
      super(rowNum);
      this.content = content;
    }
    clickAction() {
      // do nothing for now -- later expand / collapse
    }
    doubleClickAction() {
      // no op
    }
    getContent() {
      return this.content;
    }
    setContent(content) {
      this.content = content;
    }
    toString() {
      return `InspectorRowHeading[${this.content}]`;
    }
  }

  class InspectorInfoColumn extends GuiElementModel {
    constructor(content, columnNum) {
      super(true, false, false, true);
      this.content = content;
      this.columnNum = columnNum;
    }
    getContent() {
      return this.content;
    }
    setContent(content) {
      this.content = content;
    }
    clickAction() {
      // do nothing for now -- later expand / collapse
      console.log("Inspector Info Column: click action");
    }
    doubleClickAction() {
      // make editable
      console.log("Inspector Info Column: double-click action");
    }
    getColumnNum() {
      return this.columnNum;
    }
    setColumnNum(columnNum) {
      this.columnNum = columnNum;
    }
  }

  class InspectorInfoRow extends InspectorRow {
    constructor(parameter, rowNum) {
      super(rowNum);
      this.columns = [
        new InspectorInfoColumn(parameter.getName(), 0),
        new InspectorInfoColumn(
          `${parameter.getValue()} ${parameter.getUnits()}`,
          1
        ),
      ];
    }
    getColumns() {
      return this.columns;
    }
    clickAction() {
      throw new Error("Method not implemented.");
    }
    doubleClickAction() {
      throw new Error("Method not implemented.");
    }
    toString() {
      var _a;
      return `InspectorRowInfo[${
        (_a = this.columns[0]) === null || _a === void 0
          ? void 0
          : _a.getContent()
      }]`;
    }
  }

  class LayoutInspector {
    constructor(pos, dim) {
      LayoutInspector.position = pos;
      LayoutInspector.dimensions = dim;
      LayoutInspector.Y_POSITION = Layout.getHeight() - 200;
      LayoutInspector.layout = Layout.getInstance();
    }
    static createInstance(pos, dim) {
      // const newPos = new Position(10,400);
      // const newDim = new Dimension(300, 190);
      LayoutInspector.instance = new LayoutInspector(pos, dim);
      return LayoutInspector.instance;
    }
    static getInstance() {
      if (LayoutInspector.instance === null) {
        throw new Error("InspectorLayout instance is null");
      }
      return LayoutInspector.instance;
    }
    static getPosition() {
      return LayoutInspector.position;
    }
    static getDimensions() {
      return LayoutInspector.dimensions;
    }
    static createRowsFromInputAndOutputParameters(inputParams, outputParams) {
      let rowCount = 0;
      const createdRows = [];
      const inputHeading = new InspectorHeadingRow(
        "Input Parameters",
        (rowCount += 1)
      );
      const inputRows = inputParams.map((param) => {
        return new InspectorInfoRow(param, (rowCount += 1));
      });
      const outputHeading = new InspectorHeadingRow(
        "Output Parameters",
        (rowCount += 1)
      );
      const outputRows = outputParams.map((param) => {
        return new InspectorInfoRow(param, (rowCount += 1));
      });
      createdRows.push(inputHeading);
      createdRows.push(...inputRows);
      createdRows.push(outputHeading);
      createdRows.push(...outputRows);
      return createdRows;
    }
    static assignDimensionsToRows(
      rows,
      rowWidth = this.ROW_WIDTH,
      rowHeight = this.ROW_HEIGHT
    ) {
      rows.forEach((row) =>
        row.setDimensions(new Dimension(rowWidth, rowHeight))
      );
      return rows;
    }
    static assignPositionsToRows(
      rows,
      rowHeight = LayoutInspector.ROW_HEIGHT,
      xInspectorLeft = 0,
      yInspectorTop = 0,
      yTableOffset = this.Y_FIRST_ROW_OFFSET
    ) {
      rows.forEach((row, index) =>
        row.setPosition(
          LayoutInspector.calcRowPosition(
            index,
            rowHeight,
            xInspectorLeft,
            yInspectorTop,
            yTableOffset
          )
        )
      );
      return rows;
    }
    static calcRowPosition(
      rowNum,
      rowHeight,
      xInspectorLeft = 0,
      yInspectorTop = 0,
      yTableOffset = 0
    ) {
      const yCalc = yInspectorTop + rowNum * rowHeight + yTableOffset;
      console.log("yCalc", yCalc);
      const rowPos = new Position(xInspectorLeft, yCalc);
      return rowPos;
    }
    static setParameterDimensions(parameter, inspector) {
      parameter.setDimensions(
        new Dimension(inspector.dimensions.width, this.ROW_HEIGHT)
      );
    }
  }

  // private static rowCount = 0;
  LayoutInspector.DEFAULT_INSPECTOR_WIDTH = 600;
  LayoutInspector.DEFAULT_INSPECTOR_HEIGHT = 300;

  // SPIRAL 3 TODO: Make panel draggable using title bar
  LayoutInspector.X_POSITION = 10;
  LayoutInspector.Y_FIRST_ROW_OFFSET = 30;
  LayoutInspector.ROW_HEIGHT = 30;
  LayoutInspector.ROW_WIDTH = 600;
  LayoutInspector.Y_TABLE_START = 20;

  // Parameter row constants
  LayoutInspector.PARAM_NAME_COLUMN_WIDTH = 150;

  // public static readonly PARAM_VALUE_COLUMN_WIDTH = 150;
  LayoutInspector.instance = null;
  LayoutInspector.position = new Position(0, 0);
  LayoutInspector.dimensions = new Dimension(0, 0);

  // TODO: paging, num rows to display
  class InspectorTable {
    constructor(node) {
      const inputs = node.getInputParameterList();
      const outputs = node.getOutputParameterList();
      this.numCols = 2;
      this.rows = this.buildTable(inputs, outputs);
    }
    getNumRows() {
      return this.rows.length;
    }
    getNumCols() {
      return this.numCols;
    }
    buildTable(inputParams, outputParams) {
      const rows = LayoutInspector.createRowsFromInputAndOutputParameters(
        inputParams,
        outputParams
      );
      LayoutInspector.assignDimensionsToRows(rows);
      LayoutInspector.assignPositionsToRows(rows);
      return rows;
    }
    getRow(rowNum) {
      if (this.rows[rowNum] instanceof InspectorHeadingRow) {
        return this.rows[rowNum];
      }
      if (this.rows[rowNum] instanceof InspectorInfoRow) {
        return this.rows[rowNum];
      }
      return null;
    }
    toString() {
      var _a;
      let str = "";
      for (let i = 0; i < this.rows.length; i++) {
        str +=
          ((_a = this.rows[i]) === null || _a === void 0
            ? void 0
            : _a.toString()) + "\n";
      }
      return str;
    }
  }

  // TODO: Create panel model that is collapsible
  class InspectorModel extends GuiElementModel {
    // TODO: Use InspectorLayout to set position and dimensions
    constructor() {
      super(
        true,
        false, // _isDraggable: fixed for now, might make this draggable later
        false, // _isResizable: future feature
        false, // _isSelectable: future feature
        LayoutInspector.getPosition(),
        LayoutInspector.getDimensions()
      );

      // private parameterSet: any[] = [];
      this.type = "Inspector";
      this.displayedParamSet = [];
      this.isCollapsed = false;
      this.inspectorTable = null;
    }

    // TODO: ****** set up table using node params
    // TODO: test this
    createTable(node) {
      this.inspectorTable = new InspectorTable(node);
    }
    getTable() {
      return this.inspectorTable;
    }
    clickAction() {
      console.log("inspector pane clicked");
    }
    rolloverAction() {
      // do nothing
    }
    doubleClickAction() {
      // do nothing
    }
  }

  class ToolModel extends DraggableGuiElementModel {
    doubleClickAction() {
      throw new Error("Method not implemented.");
    }
    constructor(
      name,
      icon,
      objectType, // describes object to create
      position = null,
      dimensions = null,
      type = "Tool"
    ) {
      super(position, dimensions, false);
      this.name = name;
      this.type = type;
      this.name = name;
      this.icon = icon;
      this.objectType = objectType;
      this.setUpBoundary();
    }
    getName() {
      return this.name;
    }
    getIcon() {
      return this.icon;
    }
    getObjectType() {
      return this.objectType;
    }
    clickAction() {
      console.log("tool clicked");
    }
    dragToPosition(position) {
      // throw(new Error('hit dragToPosition in ToolModel'));
      // console.warn('SHOULD HIT in TM -- tool dragged to position:  ', position);
      this.setPosition(position);
    }

    // override toString()
    toString() {
      return `Tool: ${this.name}, ${this.icon}, ${this.objectType},\n\tPos: ${this.position},\n\tDim:${this.dimensions}`;
    }
  }

  class ToolboxModel extends GuiElementModel {
    doubleClickAction() {
      throw new Error("Method not implemented.");
    }
    constructor() {
      super(
        true,
        false, // _isDraggable: fixed for now, might make this draggable later
        false, // _isResizable: future feature
        false, // _isSelectable: future feature
        new Position(600, 10),
        new Dimension(190, 580)
      );
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
      if (!pos) return 0;
      return pos.x + 95;
    }

    // ~80
    static findFirstRowOffsetY(tbm) {
      const pos = tbm.getPosition();
      if (!pos) return 0;
      const FIRST_ROW_OFFSET_Y = 30 + pos.y;
      return FIRST_ROW_OFFSET_Y;
    }

    // Center of [rowNum] (Y)
    static findRowCenterLineY(tbm, row) {
      const firstRowOffsetY = this.findFirstRowOffsetY(tbm);
      return firstRowOffsetY + row * this.ROW_SPACING;
    }
    static calcNumToolGridColumns() {
    // tbm: ToolboxModel
      return 2;
    }
    static calcNumToolGridRows() {
    // tbm: ToolboxModel
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
        tool.setPosition(
          new Position(
            OFFSET_X + this.position.x + 90 * (i % 2), // - (toolWidth + 10) + ((i % 2)*(toolWidth + 10))
            this.position.y + FIRST_ROW_Y + Math.floor(i / 2) * 50
          )
        );
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
      const isOver =
        mouseX >= boundary.getLeft() &&
        mouseX <= boundary.getRight() &&
        mouseY >= boundary.getTop() &&
        mouseY <= boundary.getBottom();
      return isOver;
    }

    // override toString
    toString() {
      return "ToolboxModel";
    }
  }
  ToolboxModel.ROW_SPACING = 60;

  class Layout {
    constructor(width, height) {
      Layout.width = width;
      Layout.height = height;
      Layout.positionPanel(ApplicationModel.getInstance().getInspector());
      Layout.positionPanel(ApplicationModel.getInstance().getToolbox());
    }
    static resizeCanvas(width, height) {
      this.width = width;
      this.height = height;
    }
    static calcInspectorPosition(inspector) {
      if (inspector === null) {
        return;
      }
      const inspectorWidth = 600;
      const inspectorHeight = 300;
      inspector.setDimensions(new Dimension(inspectorWidth, inspectorHeight));
      console.log("Layout.height : " + Layout.height);
      const inspectorPosition = new Position(
        10,
        this.height - (inspectorHeight + 10)
      );
      inspector.setPosition(inspectorPosition);
    }
    static positionToolboxAndTools(toolbox, screenWidth) {
      if (toolbox === null) {
        return;
      }
      const dim = toolbox.getDimensions();
      if (dim === null) {
        return;
      }
      const toolboxWidth = dim.width;

      // const toolboxHeight = dim.height;
      const toolboxPosition = new Position(
        screenWidth - (toolboxWidth + 10),
        10
      );
      toolbox.setPosition(toolboxPosition);

      // Position tools
      const toolList = toolbox.getToolList();
      if (toolList === null) {
        return;
      }
      const toolCount = toolList.length;
      for (let i = 0; i < toolCount; i++) {
        const tool = toolList[i];
        const toolDim = tool.getDimensions();
        if (toolDim === null) {
          return;
        }

        // const toolWidth = toolDim.width;
        // const toolHeight = toolDim.height;
        const OFFSET_X = 10;
        const FIRST_ROW_Y = 40;
        tool.setPosition(
          new Position(
            OFFSET_X + toolboxPosition.x + 90 * (i % 2), // - (toolWidth + 10) + ((i % 2)*(toolWidth + 10))
            toolboxPosition.y + FIRST_ROW_Y + Math.floor(i / 2) * 50
          )
        );
      }
    }
    static positionPanel(element) {
      if (this.width === 0 || this.height === 0) {
        throw new Error("Layout dimensions are not set");
      }
      if (element instanceof ToolboxModel) {
        Layout.positionToolboxAndTools(element, this.width);
      }
      if (element instanceof InspectorModel) {
        Layout.calcInspectorPosition(element);
      }
    }

    // Boilerplate getters and setters
    static createInstance(width, height) {
      if (Layout.instance === null) {
        Layout.instance = new Layout(width, height);
      }
      return Layout.instance;
    }
    static getInstance() {
      if (Layout.instance === null) {
        Layout.instance = new Layout(0, 0);
      }
      return Layout.instance;
    }
    static getDistance(position1, position2) {
      const x = position1.x - position2.x;
      const y = position1.y - position2.y;
      return Math.sqrt(x * x + y * y);
    }
    static getWidth() {
      return Layout.width;
    }
    static getHeight() {
      return Layout.height;
    }
  }
  Layout.instance = null;
  Layout.BASE_NODE_WIDTH = 100;
  Layout.BASE_NODE_HEIGHT = 50;
  Layout.width = 0;
  Layout.height = 0;

  class PlugModel extends DraggableGuiElementModel {
    doubleClickAction() {
      throw new Error("Method not implemented.");
    }
    constructor(plugPosition, position, isHighlit = false) {
      super(
        position,
        null, // dimensions are null for plugs
        false // not resizable
      );
      this.plugPosition = plugPosition;
      this.isHighlit = isHighlit;

      // Edge that this plug is plugged into (null if not plugged in)
      this.type = "Plug";
      this.plugSocket = null;
      this.plugPosition = plugPosition;
      this.position = position;
    }
    dragToPosition(position) {
      // drag will connect to another plug
      throw new Error("Method not implemented.");
    }
    clickAction() {
      throw new Error("Method not implemented.");
    }

    // override superclass method
    checkBoundary(mouseX, mouseY) {
      if (this.position !== null) {
        const distance = Layout.getDistance(
          this.position,
          new Position(mouseX, mouseY)
        );
        return distance < 15;
      }
      return false;
    }
    plugIn(edge) {
      this.plugSocket = edge;
    }
    toString() {
      return `Plug: ${this.plugPosition}, position: ${this.position}, plugSocket: ${this.plugSocket}`;
    }

    // setIsSelected(isSelected=true):void {
    //   this.isSelected = isSelected;
    // }
    // getIsSelected():boolean {
    //   return this.isSelected;
    // }
    setIsHighlit(isHighlit = true) {
      this.isHighlit = isHighlit;
    }
    getIsHighlit() {
      return this.isHighlit;
    }
  }

  const PlugPosition = {
    type: "PlugPosition",
    N: "N",
    S: "S",
    E: "E",
    W: "W",
    NE: "NE",
    NW: "NW",
    SE: "SE",
    SW: "SW",
  };

  class NodeModel extends DraggableGuiElementModel {
    // protected parameterList:ParameterModel[] = [];
    constructor(
      id,
      label,
      position,
      dimensions,
      inputParameterList = [],
      outputParameterList = []
    ) {
      super(position, dimensions);
      this.id = id;
      this.label = label;
      this.position = position;
      this.dimensions = dimensions;
      this.inputParameterList = inputParameterList;
      this.outputParameterList = outputParameterList;
      this.type = "Node";
      this.showNodes = false;
      this.isHighlit = false;
      this.isEditing = false;
      this.id = id;
      this.label = label;
      this.position = position;
      this.dimensions = dimensions;
      this.plugs = this.createPlugs();
      this.setUpBoundary();
    }
    getBoundary() {
      return super.getBoundary();
    }
    createPlugs() {
      const plugArray = [];
      const plugPositions = [
        PlugPosition.NW,
        PlugPosition.SW,
        PlugPosition.SE,
        PlugPosition.NE,
        PlugPosition.N,
        PlugPosition.S,
        PlugPosition.E,
        PlugPosition.W,
      ];
      for (let i = 0; i < 8; i++) {
        const addPlug = new PlugModel(
          plugPositions[i],
          this.getPlugPosition(plugPositions[i])
        );
        plugArray.push(addPlug);
      }
      return plugArray;
    }
    getIsEditing() {
      return this.isEditing;
    }
    setLabel(newLabel) {
      this.label = newLabel;
    }
    setIsEditing(isEditing) {
      this.isEditing = isEditing;
    }

    // NOT USED (yet)
    // deselect():void {
    //   this.isSelected = false;
    // }
    getIsSelected() {
      return this.isSelected;
    }
    getPlugPosition(plugPosition) {
      const x = this.position.x;
      const y = this.position.y;
      const width = this.dimensions.width;
      const height = this.dimensions.height;
      switch (plugPosition) {
        case PlugPosition.NW:
          return new Position(x + 3, y);
        case PlugPosition.N:
          return new Position(x + 3 + width / 2, y);
        case PlugPosition.NE:
          return new Position(x + 3 + width, y);
        case PlugPosition.SW:
          return new Position(x + 3, y + height);
        case PlugPosition.S:
          return new Position(x + 3 + width / 2, y + height);
        case PlugPosition.SE:
          return new Position(x + 3 + width, y + height);
        case PlugPosition.W:
          return new Position(x + 3, y + height / 2);
        case PlugPosition.E:
          return new Position(x + 3 + width, y + height / 2);
        default:
          return new Position(0, 0);
      }
    }
    highlightClosestPlug(mouseX, mouseY) {
      this.plugs.forEach((plug) => {
        plug.setIsHighlit(false);
      });
      const closestPlug = this.getPlugClosestToMouse(mouseX, mouseY);
      if (closestPlug) {
        closestPlug.setIsHighlit();
      }
    }
    getPlugClosestToMouse(mouseX, mouseY) {
      let closestPlug = null;
      let closestDistance = 100000;
      for (let i = 0; i < this.plugs.length; i++) {
        const plug = this.plugs[i];
        const distance = plug.position.getDistance(
          new Position(mouseX, mouseY)
        );
        if (distance < closestDistance) {
          closestDistance = distance;
          closestPlug = plug;
        }
      }
      return closestPlug;
    }
    getID() {
      return this.id;
    }
    getLabel() {
      return this.label;
    }
    getShowNodes() {
      return this.showNodes;
    }
    getPlugs() {
      return this.plugs;
    }
    getSelectedPlugs() {
      return this.plugs.filter((plug) => plug.getIsSelected());
    }
    getPlugByPosition(plugPosition) {
      return this.plugs.find((plug) => plug.plugPosition === plugPosition);
    }
    setIsRolledOver(isRolledOver = true) {
      this.isRolledOver = isRolledOver;
    }
    getIsRolledOver() {
      return this.isRolledOver;
    }

    // override GUIElementModel
    rolloverAction() {
      this.isRolledOver = true;
      this.isHighlit = true;
      throw "NodeModel rolloverAction not implemented";
    }

    // override GUIElementModel
    clickAction() {
      console.log("clickAction: ");
      console.log("this: ", this);
      this.isSelected = true;
      this.isHighlit = true;
      const inspector = ApplicationModel.getInstance().getInspector();
      inspector.createTable(this);
      console.log("NodeModel onClick", this.toString());
    }

    // override GUIElementModel
    doubleClickAction() {
      this.isEditing = true;
      ApplicationModel.setEditTarget(this);
      console.log("NodeModel doubleClickAction", this.toString());
    }

    // override setUpBoundary
    setUpBoundary() {
      super.setUpBoundary(10);
    }

    // override GUIElementModel
    setIsDragging(isDragging) {
      this.setCursor(isDragging);
      this.isDragging = isDragging;
      this.plugs.forEach((plug) => {
        plug.setIsDragging(true);
      });
    }
    dragToPosition(position) {
      // console.log(`NodeModel dragToPosition ${position.toString()}`);
      const lastPosition = this.position;
      this.position = position;
      const deltaX = position.x - lastPosition.x;
      const deltaY = position.y - lastPosition.y;
      this.setUpBoundary();
      this.plugs.forEach((plug) => {
        if (plug !== null) {
          plug.setPosition(
            new Position(plug.position.x + deltaX, plug.position.y + deltaY)
          );
        }
      });
    }
    getInputParameterList() {
      return this.inputParameterList;
    }
    getOutputParameterList() {
      return this.outputParameterList;
    }
    addInputParameter(inputParameter) {
      this.inputParameterList.push(inputParameter);
    }
    addOutputParameter(outputParameter) {
      this.outputParameterList.push(outputParameter);
    }
    setInputParameterList(inputParameterList) {
      this.inputParameterList = inputParameterList;
    }
    setOutputParameterList(outputParameterList) {
      this.outputParameterList = outputParameterList;
    }
    getSelectedParameters() {
      return [...this.inputParameterList, ...this.outputParameterList].filter(
        (parameter) => parameter.getIsSelected()
      );
    }
    areParamsSelected() {
      return this.getSelectedParameters().length > 0;
    }
    toString() {
      return `NodeModel: ${this.id} ${
        this.label
      } ${this.position.toString()} ${this.dimensions.toString()}`;
    }
    toDyreqtJson() {
      throw new Error("NodeModel-- toDyreqtJson: not yet implemented");
    }
  }

  class Parameter extends GuiElementModel {
    constructor(name, value, units = null) {
      super(true, false, false, true);
      this.isHighlit = false;
      this.editingField = null;
      this.typeColor = "blue";
      this.name = name;
      this.value = value;
      this.units = units;
    }
    getName() {
      return this.name;
    }
    getValue() {
      return this.value;
    }
    getUnits() {
      return this.units;
    }
    getEditingField() {
      return this.editingField;
    }
    setValue(value) {
      this.value = value;
    }
    setUnits(units) {
      this.name = `${this.name} (${units})`;
    }
    setEditingField(pft) {
      this.editingField = pft;
    }
    clickAction() {
      this.isSelected = true;
      this.isHighlit = true;
    }
    doubleClickAction() {
      this.editingField = this.value;
      if (this.editingField) {
        this.typeColor = "red";
      }
    }
    toJson() {
      return JSON.stringify(this);
    }
    toString() {
      let outputString = `Parameter: ${this.name}, value: ${this.value}`;
      if (this.units !== null) {
        outputString += `, units: ${this.units}`;
      }
      return outputString;
    }
  }

  class InputParameterModel extends Parameter {
    constructor(name, value, units = null) {
      super(name, value, units);
      this.type = "InputParameter";
    }
  }

  class OutputParameterModel extends Parameter {
    constructor(name, value, units = null) {
      super(name, value, units);
      this.type = "OutputParameter";
    }
  }

  // import { nodes } from "../draw";
  // const BASE_NODE_WIDTH = Layout.BASE_NODE_WIDTH;
  // const BASE_NODE_HEIGHT = Layout.BASE_NODE_HEIGHT;
  class CreationManager {
    // on drag and drop, create new node
    static createNewObjectFromDynamicTool(dynamicTool) {
      const objectsNewPos =
        dynamicTool === null || dynamicTool === void 0
          ? void 0
          : dynamicTool.getPosition();
      const objectsNewDim =
        dynamicTool === null || dynamicTool === void 0
          ? void 0
          : dynamicTool.getDimensions();

      // const objectType = dynamicTool?.getObjectType();
      // get object types from looking at where tools are created
      // need to have a master list of new object types
      // Element, Subelement, Edge
      return new NodeModel("69", "new node", objectsNewPos, objectsNewDim);
    }
    constructor() {
      // CreationManager.populateNodeAndEdgeList();
    }

    // RENDER (Testing HTML Component render)
    static createContainer(p, parent) {
      const container = document.createElement("div");
      container.setAttribute(
        "style",
        "position: absolute; top: 100px; left: 100px; background: #f00; width: 10px; height: 10px;"
      );
      parent.appendChild(container);
      return { container };
    }

    // TODO: not called currently, use as interface for Dyreqt data
    static createNodeModel(id, label, position, dimension) {
      return new NodeModel(id, label, position, dimension);
    }
    createPlug(plugPosition, position) {
      return new PlugModel(plugPosition, position);
    }
    static populateNodeAndEdgeList() {
      // const nodeData = generatedNodeData();
      const nodes = CreationManager.createNodes();
      const edges = [];

      // const edges = CreationManager.createEdges(nodes);
      return {
        nodes,
        edges,
      };
    }
    static createNodes() {
      const nodes = [];
      const labels = ["Solar Array", "Cable", "Avionics", "Radiator"];
      const inputParameterList = [
        new InputParameterModel("parameter1", 1000 * Math.random(), "meters"),
        new InputParameterModel("parameter2", 69 * Math.random(), null),
        new InputParameterModel("fuel", 420 * Math.random(), "grams"),
        new InputParameterModel(
          "Another fourth param",
          "aStringValue: " + (Math.random() * 99999).toFixed(3),
          "count"
        ),
      ];
      const outputParameterList = [
        new OutputParameterModel("parameter1", 0.5 * Math.random(), "meters"),
        new OutputParameterModel("parameter2", 6.9 * Math.random(), null),
        new OutputParameterModel("fuelRemaining", 2 * Math.random(), "grams"),
        new OutputParameterModel(
          "Another fourth param",
          "aStringValue: " + (Math.random() * 999).toFixed(3),
          "count"
        ),
      ];
      for (let i = 0; i < 4; i += 1) {
        const id = (i + 1).toString();
        const label = labels[i];
        const position = new Position(10 + i * 150 + 10 * i, 20);
        const dimension = new Dimension(100, 50);
        const node = new NodeModel(
          id,
          label,
          position,
          dimension,
          inputParameterList,
          outputParameterList
        );
        nodes.push(node);
      }
      return nodes;
    }
    static createEdges(nodes) {
      const firstNode1 = nodes[0];
      const secondNode1 = nodes[1];
      const firstPlug1 = firstNode1.getPlugByPosition("E");
      const secondPlug1 = secondNode1.getPlugByPosition("W");
      const oneEdge = new EdgeModel(
        "e0-1",
        firstNode1,
        secondNode1,
        firstPlug1,
        secondPlug1
      );
      const firstNode2 = nodes[1];
      const secondNode2 = nodes[2];
      const firstPlug2 = firstNode2.getPlugByPosition("E");
      const secondPlug2 = secondNode2.getPlugByPosition("W");
      const anotherEdge = new EdgeModel(
        "e1-2",
        firstNode2,
        secondNode2,
        firstPlug2,
        secondPlug2
      );
      const firstNode3 = nodes[2];
      const secondNode3 = nodes[3];
      const firstPlug3 = firstNode3.getPlugByPosition("E");
      const secondPlug3 = secondNode3.getPlugByPosition("W");
      const yetAnotherEdge = new EdgeModel(
        "e2-3",
        firstNode3,
        secondNode3,
        firstPlug3,
        secondPlug3
      );
      return [oneEdge, anotherEdge, yetAnotherEdge];
    }
    static createInstance() {
      if (!CreationManager.instance) {
        CreationManager.instance = new CreationManager();
      }
      return CreationManager.instance;
    }
    static getInstance() {
      if (!CreationManager.instance) {
        throw new Error("CreationManager instance is not created yet");
      }
      return CreationManager.instance;
    }
  }

  class ApplicationModel {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
      this.nodes = [];
      this.edges = [];
      this.toolbox = new ToolboxModel();
      this.inspector = new InspectorModel();
      this.dynamicTool = null;

      // getRolledOverObjects
      this.rolledOverObjects = [];
      this.initializeForDev();
    }

    // FOR DEVELOPMENT TESTING
    initializeForDev() {
      this.nodes = CreationManager.createNodes();

      // this.edges = CreationManager.createEdges(this.nodes);
      this.edges = [];
    }
    static addCharacterToEditTarget(key) {
      if (this.editTarget === null) return;
      this.editTarget.setLabel(this.editTarget.getLabel() + key);
    }
    static backspaceEditTarget() {
      console.log("backspace");
      if (this.editTarget === null) return;
      console.log("deleting last character:");
      const labelContent = this.editTarget.getLabel();
      console.log("labelContent = ", labelContent);
      const bsLabelContent = labelContent.slice(0, -1);
      console.log("bsLabelContent = ", bsLabelContent);
      this.editTarget.setLabel(bsLabelContent);
    }
    static getEditTarget() {
      return ApplicationModel.editTarget;
    }
    static setEditTarget(editingString) {
      ApplicationModel.editTarget = editingString;
    }
    addNode(node) {
      this.nodes.push(node);
    }
    removeNode(node) {
      const index = this.nodes.indexOf(node);
      if (index > -1) {
        this.nodes.splice(index, 1);
      }
    }
    addEdge(edge) {
      this.edges.push(edge);
    }
    removeEdge(edge) {
      const index = this.edges.indexOf(edge);
      if (index > -1) {
        this.edges.splice(index, 1);
      }
    }

    // GETTERS
    getSelectedNodes() {
      return this.nodes.filter((node) => node.getIsSelected());
    }
    getSelectedEdges() {
      return this.edges.filter((edge) => edge.getIsSelected());
    }
    getSelectedPlugs() {
      const selectedPlugs = [];
      this.nodes.forEach((node) => {
        selectedPlugs.push(...node.getSelectedPlugs());
      });
      return selectedPlugs;
    }
    getSelectedParameters() {
      const selectedParameters = [];
      this.nodes.forEach((node) => {
        selectedParameters.push(...node.getSelectedParameters());
      });
      return selectedParameters;
    }
    getRolledOverNodes() {
      return this.nodes.filter((node) => node.getIsRolledOver());
    }
    getNodes() {
      return this.nodes;
    }
    getEdges() {
      return this.edges;
    }
    getInspector() {
      return this.inspector;
    }
    getToolbox() {
      return this.toolbox;
    }
    static createInstance() {
      if (ApplicationModel.instance === null) {
        ApplicationModel.instance = new ApplicationModel();
      }
      return ApplicationModel.instance;
    }
    static getInstance() {
      if (ApplicationModel.instance === null) {
        console.warn("ApplicationModel instance is null");
        ApplicationModel.instance = new ApplicationModel();
      }
      return ApplicationModel.instance;
    }
    getDynamicTool() {
      return this.dynamicTool;
    }

    // SETTERS
    setDynamicTool(dtool) {
      this.dynamicTool = dtool;
    }
    setDynamicSlot(dt) {
      this.dynamicTool = dt;
    }

    // OVERLOADS
    toString() {
      let returnStr = `ApplicationModel:\n\t${this.nodes.length} nodes,\n\t${this.edges.length}\n`;
      returnStr += "NODES: [\n\t";
      this.nodes.forEach((node) => {
        returnStr += `\t${node.toString()},\n`;
      });
      returnStr += "]\nEDGES: [\n\t";
      this.edges.forEach((edge) => {
        returnStr += `\t${edge.toString()},\n`;
      });
      returnStr += "";
      return returnStr;
    }
  }
  ApplicationModel.instance = null;
  ApplicationModel.editTarget = null;

  class KeyboardManager {
    // 9 - Tab
    // 13 - Enter
    // 16-18 - Shift, Ctrl, Alt
    // 20 - CapsLock
    // 27 - Escape
    // 37-40 - arrow keys
    // 91-93 - left WIN, right WIN, popup
    // 112-123 - F1-F12
    // 12 - NumPad 5
    // 32 - Space
    static isNonPrintingCharacter(keyCode) {
      if (keyCode === 12) {
        return false;
      } // NumPad 5
      if (keyCode === 13) {
        return false;
      } // Enter
      if (keyCode === 32) {
        return false;
      } // Space
      return (
        keyCode <= 47 ||
        (keyCode >= 91 && keyCode <= 93) || // left WIN, right WIN, popup
        (keyCode >= 112 && keyCode <= 123) // F1-F12 keys
      );
    }
    static handleKeyPress(keyCode, key) {
      if (ApplicationModel.getEditTarget()) {
        // console.log('keyTyped', keyCode)
        if (keyCode === 13) {
          ApplicationModel.setEditTarget(null);
        }
        if (keyCode === 13 || keyCode === 8) {
          // console.log('hit backspace');
          ApplicationModel.backspaceEditTarget();
        }
        if (this.isNonPrintingCharacter(keyCode)) {
          return;
        } else {
          ApplicationModel.addCharacterToEditTarget(key);
        }
      }
    }
  }

  class RolloverManager {
    static checkForRollover(mouseX, mouseY, appModel) {
      // console.log(`MouseManager.mouseMoved(): mouseX: ${mouseX}, mouseY: ${mouseY}`);
      // Check all elements for rollover
      const foundPlug = this.checkForPlugRollover(mouseX, mouseY, appModel);
      if (foundPlug) {
        return;
      }
      const foundParam = this.checkForParamRollover(mouseX, mouseY, appModel);
      if (foundParam) {
        return;
      }
      const foundTool = this.checkForToolsRollover(mouseX, mouseY, appModel);
      if (foundTool) {
        return;
      }
      const foundNode = this.checkForNodeRollover(mouseX, mouseY, appModel);
      if (foundNode) {
        return;
      }
      const foundEdge = this.checkForEdgeRollover(mouseX, mouseY, appModel);
      if (foundEdge) {
        return;
      }

      // Toolbox
      if (appModel.getToolbox().checkBoundary(mouseX, mouseY)) {
        console.warn(`MouseManager.mouseMoved(): toolbox->setIsRolledOver()}]`);
        appModel.getToolbox().setIsRolledOver();
      }

      // Inspector
      if (appModel.getInspector().checkBoundary(mouseX, mouseY)) {
        console.warn(
          `MouseManager.mouseMoved(): inspector->setIsRolledOver()}]`
        );
        appModel.getInspector().setIsRolledOver();
      }
    }
    static checkForPlugRollover(mouseX, mouseY, appModel) {
      let foundPlug = false;
      appModel.getNodes().forEach((node) => {
        node.getPlugs().forEach((plug) => {
          if (plug.checkBoundary(mouseX, mouseY)) {
            console.warn(
              `MouseManager.mouseMoved(): plug.setIsRolledOver(): [\n\t${plug}\n\t]()}]`
            );
            plug.setIsRolledOver();
            foundPlug = true;
          } else {
            plug.setIsRolledOver(false);
          }
        });
      });
      return foundPlug;
    }
    static checkForParamRollover(mouseX, mouseY, appModel) {
      let foundParam = false;

      // Input Params
      appModel.getSelectedNodes().forEach((node) => {
        node.getInputParameterList().forEach((inputParam) => {
          if (inputParam.checkBoundary(mouseX, mouseY)) {
            console.warn(
              `MouseManager.mouseMoved(): inputParam->setIsRolledOver(): [\n\t${inputParam}\n\t]()}]`
            );
            inputParam.setIsRolledOver();
            foundParam = true;
          } else {
            inputParam.setIsRolledOver(false);
          }
        });
      });

      // Output Params
      appModel.getSelectedNodes().forEach((node) => {
        node.getInputParameterList().forEach((outputParam) => {
          if (outputParam.checkBoundary(mouseX, mouseY)) {
            console.warn(
              `MouseManager.mouseMoved(): outputParam->setIsRolledOver(): [\n\t${outputParam}\n\t]()}]`
            );
            outputParam.setIsRolledOver();
            foundParam = true;
          } else {
            outputParam.setIsRolledOver(false);
          }
        });
      });
      return foundParam;
    }
    static checkForNodeRollover(mouseX, mouseY, appModel) {
      let foundNode = false;

      // Nodes
      appModel.getNodes().forEach((node) => {
        if (node.checkBoundary(mouseX, mouseY)) {
          console.warn(
            `MouseManager.mouseMoved(): getNodes->setIsRolledOver(): [\n\t${node}\n\t]()}]`
          );
          foundNode = true;
          node.setIsRolledOver();
        } else {
          node.setIsRolledOver(false);
        }
      });
      return foundNode;
    }
    static checkForToolsRollover(mouseX, mouseY, appModel) {
      let foundTool = false;

      // Tools
      appModel
        .getToolbox()
        .getToolList()
        .forEach((tool) => {
          if (tool.checkBoundary(mouseX, mouseY)) {
            console.warn(
              `MouseManager.mouseMoved(): getToolList->setIsRolledOver(): [\n\t${tool}\n\t]()}]`
            );
            foundTool = true;
            tool.setIsRolledOver();
          } else {
            tool.setIsRolledOver(false);
          }
        });
      return foundTool;
    }
    static checkForEdgeRollover(mouseX, mouseY, appModel) {
      const foundEdge = false;

      // Edges
      appModel.getEdges().forEach((edge) => {
        if (edge.checkBoundary(mouseX, mouseY)) {
          console.warn(
            `MouseManager.mouseMoved(): getToolList->setIsRolledOver(): [\n\t${edge}\n\t]()}]`
          );
          edge.setIsRolledOver();
        } else {
          edge.setIsRolledOver(false);
        }
      });
      return foundEdge;
    }
  }

  class ClickManager {
    static checkElementsForClick(mouseX, mouseY, appModel) {
      const nodes = appModel.getNodes();
      let foundParam = false;

      // Params currently added to inspector
      if (appModel) {
        foundParam = this.checkForClickOnParam(mouseX, mouseY, appModel);

        // TODO: Deal with potential for more than one selected node
        // END Check for click on param
        if (foundParam) {
          return;
        }
        nodes.forEach((n) => {
          this.checkForSelectPlug(mouseX, mouseY, n);
          this.checkForSelectNode(mouseX, mouseY, appModel);
        });
      }
    }

    // TODO: Rename or simplify
    static checkForSelectParam(mouseX, mouseY, pm) {
      // const p = ApplicationModel.getP() as p5;
      let pmClicked = null;
      if (pm.checkBoundary(mouseX, mouseY)) {
        pm.setIsSelected();
        pmClicked = pm;
      }
      return pmClicked;
    }
    static checkForSelectPlug(mouseX, mouseY, n) {
      const plugs = n.getPlugs();

      // const p = ApplicationModel.getP() as p5;
      plugs.forEach((plug) => {
        if (plug.checkBoundary(mouseX, mouseY)) {
          plug.setIsSelected();
        }
      });
    }

    // Move to InteractionManager?
    static checkForClickOnParam(mouseX, mouseY, appModel) {
      let foundParam = false;
      const params = [];

      // Check for click on param
      const selectedNodes = appModel.getSelectedNodes();
      if (selectedNodes && selectedNodes.length > 0) {
        const inputParams = selectedNodes[0].getInputParameterList();
        const outputParams = selectedNodes[0].getOutputParameterList();
        params.push(...inputParams);
        params.push(...outputParams);
        console.log(`params.length: ${params.length}`);
        for (let i = 0; i < params.length; i += 1) {
          const nextParam = params[i];
          if (nextParam === undefined) {
            continue;
          }
          foundParam =
            this.checkForSelectParam(mouseX, mouseY, nextParam) !== null;

          // if (foundParam) { console.warn("FOUND PARAM, length is now: " + selectedNodes[0]?.getSelectedParameters().length); }
        }
      }
      return foundParam;
    }

    // INTERACTION
    // selectedNodes includes node to check if selected
    static checkForSelectNode(mouseX, mouseY, appModel) {
      console.log("checkForSelectNode");
      const nodes = appModel.getNodes();
      const mousePosition = new Position(mouseX, mouseY);
      for (let i = 0; i < nodes.length; i += 1) {
        if (nodes[i] !== null && nodes[i] !== undefined) {
          const node = nodes[i];
          if (node.areParamsSelected() === false) {
            node.setIsSelected(false);
          }
          if (node.checkBoundary(mousePosition.x, mousePosition.y)) {
            // console.warn("FOUND NODE")
            // node.setIsSelected();
            node.clickAction();
          }
        }
      }
    }
  }

  class DragManager {
    static checkForEdgeDragTargets(appModel) {
      const edgeList = appModel.getEdges();

      // find edge drag targets
      if (edgeList.length > 0) {
        for (let i = 0; i < edgeList.length; i += 1) {
          const edge = edgeList[i];
          if (typeof edge === "undefined") {
            continue;
          }
          if (edge === null) {
            continue;
          }
          if (
            edge === null || edge === void 0 ? void 0 : edge.getIsRolledOver()
          ) {
            return edge;
          }
        }
      }
      return null;
    }
    static checkForPlugDragTargets(appModel) {
      const plugList = appModel.getNodes().flatMap((node) => node.getPlugs());

      // find plug drag targets
      if (plugList.length > 0) {
        for (let i = 0; i < plugList.length; i += 1) {
          const plug = plugList[i];
          if (typeof plug === "undefined") {
            continue;
          }
          if (plug === null) {
            continue;
          }
          if (plug.getIsRolledOver()) {
            return plug;
          }
        }
      }
      return null;
    }
    static checkForNodeDragTargets(appModel) {
      const nodeList = appModel.getNodes();

      // find node drag targets
      if (nodeList.length > 0) {
        for (let i = 0; i < nodeList.length; i += 1) {
          const node = nodeList[i];
          if (typeof node === "undefined") {
            continue;
          }
          if (node === null) {
            continue;
          }
          if (
            node === null || node === void 0 ? void 0 : node.getIsRolledOver()
          ) {
            return node;
          }
        }
      }
      return null;
    }
    static checkForToolsDragTargets(appModel) {
      // check tools for drag targets
      const toolbox = appModel.getToolbox();
      if (toolbox) {
        if (toolbox.getIsRolledOver()) {
          const toolList = toolbox.getToolList();

          // toolList.forEach((tool) => {
          for (let i = 0; i < toolList.length; i += 1) {
            const tool = toolList[i];
            if (tool.getIsRolledOver()) {
              return tool;
            }
          }
        }
      }
      return null;
    }

    // INTERACTION (MOUSE)
    static clearDragTargets(appModel) {
      // const appModel:ApplicationModel = (ChartManager.getApplicationModel() as ApplicationModel);
      appModel.getNodes().forEach((node) => {
        node.setIsDragging(false);
        node.getPlugs().forEach((plug) => plug.setIsDragging(false));
      });
      appModel.getEdges().forEach((edge) => edge.setIsDragging(false));
      appModel
        .getToolbox()
        .getToolList()
        .forEach((tool) => tool.setIsDragging(false));
    }

    // INTERACTION (MOUSE)
    static getDragTarget(appModel) {
      // const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
      const tool = DragManager.checkForToolsDragTargets(appModel);
      if (tool) {
        tool.setIsDragging(true);
        return tool;
      }
      const plug = DragManager.checkForPlugDragTargets(appModel);
      if (plug) {
        plug.setIsDragging(true);
        return plug;
      }
      const edge = DragManager.checkForEdgeDragTargets(appModel);
      if (edge) {
        edge.setIsDragging(true);
        return edge;
      }
      const node = DragManager.checkForNodeDragTargets(appModel);
      if (node) {
        node.setIsDragging(true);
        return node;
      }
      return null;
    }
  }

  class MouseManager {
    static mouseMoved(mouseX, mouseY, appModel) {
      RolloverManager.checkForRollover(mouseX, mouseY, appModel);
    }

    // INTERACTION (MOUSE)
    static mouseDragged(mouseX, mouseY, appModel) {
      // console.log(`mouse dragged to : ${p.mouseX}, ${p.mouseY}`);
      DragManager.getDragTarget(appModel);
    }

    // INTERACTION (MOUSE)
    static mouseClicked(mouseX, mouseY, appModel) {
      ClickManager.checkElementsForClick(mouseX, mouseY, appModel);
    }

    // LEFT OFF HERE
    // TODO: Make node editable on double click
    static doubleClicked(mouseX, mouseY, appModel) {
      console.log(`mouse double clicked`);

      // const nodes:NodeModel[] = appModel.getNodes();
    }

    // INTERACTION (MOUSE -- STUB)
    static mousePressed(mouseX, mouseY, appModel) {
      // console.log(`mouse pressed at : ${p.mouseX}, ${p.mouseY}`);
    }

    // INTERACTION (MOUSE)
    static mouseReleased(mouseX, mouseY, appModel) {
      // const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
      if (appModel.getDynamicTool() !== null) {
        const newlyMintedNode = CreationManager.createNewObjectFromDynamicTool(
          appModel.getDynamicTool()
        );
        appModel.getNodes().push(newlyMintedNode);
        appModel.setDynamicTool(null);
      }
      appModel.setDynamicTool(null);

      // if there is a dynamicTool in the slot,
      //  set the dynamicTool to null
      //  then create the new class (has info?)
      DragManager.clearDragTargets(appModel);
    }
  }

  class P5Reference {
    constructor(p) {
      P5Reference.p = p;
    }
    static createInstance(p) {
      P5Reference.instance = new P5Reference(p);
      return P5Reference.instance;
    }
    static getInstance() {
      if (P5Reference.instance === null) {
        throw new Error("P5Reference instance is null");
      }
      return P5Reference.instance;
    }
  }
  P5Reference.instance = null;
  P5Reference.p = null;

  class DynamicToolModel extends ToolModel {
    constructor(
      name,
      icon,
      objectType, // describes object to create
      position = null,
      dimensions = null
    ) {
      super(name, icon, objectType, position, dimensions, "DynamicTool");
    }
  }

  class InteractionManager {
    // INTERACTION
    static resizeCanvas(appModel, windowWidth, windowHeight) {
      // const appModel:ApplicationModel = (ChartManager.applicationModel as ApplicationModel);
      this.repositionElementOnResize(
        appModel === null || appModel === void 0
          ? void 0
          : appModel.getToolbox(),
        windowWidth,
        windowHeight
      );
      this.repositionElementOnResize(
        appModel === null || appModel === void 0
          ? void 0
          : appModel.getInspector(),
        windowWidth,
        windowHeight
      );

      // move Toolbox
      // move Tools
      // move Inspector
    }

    // INTERACTION
    static dragDynamicTool(appModel, pos, tool = null) {
      let dynamicTool = appModel.getDynamicTool();
      if (dynamicTool === null) {
        // CREATE NEW
        dynamicTool = new DynamicToolModel(
          tool === null || tool === void 0 ? void 0 : tool.getName(),
          tool === null || tool === void 0 ? void 0 : tool.getIcon(),
          tool === null || tool === void 0 ? void 0 : tool.getObjectType(),
          tool === null || tool === void 0 ? void 0 : tool.position,
          tool === null || tool === void 0 ? void 0 : tool.dimensions
        );
        appModel.setDynamicTool(dynamicTool);
      }
      dynamicTool.dragToPosition(pos);
    }

    // INTERACTION
    static repositionElementOnResize(element, windowWidth, windowHeight) {
      Layout.resizeCanvas(windowWidth, windowHeight);
      Layout.positionPanel(element);
      return;
    }
  }

  // static getClosestPlugsOnSelectedNode(appModel:ApplicationModel):PlugModel[] {
  //   const selectedNodes = appModel.getSelectedNodes();
  //   // Array for if multiple nodes are selected
  //   // Right now, one at a time is selected, only
  //   const closestPlugArray = [];
  //   if (selectedNodes.length > 0) {
  //     for (let i = 0; i < selectedNodes.length; i += 1) {
  //       const p = ApplicationModel.getP() as p5;
  //       const closestPlug = (selectedNodes[i] as NodeModel).getPlugClosestToMouse(
  //         p.mouseX, p.mouseY
  //       );
  //       closestPlugArray.push(closestPlug);
  //     }
  //   }
  //   return closestPlugArray as PlugModel[];
  // }

  class RenderEdge {
    constructor(p) {
      RenderEdge.p = p;
    }
    static plotConnection(source, target) {
      let sourceDim = source.dimensions;
      if (source instanceof PlugModel) {
        sourceDim = new Dimension(0, 0);
      }
      let targetDim = target.dimensions;
      if (target instanceof PlugModel) {
        targetDim = new Dimension(0, 0);
      }
      const start_x = source.position.x + sourceDim.width / 2;
      const start_y = source.position.y + sourceDim.height / 2;
      const end_x = target.position.x + targetDim.width / 2;
      const end_y = target.position.y + targetDim.height / 2;
      const mid_1x = start_x + (end_x - start_x) / 2;
      const mid_1y = start_y;
      const mid_2x = mid_1x;
      const mid_2y = end_y;
      const mid_1 = new Position(mid_1x, mid_1y);
      const mid_2 = new Position(mid_2x, mid_2y);
      return [
        new Position(start_x, start_y),
        mid_1,
        mid_2,
        new Position(end_x, end_y),
      ];
    }

    // currently, up to three lines are drawn, double L shape
    // TODO: Add label to edge
    static renderLines(positions, strokeColor = "rgb(200,0,0)") {
      const p = RenderEdge.p;
      p.push();
      p.noFill();
      p.strokeWeight(3);
      p.stroke(strokeColor);
      for (let i = 1; i < positions.length; i += 1) {
        const start = positions[i - 1];
        const end = positions[i];
        p.line(start.x, start.y, end.x, end.y);
      }
      p.pop();
    }
    static render(edge) {
      const sourcePlug = edge.getSourcePlug();
      const targetPlug = edge.getTargetPlug();
      let positions = [];
      if (sourcePlug === null || targetPlug === null) {
        const start = edge.getSourceNode();
        const end = edge.getTargetNode();
        positions = this.plotConnection(start, end);
      } else {
        const start = edge.getSourcePlug();
        const end = edge.getTargetPlug();
        positions = this.plotConnection(start, end);
      }
      this.renderLines(positions);
    }
  }

  class RenderGuides {
    constructor(p) {
      RenderGuides.p = p;
    }
    static render() {
      const p = RenderGuides.p;
      p.push();
      p.noFill();
      p.strokeWeight(1);
      p.stroke("rgb(255,255,255,0.5)");
      for (let col = 1; col < p.width / 100; col += 1) {
        p.line(col * 100, 0, col * 100, p.height);
      }
      for (let row = 1; row < p.height / 100; row += 1) {
        p.line(0, row * 100, p.width, row * 100);
      }
      p.pop();
    }
    static getP() {
      return RenderGuides.p;
    }
  }

  // import InputParameterModel from '../model/InputParameterModel';
  // import NodeModel from '../model/NodeModel';
  // import OutputParameterModel from '../model/OutputParameterModel';
  // import RenderParameter from './RenderParameter';
  class RenderInspector {
    constructor(p) {
      RenderInspector.p = p;
    }
    static renderInfoRow(row) {
      const p = this.p;
      const thisRowsColumns = row.getColumns();
      if (p === null) {
        throw new Error("p is null in RenderParameter");
      }
      p.push();
      p.translate(row.position.x, row.position.y);
      p.noFill();
      if (row.getIsRolledOver()) {
        p.stroke("rgba(255,255,0,1)");
        p.fill("rgba(255,255,0,0.2)");
      } else {
        p.stroke("rgba(0,255,255,0.7)");
      }
      p.strokeWeight(1);
      p.rect(0, 0, row.dimensions.width, row.dimensions.height);
      p.fill(0);
      p.noStroke();
      p.text(thisRowsColumns[0].getContent(), 10, 20);
      p.text(
        thisRowsColumns[1].getContent(),
        LayoutInspector.PARAM_NAME_COLUMN_WIDTH,
        20
      );
      p.pop();
    }
    static renderTable(ipm) {
      var _a;
      const p = RenderInspector.getP();
      const pos = ipm.getPosition();
      const table = ipm.getTable();
      const numRows =
        table === null || table === void 0 ? void 0 : table.getNumRows();
      if (!pos) return;
      p.push();
      p.translate(pos.x, pos.y);
      for (let i = 0; i < numRows; i++) {
        const row =
          (_a = ipm.getTable()) === null || _a === void 0
            ? void 0
            : _a.getRow(i);
        if (row instanceof InspectorInfoRow) {
          RenderInspector.renderInfoRow(row);
        }
        if (row instanceof InspectorHeadingRow) {
          RenderInspector.renderHeadingRow(row);
        }
      }
      p.pop();
    }
    static renderHeadingRow(row) {
      const p = this.p;
      if (p === null) {
        throw new Error("p is null in RenderHeadingRow");
      }
      p.push();
      p.translate(row.position.x, row.position.y);
      p.noFill();
      p.fill("rgba(200,255,200,1)");

      // p.strokeWeight(1);
      p.rect(0, 0, row.dimensions.width, row.dimensions.height);
      p.fill(0);
      p.text(row.getContent(), 10, 20);
      p.pop();
    }
    static render(ipm) {
      if (ipm) {
        RenderInspector.renderBackground(ipm);
        RenderInspector.renderInspectorBorder(ipm);
        RenderInspector.renderTitleBar(ipm);
        RenderInspector.renderTable(ipm);
      }
    }

    // calculate column position
    // set row height
    static renderTitle(ipm) {
      const p = RenderInspector.getP();
      const pos = ipm.getPosition();
      if (!pos) return;

      // title
      p.push();
      p.fill(255);
      p.noStroke();
      p.text("Object Inspector", pos.x + 10, pos.y + 20);
      p.push();
    }
    static renderTitleBar(ipm) {
      const p = RenderInspector.getP();
      const pos = ipm.getPosition();
      const dim = ipm.getDimensions();
      if (!pos || !dim) return;
      p.push();
      p.fill("rgba(32,32,64,0.8)");
      p.noStroke();
      p.rect(pos.x, pos.y, dim.width, 30);
      p.pop();
      RenderInspector.renderTitle(ipm);
    }
    static renderBackground(ipm) {
      const p = RenderInspector.getP();
      if (ipm) {
        const pos = ipm.getPosition();
        const dim = ipm.getDimensions();
        if (!pos || !dim) return;

        // background
        p.push();
        p.fill("rgba(255,255,255,0.9)");
        p.noStroke();
        p.rect(pos.x, pos.y + 30, dim.width, dim.height - 30);
        p.pop();
      } else {
        console.warn("InspectorModel is null");
      }
    }
    static renderInspectorBorder(ipm) {
      const p = RenderInspector.getP();
      const pos = ipm.getPosition();
      const dim = ipm.getDimensions();
      if (!pos || !dim) return;

      // border
      p.push();
      p.noFill();
      p.stroke("rgba(32,32,64,0.8)");
      p.strokeWeight(3);
      p.rect(pos.x, pos.y, dim.width, dim.height);
      p.pop();
    }
    static getP() {
      return RenderInspector.p;
    }
  }

  class RenderNode {
    constructor(p) {
      // private static clickHotSpots:unknown[] = [];
      this.isSelected = false;
      RenderNode.p = p;
    }
    static renderPlug(plug, p, showNodes) {
      if (plug === null) {
        return;
      }
      const pos = plug.getPosition();
      if (pos === null) {
        return;
      }
      const isSelected = plug.getIsSelected();
      const x = pos.x;
      const y = pos.y;

      // const p = RenderNode.p;
      const mouseIsOver = plug.checkBoundary(p.mouseX, p.mouseY);
      let plugStroke = "rgba(200,200,200,0.7)";
      let plugFill = "rgba(255,255,200,0.7)";

      // if mouse is over and user clicks, select plug
      // if another plug is selected and user clicks a plug, make an edge to connect
      if (mouseIsOver) {
        plugStroke = "rgba(255,255,72,1)";
        plugFill = "rgba(0,0,0,0.8)";
      }
      if (isSelected) {
        plugStroke = "rgba(255,0,72,1)";
        plugFill = "rgba(255,0,72,1)";
      }
      if (plug.getIsHighlit()) {
        plugStroke = "rgba(0,0,255,1)";
        plugFill = "rgba(0,255,255,1)";
      }
      p.push();
      p.stroke(plugStroke);
      p.strokeWeight(2);
      p.fill(plugFill);
      if (isSelected || showNodes) {
        p.circle(x, y, 8);
      }
      p.pop();
    }

    // static getClickHotSpots():unknown[] {
    //   return RenderNode.clickHotSpots;
    // }
    static showNodes(node, p, showNodes) {
      node.getPlugs().forEach((plug) => {
        this.renderPlug(plug, p, showNodes);
      });
    }
    static render(node, p) {
      const CORNER_RADIUS = 10;
      node.getBoundary();

      // END test variables
      const width = node.dimensions.width;
      const height = node.dimensions.height;
      const x = node.position.x;
      const y = node.position.y;
      const label = node.getLabel();
      let fillColor = "rgba(228,200,200,1)";
      if (node.getIsSelected()) {
        fillColor = "rgba(255,255,200,1)";
      }
      p.push();
      p.translate(x, y);
      p.noStroke();
      p.fill("rgba(0,0,0,0.5)");
      let strokeColor = "rgb(128,128,128)";
      let strokeWeight = 1;
      if (node.getIsSelected()) {
        strokeColor = "rgb(255,200,0)";
        strokeWeight = 3;
      }

      // round all corners except top-left
      p.rect(
        0,
        5,
        width,
        height,
        0,
        CORNER_RADIUS,
        CORNER_RADIUS,
        CORNER_RADIUS
      );
      p.fill(fillColor);
      p.stroke(strokeColor);
      p.strokeWeight(strokeWeight);

      // TODO: modify gray corner radii to line up with borders on top shape
      p.rect(
        3,
        0,
        width,
        height,
        0,
        CORNER_RADIUS,
        CORNER_RADIUS,
        CORNER_RADIUS
      );
      if (node.getIsEditing()) {
        p.fill("rgba(200,0,0,1)");
      } else {
        p.fill(0);
      }
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.text(label, 6, 3, width - 6, height - 6);
      if (node.getIsEditing()) {
        p.noFill();
        p.stroke("rgba(0,0,200,1)");
        p.rect(10, 10, width - 10, height - 20);
      }
      p.pop();

      // const showNodes = node.checkMouseOver(p.mouseX, p.mouseY);
      const showNodes = node.getIsRolledOver();
      this.showNodes(node, p, showNodes);

      // Draw the bounds of the rollover sensor area
      {
        RenderNode.drawRolloverGuide(node.getBoundary(), p);
      }

      // shape.mouseClicked = () => {
      //   console.log('setting up click actions in RenderNode.render:')
      //   console.log(node);
      //   node.clickAction(node);
      // }
      // shape.doubleClicked = () => {
      //   node.doubleClickAction();
      // }
      // this.clickHotSpots.push(shape);
    }
    static drawRolloverGuide(boundary, p) {
      p.push();
      p.noFill();
      p.stroke("rgb(0,255,255)");
      p.strokeWeight(1);
      if (boundary === null) {
        console.warn("boundary is null in RenderNode.drawRolloverGuide");
        return;
      }
      p.translate(boundary.getLeft(), boundary.getTop());
      p.rect(
        0,
        0,
        boundary.getRight() - boundary.getLeft(),
        boundary.getBottom() - boundary.getTop()
      );
      p.pop();
    }
  }

  class RenderTool {
    constructor(p) {
      RenderTool.p = p;
    }
    static getP() {
      return RenderTool.p;
    }
    static drawRolloverGuide(boundary, p) {
      p.push();
      p.noFill();
      p.stroke("rgb(0,255,255)");
      p.strokeWeight(1);
      if (boundary === null) {
        console.warn("boundary is null in RenderNode.drawRolloverGuide");
        return;
      }
      p.translate(boundary.getLeft(), boundary.getTop());
      p.rect(
        0,
        0,
        boundary.getRight() - boundary.getLeft(),
        boundary.getBottom() - boundary.getTop()
      );
      p.pop();
    }
    static render(tool) {
      const p = RenderTool.getP();
      const boundary =
        tool === null || tool === void 0 ? void 0 : tool.getBoundary();
      p.push();
      const pos =
        tool === null || tool === void 0 ? void 0 : tool.getPosition();
      const dim =
        tool === null || tool === void 0 ? void 0 : tool.getPosition();
      if (
        pos === null ||
        dim === null ||
        typeof pos === "undefined" ||
        typeof dim === "undefined"
      ) {
        // was throw
        console.warn("tool position data is null");
        return;
      }
      if (
        (tool === null || tool === void 0 ? void 0 : tool.type) ===
        "DynamicTool"
      ) {
        p.fill("rgba(255,255,0,1)");
      } else if (
        (tool === null || tool === void 0 ? void 0 : tool.type) === "Tool"
      ) {
        p.fill("rgba(100,100,255,1)");
      } else {
        p.fill("rgba(128,0,255,1)");
      }
      p.stroke(72);
      p.strokeWeight(2);
      p.translate(boundary.getLeft(), boundary.getTop());
      p.rect(
        0,
        0,
        boundary.getRight() - boundary.getLeft(),
        boundary.getBottom() - boundary.getTop()
      );
      p.noStroke();
      p.fill(255);
      p.text(
        tool.getName(),
        5,
        5, // start
        // right and bottom bounds
        boundary.getRight() - boundary.getLeft(),
        boundary.getBottom() - boundary.getTop()
      );
      p.pop();
      if (boundary === null) {
        console.warn("boundary is null in RenderTool.render");
        return;
      }
      this.drawRolloverGuide(boundary, p);
    }
  }

  class RenderToolbox {
    constructor(p) {
      RenderToolbox.p = p;
    }
    static getP() {
      return RenderToolbox.p;
    }
    static renderTitle(tbm) {
      const p = RenderToolbox.getP();
      const pos = tbm.getPosition();
      if (!pos) return;

      // title
      p.push();
      p.fill(255);
      p.noStroke();
      p.text("TOOLBOX", pos.x + 10, pos.y + 20);
      p.push();
    }
    static renderTitleBar(tbm) {
      const p = RenderToolbox.getP();
      const pos = tbm.getPosition();
      const dim = tbm.getDimensions();
      if (!pos || !dim) return;
      p.push();
      p.fill("rgba(32,32,64,0.8)");
      p.noStroke();
      p.rect(pos.x, pos.y, dim.width, 30);
      p.fill(255);
      p.text("TOOLBOX", pos.x + 10, pos.y + 20);
      p.pop();
      RenderToolbox.renderTitle(tbm);
    }
    static renderTools(tbm) {
      const toolList = tbm.getToolList();
      toolList.forEach((tool) => {
        RenderTool.render(tool);
      });
    }

    // TEST
    static render(tbm) {
      if (tbm) {
        RenderToolbox.renderBackground(tbm);
        RenderToolbox.renderTBBorder(tbm);
        RenderToolbox.renderTitleBar(tbm);
        RenderToolbox.renderTools(tbm);
      } else {
        console.warn("RenderToolbox.render: tbm is null");
      }
    }
    static renderBackground(tbm) {
      const p = RenderToolbox.getP();
      const pos = tbm.getPosition();
      const dim = tbm.getDimensions();
      if (!pos || !dim) return;

      // background
      p.push();
      p.fill("rgba(255,255,255,0.85)");
      p.noStroke();
      p.rect(pos.x, pos.y + 30, dim.width, dim.height - 30);
      p.pop();
    }
    static renderTBBorder(tbm) {
      const p = RenderToolbox.getP();
      const pos = tbm.getPosition();
      const dim = tbm.getDimensions();
      if (!pos || !dim) return;

      // border
      p.noFill();
      p.stroke("rgba(32,32,64,0.8)");
      p.strokeWeight(3);
      p.rect(pos.x, pos.y, dim.width, dim.height);
    }
  }

  class RenderApplication {
    // private static rowCount = 0;
    // public static readonly Y_FIRST_ROW_OFFSET = 45;
    // public static readonly Y_EACH_ROW_OFFSET = 20;
    // public static readonly NAME_COLUMN_WIDTH = 150;
    constructor(p) {
      RenderApplication.p = p;
    }

    // RENDER
    static renderNodes(p, appModel) {
      const nodes =
        appModel === null || appModel === void 0 ? void 0 : appModel.getNodes();
      nodes === null || nodes === void 0
        ? void 0
        : nodes.forEach((n) => {
            // check for rollover
            // TODO: Move this logic to MouseManager / GuiElement class
            // const mouseIsOverNode = n.checkBoundary(p.mouseX, p.mouseY);
            // if (mouseIsOverNode) {
            //   n.setIsRolledOver();
            // } else {
            //   n.setIsRolledOver(false);
            // }
            // if node is being dragged, update its position
            // TODO: Move to Mouse Manager
            // if (n.getIsDragging()) {
            //   n.dragToPosition(new Position(p.mouseX - 40, p.mouseY - 20));
            // }
            RenderNode.render(n, P5Reference.p);
          });

      // const hotSpots = RenderNode.getClickHotSpots();
      // console.log("hotSpots: ", hotSpots);
    }
    static drawLeadLine(p, appModel, startPosition, mousePosition) {
      const lineArray = [startPosition, mousePosition];
      RenderEdge.renderLines(lineArray, "rgb(0,128,255)");
    }

    // RENDER
    static renderElements(appModel) {
      const p = P5Reference.p;

      // const appModel:ApplicationModel = (ChartManager.getApplicationModel() as ApplicationModel);
      const toolbox =
        appModel === null || appModel === void 0
          ? void 0
          : appModel.getToolbox();
      const inspector =
        appModel === null || appModel === void 0
          ? void 0
          : appModel.getInspector();

      // const nodes = appModel?.getNodes();
      // const edges = appModel?.getEdges();
      // const tools = toolbox?.getToolList();
      const dynamicTool =
        appModel === null || appModel === void 0
          ? void 0
          : appModel.getDynamicTool();

      // const selectedNodes = appModel?.getSelectedNodes();
      // const selectedEdges = appModel?.getSelectedEdges();
      // const selectedPlugs = appModel?.getSelectedPlugs();
      // 1. RENDER TOOLBOX
      RenderToolbox.render(toolbox);

      // 2. RENDER INSPECTOR (and parameters in node)
      RenderInspector.render(inspector);

      // Do this in MouseManager
      // const mouseIsOverToolbox = toolbox?.checkBoundary(p.mouseX, p.mouseY);
      // if (mouseIsOverToolbox) {
      //   toolbox?.setIsRolledOver();
      // }
      // 3. RENDER TOOLS
      this.renderTools(p, appModel);

      // 4. RENDER EDGES
      this.renderEdges(appModel);

      // 5. RENDER NODES
      this.renderNodes(p, appModel);

      // 6. RENDER DYNAMIC TOOL
      if (dynamicTool !== null) {
        // this.dynamicTool.render();
        RenderTool.render(dynamicTool);
      }

      // 7. (DEBUG): RENDER GRID & GUIDES
      RenderGuides.render();

      // const htmlContainer = document.getElementById('htmlContainer');
      // CreationManager.createContainer(p, htmlContainer as HTMLElement);
      // 8. RENDER LEAD LINE if Plug is selected
      const selectedPlugs = appModel.getSelectedPlugs();
      if (selectedPlugs.length === 1) {
        RenderApplication.drawLeadLine(
          p,
          appModel,
          selectedPlugs[0].getPosition(),
          new Position(p.mouseX, p.mouseY)
        );
      }
    }

    // 5. RENDER EDGES
    static renderEdges(appModel) {
      // const appModel:ApplicationModel = (ChartManager.getApplicationModel() as ApplicationModel);
      const edges = appModel.getEdges();
      edges === null || edges === void 0
        ? void 0
        : edges.forEach((e) => {
            RenderEdge.render(e);
          });
    }

    // 3. RENDER TOOLS
    static renderTools(p, appModel) {
      // const appModel:ApplicationModel = (ChartManager.getApplicationModel() as ApplicationModel);
      const toolbox = appModel.getToolbox();
      toolbox === null || toolbox === void 0
        ? void 0
        : toolbox.getToolList().forEach((t) => {
            // check for rollover
            // TODO: Move this logic to abstract GuiElement class
            if (t.getIsDragging()) {
              InteractionManager.dragDynamicTool(
                appModel,
                new Position(p.mouseX - 40, p.mouseY - 20),
                t
              );
            }

            // TODO: This should be done in MouseManager -- Verify if this is done there
            // const mouseIsOverTool = (t as ToolModel).checkBoundary(
            //   p.mouseX,
            //   p.mouseY
            // );
            // if (mouseIsOverTool) {
            //   t.setIsRolledOver();
            // } else {
            //   t.setIsRolledOver(false);
            // }
          });
    }
  }
  RenderApplication.p = null;

  let applicationModel = null;
  const preload = (p) => {
    applicationModel = ApplicationModel.createInstance();
    p.loadFont("./font/Regular.otf");
    P5Reference.createInstance(p);
  };

  // FOR 3D orthographic
  // function setOrthographicProjection(p: p5):void {
  //   const width = p.width;
  //   const height = p.height;
  //   p.ortho(
  //     -width/2, width/2,
  //     height/2, -height/2,
  //     0, 500);
  // }
  const initializeRenderers = (p) => {
    new RenderNode(p);
    new RenderEdge(p);
    new RenderGuides(p);
    new RenderTool(p);
    new RenderToolbox(p);
    new RenderInspector(p);
    new RenderApplication(p);
  };
  const mouseMoved = (p) => {
    MouseManager.mouseMoved(p.mouseX, p.mouseY, applicationModel);
  };
  const mouseClicked = (p) => {
    MouseManager.mouseClicked(p.mouseX, p.mouseY, applicationModel);
  };
  const mouseDragged = (p) => {
    MouseManager.mouseDragged(p.mouseX, p.mouseY, applicationModel);
  };
  const mousePressed = (p) => {
    MouseManager.mousePressed(p.mouseX, p.mouseY, applicationModel);
  };
  const mouseReleased = (p) => {
    MouseManager.mouseReleased(p.mouseX, p.mouseY, applicationModel);
  };
  const keyPressed = (p) => {
    KeyboardManager.handleKeyPress(p.keyCode, p.key);
  };

  /** This is a setup function. */
  const setup = (p) => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.frameRate(30);
    p.background(248);

    // Classes with static methods that need access to p5.js
    initializeRenderers(p);
  };

  let p;
  let lastWindowDimensionX = null;
  let lastWindowDimensionY = null;
  const draw = (_p) => {
    p = _p;
    if (
      lastWindowDimensionX !== p.windowWidth ||
      lastWindowDimensionY !== p.windowHeight
    ) {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      Layout.resizeCanvas(p.windowWidth, p.windowHeight);
      InteractionManager.resizeCanvas(
        applicationModel,
        p.windowWidth,
        p.windowHeight
      );
      lastWindowDimensionX = p.windowWidth;
      lastWindowDimensionY = p.windowHeight;
    }
    p.background("rgb(180,180,200)");
    RenderApplication.renderElements(applicationModel);
  };

  const sketch = createSketch({
    preload,
    setup,
    draw,
    mouseClicked,
    mouseDragged,
    mousePressed,
    mouseReleased,
    keyPressed,
    mouseMoved,
  });
  new p5(sketch);
})(p5);
