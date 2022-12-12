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

  class Layout {
    constructor(p) {
      this.width = 0;
      this.height = 0;
      this.width = p.width;
      this.height = p.height;
    }
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

  class GuiElementModel {
    constructor(
      _isClickable,
      _isDraggable,
      _isResizable,
      _isSelectable,
      position = null,
      dimensions = null
    ) {
      this._isClickable = true;
      this._isSelectable = false;
      this._isDraggable = false;
      this._isResizable = false;
      this.position = null;
      this.dimensions = null;
      this.isVisible = true;
      this.isSelected = false;
      this.isRolledOver = false;
      this._isClickable = _isClickable;
      this._isDraggable = _isDraggable;
      this._isResizable = _isResizable;
      this._isSelectable = _isSelectable;
      position && (this.position = position);
      dimensions && (this.dimensions = dimensions);
    }
    checkMouseOver(mouseX, mouseY) {
      const boundary = this.getBoundary();
      if (!boundary) {
        return false;
      }
      const isOver =
        mouseX >= boundary.left &&
        mouseX <= boundary.right &&
        mouseY >= boundary.top &&
        mouseY <= boundary.bottom;
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
    }
    getPosition() {
      return this.position;
    }
    setDimensions(dimensions) {
      this.dimensions = dimensions;
    }
    getDimensions() {
      return this.dimensions;
    }
    getBoundary(addMargin = 0) {
      if (!this.getPosition() || !this.getPosition()) {
        return null;
      }
      return {
        left: this.position.x - addMargin,
        top: this.position.y - addMargin,
        right: this.position.x + this.dimensions.width + addMargin,
        bottom: this.position.y + this.dimensions.height + addMargin,
      };
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
    constructor(position = null, dimensions = null, isResizable = false) {
      super(true, true, true, isResizable, position, dimensions);
      this.isResizable = isResizable;
      this.isDragging = false;
    }
    setCursor(isGrabbing) {
      const defaultCanvas = document.getElementById("defaultCanvas0");
      let cursorType = "pointer";
      if (isGrabbing) {
        cursorType = "grab";
      }
      console.log("defaultCanvas");
      console.log(defaultCanvas);
      const htmltag = defaultCanvas;
      htmltag["style"].cursor = cursorType;
    }

    // public startDragAction():void {
    //   this.isDragging = (true);
    // }
    // public stopDragAction():void {
    //   this.isDragging = (false);
    // }
    setIsDragging(isDragging) {
      this.isDragging = isDragging;
    }
    getIsDragging() {
      return this.isDragging;
    }
  }

  class Plug extends DraggableGuiElementModel {
    constructor(plugPosition, position, isHighlit = false) {
      super(
        position,
        null, // dimensions are null for plugs
        false // not resizable
      );
      this.plugPosition = plugPosition;
      this.isHighlit = isHighlit;

      // Edge that this plug is plugged into (null if not plugged in)
      this.plugSocket = null;
      this.plugPosition = plugPosition;
      this.position = position;
    }
    dragToPosition(position) {
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
    constructor(id, label, position, dimensions) {
      super(position, dimensions);
      this.id = id;
      this.label = label;
      this.position = position;
      this.dimensions = dimensions;
      this.showNodes = false;
      this.id = id;
      this.label = label;
      this.position = position;
      this.dimensions = dimensions;
      this.plugs = this.createPlugs();
    }
    getBoundary() {
      return super.getBoundary(10);
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
        const addPlug = new Plug(
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
    clickAction() {
      console.log("NodeModel onClick", this.toString());
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
      console.log(`NodeModel dragToPosition ${position.toString()}`);
      const lastPosition = this.position;
      this.position = position;
      const deltaX = position.x - lastPosition.x;
      const deltaY = position.y - lastPosition.y;
      this.plugs.forEach((plug) => {
        if (plug !== null) {
          plug.setPosition(
            new Position(plug.position.x + deltaX, plug.position.y + deltaY)
          );
        }
      });
    }
    toString() {
      return `NodeModel: ${this.id} ${
        this.label
      } ${this.position.toString()} ${this.dimensions.toString()}`;
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

  class ToolModel extends DraggableGuiElementModel {
    constructor(
      name,
      icon,
      objectType, // describes object to create
      position = null,
      dimensions = null
    ) {
      super(position, dimensions, false);
      this.name = name;
      this.name = name;
      this.icon = icon;
      this.objectType = objectType;
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
      console.log("tool dragged to position:  ", position);
    }
  }

  class ToolboxModel {
    constructor() {
      this.toolList = [];
      this.dimensions = new Dimension(190, 580);
      this.position = { x: 600, y: 10 };
      this.isCollapsed = false;
      this.toolList.push(new ToolModel("Element", "E", "Element"));
      this.toolList.push(new ToolModel("Subelement", "S", "Subelement"));
      this.toolList.push(new ToolModel("Edge", "E", "Edge"));
    }
    getToolList() {
      return this.toolList;
    }
    getDimensions() {
      return this.dimensions;
    }
    setDimensions(dimensions) {
      this.dimensions = dimensions;
    }
    getPosition() {
      return this.position;
    }
    setPosition(position) {
      this.position = position;
    }
    setIsCollapsed(isCollapsed = true) {
      this.isCollapsed = isCollapsed;
    }
    getIsCollapsed() {
      return this.isCollapsed;
    }
    getBoundary() {
      return {
        left: this.position.x,
        top: this.position.y,
        right: this.position.x + this.dimensions.width,
        bottom: this.position.y + this.dimensions.height,
      };
    }
    checkMouseOver(mouseX, mouseY) {
      const boundary = this.getBoundary();
      const isOver =
        mouseX >= boundary.left &&
        mouseX <= boundary.right &&
        mouseY >= boundary.top &&
        mouseY <= boundary.bottom;
      return isOver;
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
      const boundary = node.getBoundary();

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
        RenderNode.drawRolloverGuide(boundary, p);
      }
    }
    static drawRolloverGuide(boundary, p) {
      p.push();
      p.noFill();
      p.stroke("rgb(0,255,255)");
      p.strokeWeight(1);
      p.translate(boundary.left, boundary.top);
      p.rect(
        0,
        0,
        boundary.right - boundary.left,
        boundary.bottom - boundary.top
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
    static renderTool(tool, location) {
      const p = RenderTool.getP();
      p.push();
      p.translate(location.x, location.y);
      p.fill("rgba(255,200,100,1)");
      p.stroke(72);
      p.strokeWeight(2);
      p.rectMode(p.CENTER);
      p.rect(0, 0, 80, 40);
      p.noStroke();
      p.fill(0);
      p.text(tool.getName(), -30, 5);
      p.pop();
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
      p.push();
      p.fill("rgba(32,32,64,0.8)");
      p.noStroke();
      p.rect(pos.x, pos.y, dim.width, 30);
      p.fill(255);
      p.text("TOOLBOX", pos.x + 10, pos.y + 20);
      p.pop();
      RenderToolbox.renderTitle(tbm);
    }
    static calcNumToolGridColumns() {
    // tbm: ToolboxModel
      return 2;
    }
    static calcNumToolGridRows() {
    // tbm: ToolboxModel
      return 6;
    }
    static findFirstRowOffset(tbm) {
      const FIRST_ROW_OFFSET_Y = 70 + tbm.getPosition().y;
      return FIRST_ROW_OFFSET_Y;
    }

    // should this be in the model?
    static findHorizontalCenterLine(tbm) {
      return tbm.getPosition().x + 95;
    }

    // should this be in the model?
    static findRowCenterLine(tbm, row) {
      return (
        RenderToolbox.findFirstRowOffset(tbm) + row * RenderToolbox.ROW_SPACING
      );
    }
    static buildLocationSet(tbm) {
      const pos = tbm.getPosition();

      // const dim = tbm.getDimensions();
      const toolList = tbm.getToolList();
      const toolLocations = [];
      const CENTER_OFFSET_X = 45;

      // find center line
      // find row center lines
      toolList.forEach((tool, i) => {
        let thisX = this.findHorizontalCenterLine(tbm) - CENTER_OFFSET_X;
        if (i % 2 !== 0) {
          thisX += CENTER_OFFSET_X * 2;
        }
        toolLocations.push(
          new Position(
            // if two rows, center plus or minus horizontal offset
            thisX,
            pos.y +
              RenderToolbox.findFirstRowOffset(tbm) +
              Math.floor(i / 2) * 60
          )
        );
      });
      return toolLocations;
    }
    static renderTools(tbm) {
      const toolList = tbm.getToolList();
      const locationSet = RenderToolbox.buildLocationSet(tbm);
      toolList.forEach((tool, i) => {
        RenderTool.renderTool(tool, locationSet[i]);
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

      // border
      p.noFill();
      p.stroke("rgba(32,32,64,0.8)");
      p.strokeWeight(3);
      p.rect(pos.x, pos.y, dim.width, dim.height);
    }
  }
  RenderToolbox.ROW_SPACING = 60;

  // import { nodes } from "../draw";
  // const BASE_NODE_WIDTH = Layout.BASE_NODE_WIDTH;
  // const BASE_NODE_HEIGHT = Layout.BASE_NODE_HEIGHT;
  class CreationManager {
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
    createNodeModel(id, label, position, dimension) {
      return new NodeModel(id, label, position, dimension);
    }
    createPlug(plugPosition, position) {
      return new Plug(plugPosition, position);
    }
    static populateNodeAndEdgeList() {
      // const nodeData = generatedNodeData();
      const nodes = CreationManager.createNodes();
      const edges = CreationManager.createEdges(nodes);
      return {
        nodes,
        edges,
      };
    }
    static createNodes() {
      const nodes = [];
      const labels = ["Solar Array", "Cable", "Avionics", "Radiator"];
      for (let i = 0; i < 4; i += 1) {
        const id = (i + 1).toString();
        const label = labels[i];
        const position = new Position(10 + i * 150 + 10 * i, 20);
        const dimension = new Dimension(100, 50);
        const node = new NodeModel(
          id,
          label,
          position,

          // new Dimension(BASE_NODE_WIDTH, BASE_NODE_HEIGHT)
          dimension
        );
        nodes.push(node);
      }
      return nodes;
    }
    static createEdges(nodes) {
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

  class ChartManager {
    constructor(p) {
      this.nodes = [];
      this.edges = [];
      this.toolbox = new ToolboxModel();

      // getRolledOverObjects
      this.rolledOverObjects = [];
      ChartManager.setP(p);
      this.nodes = CreationManager.createNodes();

      // this.edges = CreationManager.createEdges(this.nodes);
    }
    mouseDragged(p) {
      // console.log(`mouse dragged to : ${p.mouseX}, ${p.mouseY}`);
      const dragTarget = this.getDragTarget();
      if (dragTarget instanceof NodeModel) {
        console.log("this is a node");
        dragTarget.setIsDragging(true);
      }
    }
    mousePressed(p) {
      // console.log(`mouse pressed at : ${p.mouseX}, ${p.mouseY}`);
    }
    clearDragTargets() {
      this.nodes.forEach((node) => node.setIsDragging(false));
      this.edges.forEach((edge) => edge.setIsDragging(false));

      // TODO: this.rolledOverObjects.forEach((obj) => obj.setIsDragging(false));
    }
    mouseReleased(p) {
      console.log("mouse released");
      this.clearDragTargets();
    }
    getDragTarget() {
      const nodeList = this.nodes;
      const edgeList = this.edges;
      const plugList = this.nodes.flatMap((node) => node.getPlugs());

      // TODO: check tools for rollover
      // TODO: Initialize and store toolbox data in this class
      // TODO: check toolbox for rollover
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
            console.warn(`plug: ${plug.toString()} is rolled over`);
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
            console.warn(`edge: ${edge.toString()} is rolled over`);
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
            console.warn(`node: ${node.toString()} is rolled over`);
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
      // DONE: Try setting "isDragging" to true on first node
      // TODO NEXT: Check for mouse button held down on node for drag
      //  1. If mouse button is held down, set node's "isDragging" to true
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
        RenderToolbox.render(this.toolbox);
      });

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
      // RENDER GRID & GUIDES
      RenderGuides.render();
    }
    testAddHtmlDiv() {
      const aDiv = document.createElement("p"); // is a node
      aDiv.innerHTML = "This is an HTML div appended to a top-layer div";
      const canvas = document.getElementById("htmlContainer");
      canvas === null || canvas === void 0 ? void 0 : canvas.appendChild(aDiv);
    }
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
      console.log(
        `ChartManager.mouseClicked() @ ${new Position(
          ChartManager.p.mouseX,
          ChartManager.p.mouseY
        )}`
      );
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
    p.createCanvas(800, 600);
    p.frameRate(30);
    p.background(248);

    // Classes with static methods that need access to p5.js
    initializeRenderers(p);
    chartManager = ChartManager.createInstance(p);
    CreationManager.createInstance();

    // const uxRect = UX.createUxRect(10,10,100,100);
    // UX.setUxFill(uxRect, 'rgb(255,0,0)');
    // UX.setUxEvent(uxRect, () => {
    //   console.log('CLICKED!')
    // });
    // const gui = createGui("My awesome GUI");
  };

  let p;
  function mouseClicked() {
    // console.log(`draw.ts: mouseClicked()`);
    chartManager.mouseClicked();
  }
  const draw = (_p) => {
    p = _p;
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
