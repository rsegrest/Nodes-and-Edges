import p5 from "p5";
// import { setup } from "../setup";
// import { draw } from "../draw";
import { createSketch } from "../p5-util/sketch";
import InspectorModel from "../model/inspector/InspectorModel";
import LayoutInspector from "../model/inspector/LayoutInspector";
import ApplicationModel from "../model/ApplicationModel";
import CreationManager from "../controller/CreationManager";
import Position from "../model/positioning/Position";
import Dimension from "../model/positioning/Dimension";
import NodeModel from "../model/NodeModel";
import MouseManager from "../controller/MouseManager";
import Layout from "../model/positioning/Layout";

describe("Nodes & Edges tests", () => {
  let p: p5;

  beforeEach(() => {
    Layout.createInstance(1200, 800);
    const setup = (p: p5): void => {
      p.createCanvas(400, 400);
    };
    const draw = (p: p5): void => {
      p.createCanvas(800, 600);
      p.background(10);
    };

    const sketch = createSketch({
      setup,
      draw,
    });
    expect(sketch).not.toBeNull();
    p = new p5(sketch);
  });
  it('should create inspector', () => {
    const inspector: InspectorModel = new InspectorModel();
    expect(inspector).not.toBeNull();
  })
  it('should set up models correctly', () => {
    const appModel = ApplicationModel.createInstance();
    appModel.initializeForDev();
    
    // verify set up is correct
    expect(appModel.getNodes().length).toBe(4);
    expect(appModel.getEdges().length).toBe(3);
    expect(appModel.getToolbox()).not.toBeNull();
    expect(appModel.getEdges()).not.toBeNull();
  })

  it('should lay out inspector panel correctly', () => {
    const appModel = ApplicationModel.createInstance();
    appModel.initializeForDev();
    
    const inspector = appModel.getInspector();
    // appModel.getInspector().layoutInspector(appModel);
    expect((inspector.getPosition() as Position).x).toBe(10);
    expect((inspector.getPosition() as Position).y).toBe(400);

    expect((inspector.getDimensions() as Dimension).width).toBe(300);
    expect((inspector.getDimensions() as Dimension).height).toBe(190);
  });

  it('should create only header rows for inspector without position', () => {
    const appModel = ApplicationModel.createInstance();
    appModel.initializeForDev();
    const rows = LayoutInspector.createRowsFromInputAndOutputParameters([], []);
    expect(rows.length).toBe(2);
  });

  it('should create rows for input, output, and headings for inspector table without position', () => {
    const appModel = ApplicationModel.createInstance() as ApplicationModel;
    appModel.initializeForDev();
    const nodes = appModel.getNodes() as NodeModel[];
    const inputParams = (nodes[0] as NodeModel).getInputParameterList();
    const outputParams = (nodes[0] as NodeModel).getOutputParameterList();
    expect(inputParams.length).toBe(4);
    expect(outputParams.length).toBe(4);
    const rows = LayoutInspector.createRowsFromInputAndOutputParameters(
      inputParams,
      outputParams
    );
    // should have 4 of each type of param, and 2 headings
    expect(rows.length).toBe(10);
  });

  const createTestRows = () => {
    const appModel = ApplicationModel.createInstance() as ApplicationModel;
    appModel.initializeForDev();
    const nodes = appModel.getNodes() as NodeModel[];
    const inputParams = (nodes[0] as NodeModel).getInputParameterList();
    const outputParams = (nodes[0] as NodeModel).getOutputParameterList();
    expect(inputParams.length).toBe(4);
    expect(outputParams.length).toBe(4);
    const rows = LayoutInspector.createRowsFromInputAndOutputParameters(
      inputParams,
      outputParams
    );
    return rows;
  }
  
  it('should calculate a position for an individual row with no offset ', () => {
    const rowNum = 0;
    const rowHeight = 25;
    const rowPos = LayoutInspector.calcRowPosition(rowNum, rowHeight);
    expect(rowPos).toStrictEqual(new Position(0,0));

    const secondRowNum = 2;
    const secondRowPos = LayoutInspector.calcRowPosition(secondRowNum, rowHeight);
    expect(secondRowPos).toStrictEqual(new Position(0,50));
  })

  it('should set position for parameter rows with no offsets', () => {
    const testRows = createTestRows();
    const rowHeight = 25;
    const xInspectorLeft = 0;
    const yInspectorTop = 0;
    const yTableOffset = 0;
    LayoutInspector.assignPositionsToRows(
      testRows, rowHeight,
      xInspectorLeft, yInspectorTop, yTableOffset
    );
    // send to get position function
    expect(testRows[0]!.getPosition()).toStrictEqual(new Position(0,0));
    expect(testRows[1]!.getPosition()).toStrictEqual(new Position(0,25));
    expect(testRows[9]!.getPosition()).toStrictEqual(new Position(0,250));
  })


  it('should set position for parameter rows with offsets', () => {
    const testRows = createTestRows();
    const rowHeight = 25;
    const xInspectorLeft = 10;
    const yInspectorTop = 400;
    const yTableOffset = 50;
    LayoutInspector.assignPositionsToRows(
      testRows, rowHeight,
      xInspectorLeft, yInspectorTop, yTableOffset
    );
    // send to get position function
    expect(testRows[0]!.getPosition()).toStrictEqual(new Position(10,450));
    expect(testRows[1]!.getPosition()).toStrictEqual(new Position(10,475));
    expect(testRows[2]!.getPosition()).toStrictEqual(new Position(10,500));

    expect(testRows[6]!.getPosition()).toStrictEqual(new Position(10,600));
    expect(testRows[9]!.getPosition()).toStrictEqual(new Position(10,675));
    
  })
  
  // it("should display a node's parameters in inspector after selection", () => {
  //   const appModel = ApplicationModel.createInstance();
  //   appModel.initializeForDev();
    
  //   const inspector = appModel.getInspector();
    
  //   // click a node
  //   const nodeForSelection = (appModel.getNodes()[0] as NodeModel);
  //   const nodePosition = nodeForSelection.getPosition();
  //   expect(nodePosition).not.toBeNull();
  //   if (!nodePosition) return;
  //   expect(appModel.getSelectedNodes().length).toBe(0);
  //   MouseManager.mouseClicked(nodePosition.x+5, nodePosition.y+5, appModel);
  //   expect(appModel.getSelectedNodes().length).toBe(1);
  //   // when node is selected, parameters should have position and dimension
  //   //    added using LayoutInspector

  //   // TODO: Find where inspector is currently populated with parameters

  //   // create inspector (done)
  //   // create table

  //   const inputParams = nodeForSelection.getInputParameterList();
  //   const outputParams = nodeForSelection.getOutputParameterList();
  //   expect(inputParams.length).toBe(4);
  //   expect(outputParams.length).toBe(4);
  // })
});
