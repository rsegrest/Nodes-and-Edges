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
    checkMouseOver(mouseX, mouseY) {
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

  class Dimension {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
    toString() {
      return `Dimension:(width:${this.width},  height:${this.height})`;
    }
  }

  // TODO: Create panel model that is collapsible
  class InspectorModel extends GuiElementModel {
    constructor() {
      super(
        true,
        false, // _isDraggable: fixed for now, might make this draggable later
        false, // _isResizable: future feature
        false, // _isSelectable: future feature
        new Position(10, 400),
        new Dimension(300, 190)
      );

      // private parameterSet: any[] = [];
      this.type = "Inspector";
      this.isCollapsed = false;

      // this.toolList.push(new ToolModel("Element", "E", "Element"));
      // this.toolList.push(new ToolModel("Subelement", "S", "Subelement"));
      // this.toolList.push(new ToolModel("Edge", "E", "Edge"));
    }
    clickAction() {
      console.log("inspector pane clicked");
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

  class ToolModel extends DraggableGuiElementModel {
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
    checkMouseOver(mouseX, mouseY) {
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
    constructor(p) {
      this.width = 0;
      this.height = 0;
      this.width = p.width;
      this.height = p.height;
    }
    static positionInspector(
      inspector,
      // currently inspector is only in bottom left, so don't need width (yet)
      screenHeight
    ) {
      if (inspector === null) {
        return;
      }
      const dim = inspector.getDimensions();
      if (dim === null) {
        return;
      }

      // const inspectorWidth = dim.width;
      const inspectorHeight = dim.height;
      const inspectorPosition = new Position(
        10,
        screenHeight - (inspectorHeight + 10)
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
    static positionElementBasedOnScreenSize(
      element,
      screenWidth,
      screenHeight
    ) {
      if (element instanceof ToolboxModel) {
        Layout.positionToolboxAndTools(element, screenWidth);
      }
      if (element instanceof InspectorModel) {
        Layout.positionInspector(element, screenHeight);
      }
    }

    // Boilerplate getters and setters
    createInstance(p) {
      if (Layout.instance === null) {
        Layout.instance = new Layout(p);
      }
      return Layout.instance;
    }
    getInstance() {
      if (Layout.instance === null) {
        throw new Error("Layout instance is not created yet");
      }
      return Layout.instance;
    }
    static getDistance(position1, position2) {
      const x = position1.x - position2.x;
      const y = position1.y - position2.y;
      return Math.sqrt(x * x + y * y);
    }
  }
  Layout.instance = null;
  Layout.BASE_NODE_WIDTH = 100;
  Layout.BASE_NODE_HEIGHT = 50;

  class PlugModel extends DraggableGuiElementModel {
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
    checkMouseOver(mouseX, mouseY) {
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
    setSelected(isSelected = true) {
      this.isSelected = isSelected;
    }
    deselect() {
      this.isSelected = false;
    }
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
    // TODO: Use this function for select (currently not called)
    // TODO: Check other implementations of superclass
    clickAction() {
      throw "NodeModel clickAction not implemented";
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
    toString() {
      return `NodeModel: ${this.id} ${
        this.label
      } ${this.position.toString()} ${this.dimensions.toString()}`;
    }
    toDyreqtJson() {
      throw new Error("NodeModel-- toDyreqtJson: not yet implemented");
    }
  }

  class Parameter {
    constructor(name, value, units = null) {
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
    setValue(value) {
      this.value = value;
    }
    setUnits(units) {
      this.name = `${this.name} (${units})`;
    }
    toString() {
      let outputString = `Parameter: ${this.name}, value: ${this.value}`;
      if (this.units !== null) {
        outputString += `, units: ${this.units}`;
      }
      return outputString;
    }
    toJson() {
      return JSON.stringify(this);
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
      dynamicTool === null || dynamicTool === void 0
        ? void 0
        : dynamicTool.getObjectType();

      // get object types from looking at where tools are created
      // need to have a master list of new object types
      // Element, Subelement, Edge
      return new NodeModel("69", "new node", objectsNewPos, objectsNewDim);
    }
    constructor() {
      // CreationManager.populateNodeAndEdgeList();
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
        new InputParameterModel("parameter1", 1000, "meters"),
        new InputParameterModel("parameter2", 69, null),
        new InputParameterModel("fuel", 420, "grams"),
        new InputParameterModel(
          "Another fourth param",
          "aStringValue",
          "count"
        ),
      ];
      const outputParameterList = [
        new OutputParameterModel("parameter1", 0, "meters"),
        new OutputParameterModel("parameter2", 6.9, null),
        new OutputParameterModel("fuelRemaining", 2, "grams"),
        new OutputParameterModel(
          "Another fourth param",
          "aStringValue",
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

        // console.log('node', node)
        // console.log('node boundary', node.getBoundary())
        nodes.push(node);
      }
      return nodes;
    }

    // TODO: Use this (temp method) to set up a test case
    static createEdges() {
    // nodes: NodeModel[]
      // TEMP RETURN EMPTY ARRAY
      // const edge1 = new EdgeModel(
      //   '1-2',
      //   nodes[0] as NodeModel,
      //   nodes[1] as NodeModel
      // );
      // return [edge1];
      return [];
    }
  }

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

  class RenderEdge {
    constructor(p) {
      RenderEdge.p = p;
    }
    static plotLinesBetweenNodes(node1, node2) {
      const start_x = node1.position.x + node1.dimensions.width / 2;
      const start_y = node1.position.y + node1.dimensions.height / 2;
      const end_x = node2.position.x + node2.dimensions.width / 2;
      const end_y = node2.position.y + node2.dimensions.height / 2;
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
      const start = edge.getSourceNode();
      const end = edge.getTargetNode();
      const positions = this.plotLinesBetweenNodes(start, end);
      this.renderLines(positions);
    }
  }

  class RenderNode {
    constructor(p) {
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
      const mouseIsOver = plug.checkMouseOver(p.mouseX, p.mouseY);
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
    static showNodes(node, p, showNodes) {
      node.getPlugs().forEach((plug) => {
        this.renderPlug(plug, p, showNodes);
      });
    }
    static render(node, p, highlit = false) {
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
      if (highlit) {
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
      p.fill(0);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.text(label, 6, 3, width - 6, height - 6);
      p.pop();

      // const showNodes = node.checkMouseOver(p.mouseX, p.mouseY);
      const showNodes = node.getIsRolledOver();
      this.showNodes(node, p, showNodes);

      // Draw the bounds of the rollover sensor area
      {
        RenderNode.drawRolloverGuide(node.getBoundary(), p);
      }
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
      const boundary = tool.getBoundary();
      p.push();
      const pos = tool.getPosition();
      const dim = tool.getPosition();
      if (
        pos === null ||
        dim === null ||
        typeof pos === "undefined" ||
        typeof dim === "undefined"
      ) {
        throw new Error("tool position data is null");
      }
      if (tool.type === "DynamicTool") {
        p.fill("rgba(255,255,0,1)");
      } else if (tool.type === "Tool") {
        p.fill("rgba(255,2,100,1)");
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
      p.fill(0);
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

    // static calcNumToolGridColumns(
    //   // tbm: ToolboxModel
    // ):number {
    //   return 2;
    // }
    // static calcNumToolGridRows(
    //   // tbm: ToolboxModel
    // ):number {
    //   return 6;
    // }
    // static ROW_SPACING = 60;
    // static findFirstRowOffset(tbm: ToolboxModel):number {
    //   const pos = tbm.getPosition();
    //   if (!pos) return 0;
    //   const FIRST_ROW_OFFSET_Y = 70 + pos.y;
    //   return FIRST_ROW_OFFSET_Y;
    // }
    // static findHorizontalCenterLine(
    //   tbm: ToolboxModel
    // ):number {
    //   const pos = tbm.getPosition();
    //   if (!pos) return 0;
    //   return pos.x+95;
    // }
    // should this be in the model?
    // static findRowCenterLine(tbm:ToolboxModel, row:number):number {
    //   return RenderToolbox.findFirstRowOffset(tbm)+(row*RenderToolbox.ROW_SPACING);
    // }
    // static buildLocationSet(tbm: ToolboxModel):Position[]|null {
    //   const p = RenderToolbox.getP();
    //   const pos = tbm.getPosition();
    //   if (!pos) return null;
    //   // const dim = tbm.getDimensions();
    //   const toolList = tbm.getToolList();
    //   const toolLocations:Position[] = [];
    //   const CENTER_OFFSET_X = 45;
    //   // TODO: Use row and column count to calculate position
    //   // const rows = RenderToolbox.calcNumToolGridRows();
    //   // const columns = RenderToolbox.calcNumToolGridColumns();
    //   // find center line
    //   // find row center lines
    //   toolList.forEach((tool,i) => {
    //     let thisX = this.findHorizontalCenterLine(tbm)-CENTER_OFFSET_X;
    //     if (i%2 !== 0) {
    //       thisX += (CENTER_OFFSET_X*2);
    //     }
    //     toolLocations.push(
    //       new Position(
    //         // if two rows, center plus or minus horizontal offset
    //         thisX,
    //         pos.y+(
    //           RenderToolbox.findFirstRowOffset(tbm)
    //         )+(Math.floor(i/2)*60)
    //       )
    //     );
    //   })
    //   return toolLocations;
    // }
    static renderTools(tbm) {
      const toolList = tbm.getToolList();
      toolList.forEach((tool, i) => {
        RenderTool.render(tool);
      });
    }

    // TEST
    static render(tbm) {
      const p = RenderToolbox.getP();
      tbm.getPosition();
      tbm.getDimensions();
      RenderToolbox.renderBackground(tbm);
      RenderToolbox.renderTBBorder(tbm);
      RenderToolbox.renderTitleBar(tbm);
      RenderToolbox.renderTools(tbm);
      p.pop();
    }
    static renderBackground(tbm) {
      const p = RenderToolbox.getP();
      const pos = tbm.getPosition();
      const dim = tbm.getDimensions();
      if (!pos || !dim) return;

      // background
      p.push();
      p.fill("rgba(255,255,255,0.2)");
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

  class RenderParameter {
    constructor(p) {
      RenderParameter.p = p;
    }
    static drawColumnDivider(inspector) {
      const p = this.p;
      const inspectorPos = inspector.getPosition();
      if (p === null) {
        throw new Error("p is null in RenderParameter");
      }
      p.push();
      p.noStroke();
      p.translate(inspectorPos.x + 5, inspectorPos.y + this.Y_FIRST_ROW_OFFSET);

      // draw divider
      p.stroke(72);
      p.strokeWeight(1);
      const xStartLine = this.NAME_COLUMN_WIDTH - 10;
      const xEndLine = xStartLine;
      const yStartLine = -15;
      const yEndLine = inspector.boundary.getBottom();
      p.line(xStartLine, yStartLine, xEndLine, yEndLine);
      p.noStroke();
      p.pop();
    }
    static renderText(parameter, inspector) {
      const p = this.p;
      const inspectorPos = inspector.getPosition();
      if (p === null) {
        throw new Error("p is null in RenderParameter");
      }
      p.push();
      p.translate(
        inspectorPos.x + 5,
        inspectorPos.y +
          this.Y_FIRST_ROW_OFFSET +
          this.rowCount * this.Y_EACH_ROW_OFFSET
      );
      p.fill(0);
      p.text(parameter.getName(), 0, 0);
      let secondColumnText = parameter.getValue();
      if (parameter.getUnits()) {
        secondColumnText += ` ${parameter.getUnits()}`;
      }
      p.text(secondColumnText, this.NAME_COLUMN_WIDTH, 0);
      p.pop();
    }
    static renderParameterRowInInspector(
      parameter,
      inspector,
      isFirstParameter = false,
      shouldAddHorizontalDivider = false
    ) {
      if (isFirstParameter) {
        RenderParameter.rowCount = 0;
        this.addHorizontalDivider(inspector, "Input Parameters");
      }
      const p = RenderParameter.p;

      // const inspectorPos = inspector.getPosition();
      if (p === null) {
        throw new Error("p is null in RenderParameter");
      }

      // if (inspectorPos === null) { throw(new Error('inspector position is null in RenderParameter')); }
      this.renderText(parameter, inspector);
      RenderParameter.rowCount += 1;
    }
    static addHorizontalDivider(inspector, label = null) {
      const p = this.p;
      const inspectorPos = inspector.getPosition();
      if (p === null) {
        throw new Error("p is null in RenderParameter");
      }
      if (inspectorPos === null) {
        throw new Error("inspector position is null in RenderParameter");
      }
      p.push();
      p.fill("rgba(255,255,148,1)");
      p.translate(
        inspector.boundary.getLeft() + 2,
        inspector.boundary.getTop() +
          this.rowCount * this.Y_EACH_ROW_OFFSET +
          30
      );
      p.rect(0, 0, inspector.boundary.getRight() - 15, this.Y_EACH_ROW_OFFSET);
      p.fill(0);
      if (label !== null) {
        // const textWidth =
        p.text(label, 5, 15);
        p.stroke(0);
        p.strokeWeight(0.5);
        p.line(5, 18, inspector.dimensions.width * 0.9, 18);
      }
      p.pop();
      RenderParameter.rowCount += 1;
    }
    static render(parameter, inspector, isFirstParameter = false) {
      const p = this.p;
      if (p === null) {
        throw new Error("p is null in RenderParameter");
      }
      p.push();
      p.translate(inspector.boundary.getLeft(), inspector.boundary.getTop());
      p.fill("rgba(255,0,0,1)");
      p.circle(0, 0, 10);
      p.pop();
      this.renderParameterRowInInspector(
        parameter,
        inspector,
        isFirstParameter
      );
    }
  }
  RenderParameter.p = null;
  RenderParameter.rowCount = 0;
  RenderParameter.Y_FIRST_ROW_OFFSET = 45;
  RenderParameter.Y_EACH_ROW_OFFSET = 20;
  RenderParameter.NAME_COLUMN_WIDTH = 150;

  class RenderInspector {
    constructor(p) {
      RenderInspector.p = p;
    }

    // TEST
    static render(ipm, node) {
      let inputParameterList = [];
      let outputParameterList = [];
      if (node) {
        inputParameterList = node.getInputParameterList();
        outputParameterList = node.getOutputParameterList();
      }
      RenderInspector.renderBackground(ipm);
      RenderInspector.renderInspectorBorder(ipm);
      RenderInspector.renderTitleBar(ipm);
      const inputParamLength = inputParameterList.length;
      for (let i = 0; i < inputParamLength; i += 1) {
        RenderParameter.render(inputParameterList[i], ipm, i === 0);
      }
      const outputParamLength = outputParameterList.length;
      for (let i = 0; i < outputParamLength; i += 1) {
        RenderParameter.render(outputParameterList[i], ipm, false);
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
      const pos = ipm.getPosition();
      const dim = ipm.getDimensions();
      if (!pos || !dim) return;

      // background
      p.push();
      p.fill("rgba(255,255,255,0.9)");
      p.noStroke();
      p.rect(pos.x, pos.y + 30, dim.width, dim.height - 30);
      p.pop();
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

  class ChartManager {
    constructor(p) {
      this.nodes = [];
      this.edges = [];
      this.toolbox = new ToolboxModel();
      this.inspector = new InspectorModel();
      this.dynamicTool = null; // TODO: rename?
      // getRolledOverObjects
      this.rolledOverObjects = [];
      ChartManager.setP(p);
      this.nodes = CreationManager.createNodes();

      // this.edges = CreationManager.createEdges(this.nodes);
    }
    repositionElementOnResize(element, windowWidth, windowHeight) {
      Layout.positionElementBasedOnScreenSize(
        element,
        windowWidth,
        windowHeight
      );
      return;
    }
    resizeCanvas(windowWidth, windowHeight) {
      // throw new Error("Method not implemented.");
      this.repositionElementOnResize(this.toolbox, windowWidth, windowHeight);
      this.repositionElementOnResize(this.inspector, windowWidth, windowHeight);

      // move Toolbox
      // move Tools
      // move Inspector
    }
    mouseDragged(p) {
      // console.log(`mouse dragged to : ${p.mouseX}, ${p.mouseY}`);
      const dragTarget = this.getDragTarget();
      if (dragTarget === null) {
        // console.log('1. drag target is null');
        return;
      }

      // console.log(`1. drag target assigned as ${dragTarget?.type}`);if (dragTarget === null) { return; }
      // let testTarget = null;
      if (dragTarget.type === "Node") {
        // testTarget = 'Node';
        dragTarget.setIsDragging(true);
      } else if (dragTarget.type === "Edge") {
        // testTarget = 'Edge';
        dragTarget.setIsDragging(true);
      } else if (dragTarget.type === "Plug") {
        // testTarget = 'Plug';
        dragTarget.setIsDragging(true);
      } else if (dragTarget.type === "Tool") {
        // testTarget = 'Tool';
        // throw(new Error('tool model is being dragged'));
        dragTarget.setIsDragging(true);
      }

      // console.log(`2. drag target assigned as ${testTarget}`);
    }
    mousePressed(p) {
      // console.log(`mouse pressed at : ${p.mouseX}, ${p.mouseY}`);
    }
    clearDragTargets() {
      this.nodes.forEach((node) => {
        node.setIsDragging(false);
        node.getPlugs().forEach((plug) => plug.setIsDragging(false));
      });
      this.edges.forEach((edge) => edge.setIsDragging(false));
      this.toolbox.getToolList().forEach((tool) => tool.setIsDragging(false));
    }
    mouseReleased(p) {
      // console.log('mouse released');
      if (this.dynamicTool !== null) {
        const newlyMintedNode = CreationManager.createNewObjectFromDynamicTool(
          this.dynamicTool
        );
        this.nodes.push(newlyMintedNode);
        this.dynamicTool = null;
      }
      this.dynamicTool = null;

      // if there is a dynamicTool in the slot,
      //  set the dynamicTool to null
      // TODO THEN: create the new class (before to have info?)
      this.clearDragTargets();
    }
    getDragTarget() {
      const nodeList = this.nodes;
      const edgeList = this.edges;
      const plugList = this.nodes.flatMap((node) => node.getPlugs());

      // TODO: Does this need to be a member variable?
      // const dragTarget = null;
      // DONE(?): check toolbox for rollover
      // check tools
      if (this.toolbox) {
        if (this.toolbox.getIsRolledOver()) {
          const toolList = this.toolbox.getToolList();

          // toolList.forEach((tool) => {
          for (let i = 0; i < toolList.length; i += 1) {
            const tool = toolList[i];
            if (tool.getIsRolledOver()) {
              return tool;
            }
          }
        }
      }
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
            // console.warn(`plug: ${plug.toString()} is rolled over`);
            return plug;
          }
        }
      }
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
            // console.warn(`edge: ${edge.toString()} is rolled over`);
            return edge;
          }
        }
      }
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
            // console.warn(`node: ${node.toString()} is rolled over`);
            return node;
          }
        }
      }

      // return object that is being dragged, or null
      return null;
    }

    // TEMP FUNCTION for testing
    drawTestLines() {
      // TEST LINES
      const line1_2 = RenderEdge.plotLinesBetweenNodes(
        this.nodes[0],
        this.nodes[1]
      );
      const line2_3 = RenderEdge.plotLinesBetweenNodes(
        this.nodes[1],
        this.nodes[2]
      );
      const line3_4 = RenderEdge.plotLinesBetweenNodes(
        this.nodes[2],
        this.nodes[3]
      );
      RenderEdge.renderLines(line1_2);
      RenderEdge.renderLines(line2_3);
      RenderEdge.renderLines(line3_4, "rgb(0,0,200)");
    }
    renderElements() {
      const p = ChartManager.getP();

      // console.log('ELEMENTS : '+this.toString());
      // anything to "advance" nodes and edges, or do I just render them?
      // 1. RENDER NODES
      this.nodes.forEach((n, index) => {
        // check for rollover
        // TODO: Move this logic to abstract GuiElement class
        const mouseIsOverNode = n.checkMouseOver(p.mouseX, p.mouseY);
        if (mouseIsOverNode) {
          n.setIsRolledOver();
        } else {
          n.setIsRolledOver(false);
        }

        // if node is being dragged, update its position
        if (n.getIsDragging()) {
          n.dragToPosition(new Position(p.mouseX - 40, p.mouseY - 20));
        }

        // console.log(this.getSelectedNodes().length);
        if (this.getSelectedNodes().length > 0) {
          // TODO: Only draw line if user is hovering over another node:
          //  1. iterate through plugs and check closest
          const plugArray = this.getClosestPlugsOnSelectedNode();

          // console.log('plugArray: '+plugArray);
          const closestPlugOnSelectedNode = plugArray[0];
          const closestPlugPosition =
            closestPlugOnSelectedNode === null ||
            closestPlugOnSelectedNode === void 0
              ? void 0
              : closestPlugOnSelectedNode.getPosition();
          const mousePosition = new Position(p.mouseX, p.mouseY);
          const lineArray = [closestPlugPosition, mousePosition];
          RenderEdge.renderLines(lineArray, "rgb(0,128,255)");

          //  2. draw a preview line from the closest plug
          //       on node 1 to the rolled-over node
          //  NEXT: Create a preview line class:
          //      One location to another (Position or object with position)
        }

        // else {
        //   console.log('no nodes selected');
        // }
        RenderNode.render(n, ChartManager.getP());
      });

      // 2. RENDER TOOLBOX
      RenderToolbox.render(this.toolbox);

      // 3. RENDER INSPECTOR (and parameters in node)
      // TODO: SEND SELECTED NODE (instead of first in array)
      RenderInspector.render(this.inspector, this.getSelectedNodes()[0]);
      const mouseIsOverToolbox = this.toolbox.checkMouseOver(
        p.mouseX,
        p.mouseY
      );
      if (mouseIsOverToolbox) {
        this.toolbox.setIsRolledOver();
      }

      // 4. RENDER TOOLS
      // CHECK FOR TOOLS ROLLOVER
      this.toolbox.getToolList().forEach((t, index) => {
        // check for rollover
        // TODO: Move this logic to abstract GuiElement class
        if (t.getIsDragging()) {
          this.dragDynamicTool(new Position(p.mouseX - 40, p.mouseY - 20), t);
        }

        // RE-ACTIVATE?
        // console.log('t : '+(t as ToolModel).getBoundary())
        const mouseIsOverTool = t.checkMouseOver(p.mouseX, p.mouseY);

        // console.log('mouseIsOverTool('+t+') : '+mouseIsOverTool)
        if (mouseIsOverTool) {
          t.setIsRolledOver();
        } else {
          t.setIsRolledOver(false);
        }

        // if node is being dragged, update its position
        // if (t.getIsDragging()) {
        //   t.dragToPosition(new Position(p.mouseX-20, p.mouseY-10));
        // }
      });

      // 5. RENDER EDGES
      // this.edges.forEach((e) => {
      //   RenderEdge.render(e);
      // })
      // RenderEdge.renderLines([new Position(0,0), new Position(100,100)]);
      // IF A NODE IS SELECTED, SHOW A CONNECTION PREVIEW
      // this.getSelectedNodes().forEach((node) => {
      // TEMP DISABLE, was tested
      // this.highlightClosestPlugOnSelectedNode();
      // RenderEdge.renderPreview(node);
      // });
      // 6. RENDER DYNAMIC TOOL
      if (this.dynamicTool !== null) {
        // this.dynamicTool.render();
        RenderTool.render(this.dynamicTool);
      }

      // 7. (DEBUG): RENDER GRID & GUIDES
      RenderGuides.render();
    }
    dragDynamicTool(pos, tool = null) {
      if (this.dynamicTool === null) {
        // CREATE NEW
        this.dynamicTool = new DynamicToolModel(
          tool === null || tool === void 0 ? void 0 : tool.getName(),
          tool === null || tool === void 0 ? void 0 : tool.getIcon(),
          tool === null || tool === void 0 ? void 0 : tool.getObjectType(),
          tool === null || tool === void 0 ? void 0 : tool.position,
          tool === null || tool === void 0 ? void 0 : tool.dimensions
        );
      }
      this.dynamicTool.dragToPosition(pos);
    }
    setDynamicSlot(dt) {
      this.dynamicTool = dt;
    }
    // testAddHtmlDiv(): void {
    //   const aDiv = document.createElement("p"); // is a node
    //   aDiv.innerHTML = "This is an HTML div appended to a top-layer div";
    //   const canvas = document.getElementById("htmlContainer");
    //   canvas?.appendChild(aDiv);
    // }
    static createContainer(p, parent) {
      const container = document.createElement("div");

      // container.classList.add("p5c-container", "idle");
      // setDraggable(container);
      parent.appendChild(container);
      return { container };
    }

    // static createUi(
    //   parent: HTMLElement
    //   // initialState: UiState,
    //   // eventHandlers: UiEventHandlers = {}
    // ): any {
    //   const p = ChartManager.p;
    //   // document.getElementById();
    //   const cont = ChartManager.createContainer(p, parent);
    //   return cont;
    // }
    getSelectedNodes() {
      return this.nodes.filter((node) => node.getIsSelected());
    }
    getRolledOverNodes() {
      return this.nodes.filter((node) => node.getIsRolledOver());
    }

    // selectedNodes includes node to check if selected
    checkForSelectNode() {
      const mousePosition = new Position(
        ChartManager.p.mouseX,
        ChartManager.p.mouseY
      );
      for (let i = 0; i < this.nodes.length; i += 1) {
        if (this.nodes[i] !== null && this.nodes[i] !== undefined) {
          const node = this.nodes[i];
          node.setSelected(false);
          if (node.checkMouseOver(mousePosition.x, mousePosition.y)) {
            node.setSelected();
          }
        }
      }
    }
    getClosestPlugsOnSelectedNode() {
      const selectedNodes = this.getSelectedNodes();

      // Array for if multiple nodes are selected
      // Right now, one at a time is selected, only
      const closestPlugArray = [];
      if (selectedNodes.length > 0) {
        for (let i = 0; i < selectedNodes.length; i += 1) {
          const closestPlug = selectedNodes[i].getPlugClosestToMouse(
            ChartManager.p.mouseX,
            ChartManager.p.mouseY
          );
          closestPlugArray.push(closestPlug);
        }
      }
      return closestPlugArray;
    }
    mouseClicked() {
      // console.log(
      //   `ChartManager.mouseClicked() @ ${new Position(
      //     ChartManager.p.mouseX,
      //     ChartManager.p.mouseY
      //   )}`
      // );
      this.nodes.forEach((n, i) => {
        const plugs = n.getPlugs();
        plugs.forEach((p) => {
          if (p.checkMouseOver(ChartManager.p.mouseX, ChartManager.p.mouseY)) {
            p.setIsSelected();
          }
        });
        this.checkForSelectNode();
      });
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
    getNodes() {
      return this.nodes;
    }
    getEdges() {
      return this.edges;
    }
    selectNode(node) {
      node.setSelected();
    }
    deselectNode(node) {
      node.deselect();
    }
    static createInstance(p) {
      if (ChartManager.instance === null) {
        ChartManager.instance = new ChartManager(p);
      }
      return ChartManager.instance;
    }
    static getInstance() {
      if (ChartManager.instance === null) {
        throw new Error("ChartManager instance is not created yet");
      }
      return ChartManager.instance;
    }
    static setP(p) {
      ChartManager.p = p;
    }
    static getP() {
      return ChartManager.p;
    }
    toString() {
      let returnStr = `ChartManager:\n\t${this.nodes.length} nodes,\n\t${this.edges.length}\n`;
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
  ChartManager.instance = null;

  // const exp = require('p5-util/p5.experience.js-master/p5.experience.js')
  let chartManager;
  const preload = (p) => {
    p.loadFont("./font/Regular.otf");
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
    new RenderParameter(p);
  };
  const mouseDragged = (p) => {
    ChartManager.getInstance().mouseDragged(p);
  };
  const mousePressed = (p) => {
    ChartManager.getInstance().mousePressed(p);
  };
  const mouseReleased = (p) => {
    ChartManager.getInstance().mouseReleased(p);
  };

  /** This is a setup function. */
  const setup = (p) => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.frameRate(30);
    p.background(248);

    // Classes with static methods that need access to p5.js
    initializeRenderers(p);
    chartManager = ChartManager.createInstance(p);
    CreationManager.createInstance();

    // const uxRect = UX.createUxRect(10,10,100,100);
    // UX.setUxFill(uxRect, 'rgb(255,0,0)');
    // UX.setUxEvent(uxRect, () => {
    //   ('CLICKED!')
    // });
    // const gui = createGui("My awesome GUI");
  };

  let p;
  let lastWindowDimensionX = null;
  let lastWindowDimensionY = null;
  function mouseClicked() {
    // console.log(`draw.ts: mouseClicked()`);
    chartManager.mouseClicked();
  }
  const draw = (_p) => {
    p = _p;
    if (
      lastWindowDimensionX !== p.windowWidth ||
      lastWindowDimensionY !== p.windowHeight
    ) {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      chartManager.resizeCanvas(p.windowWidth, p.windowHeight);
      lastWindowDimensionX = p.windowWidth;
      lastWindowDimensionY = p.windowHeight;
    }
    p.background("rgb(180,180,200)");
    chartManager.renderElements();
  };

  // function renderNodes():void {
  //   nodes.forEach((n) => {
  //     RenderNode.render(n);
  //   })
  // }
  // INTERFACE?
  // function generatedNodeData(
  //   id:string,
  //   label:string
  // ):{
  //   id:string,
  //   label:string,
  //   position:Position,
  //   dimension:Dimension,
  // } {
  //   // const position = new Position(10, 10);
  //   // const dimension = new Dimension(100, 50);
  //   return {
  //     id,
  //     label,
  //     position,
  //     dimension,
  //   }
  // }

  const sketch = createSketch({
    preload,
    setup,
    draw,
    mouseClicked,
    mouseDragged,
    mousePressed,
    mouseReleased,
  });
  new p5(sketch);
})(p5);
