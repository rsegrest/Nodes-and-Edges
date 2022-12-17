import Layout from "../positioning/Layout";
import Dimension from "../positioning/Dimension";
import Position from "../positioning/Position";
import InputParameterModel from "../InputParameterModel";
import OutputParameterModel from "../OutputParameterModel";
import InspectorModel from "./InspectorModel";
import InspectorHeadingRow from "./InspectorHeadingRow";
import InspectorInfoRow from "./InspectorInfoRow";
import InspectorInfoColumn from "./InspectorInfoColumn";
import PlugModel from "../PlugModel";

class LayoutInspector {

  private static readonly DEFAULT_INSPECTOR_WIDTH = 600;
  private static readonly DEFAULT_INSPECTOR_HEIGHT = 300;
  // SPIRAL 3 TODO: Make panel draggable using title bar
  public static readonly X_POSITION = 10;
  public static Y_POSITION:number; // based on canvas height

  public static readonly Y_FIRST_ROW_OFFSET = 30;
  public static readonly ROW_HEIGHT = 30;
  public static readonly ROW_WIDTH = 600;
  public static readonly Y_TABLE_START = 20;

  // Parameter row constants
  public static readonly PARAM_NAME_COLUMN_WIDTH = 150;
  // public static readonly PARAM_VALUE_COLUMN_WIDTH = 150;

  private static instance:LayoutInspector|null = null;
  private static layout:Layout;
  private static position:Position = new Position(0,0);
  private static dimensions:Dimension = new Dimension(0,0);

  private constructor(
    pos:Position,
    dim:Dimension) {
    LayoutInspector.position = pos;
    LayoutInspector.dimensions = dim;
    LayoutInspector.Y_POSITION = Layout.getHeight()-200;
    LayoutInspector.layout = Layout.getInstance();
  }

  static createInstance(pos:Position, dim:Dimension):LayoutInspector {
    // const newPos = new Position(10,400);
    // const newDim = new Dimension(300, 190);
    LayoutInspector.instance = new LayoutInspector(pos, dim);
    return LayoutInspector.instance;
  }
  static getInstance():LayoutInspector {
    if (LayoutInspector.instance === null) {
      throw(new Error('InspectorLayout instance is null'));
    }
    return LayoutInspector.instance;
  }

  static getPosition():Position {
    return LayoutInspector.position;
  }
  static getDimensions():Dimension {
    return LayoutInspector.dimensions;
  }

  static createRowsFromInputAndOutputParameters(
    inputParams:InputParameterModel[],
    outputParams:OutputParameterModel[],
  ):(InspectorHeadingRow|InspectorInfoRow)[] {
    let rowCount = 0;
    const createdRows:(InspectorHeadingRow|InspectorInfoRow)[] = [];


    const inputHeading = new InspectorHeadingRow(
      "Input Parameters", rowCount+=1
    );

    const inputRows = inputParams.map((param:InputParameterModel) => {
      return new InspectorInfoRow(param, rowCount += 1);
    });
    
    const outputHeading = new InspectorHeadingRow(
      "Output Parameters", rowCount += 1
    );

    const outputRows = outputParams.map((param:OutputParameterModel) => {
      return new InspectorInfoRow(param, rowCount += 1);
    });

    createdRows.push(inputHeading);
    createdRows.push(...inputRows);
    createdRows.push(outputHeading);
    createdRows.push(...outputRows);
    return createdRows;
  }

  static assignDimensionsToRows(
    rows:(InspectorHeadingRow|InspectorInfoRow)[],
    rowWidth = this.ROW_WIDTH,
    rowHeight = this.ROW_HEIGHT
  ):(InspectorHeadingRow|InspectorInfoRow)[] {
    rows.forEach((row) => row.setDimensions(
      new Dimension(rowWidth, rowHeight)
    ));
    return rows;
  }

  static assignPositionsToRows(
    rows:(InspectorHeadingRow|InspectorInfoRow)[],
    rowHeight:number=LayoutInspector.ROW_HEIGHT,
    xInspectorLeft=0,
    yInspectorTop=0,
    yTableOffset=this.Y_FIRST_ROW_OFFSET
  ):(InspectorHeadingRow|InspectorInfoRow)[] {
    rows.forEach((row, index) => row.setPosition(
      LayoutInspector.calcRowPosition(
        index, rowHeight, xInspectorLeft, yInspectorTop, yTableOffset
      )
    ));

    return rows;
  }

  static calcRowPosition(
    rowNum:number,
    rowHeight:number,
    xInspectorLeft=0,
    yInspectorTop=0,
    yTableOffset=0
  ):Position {
 
    const yCalc = yInspectorTop
      +(rowNum*rowHeight)
      +yTableOffset;
    console.log('yCalc', yCalc)
    const rowPos = new Position(
      xInspectorLeft,
      yCalc
    );

    return rowPos;
  }

  static setParameterDimensions(
    parameter: InputParameterModel | OutputParameterModel,
    inspector: InspectorModel
  ):void {
    parameter.setDimensions(
      new Dimension(
        (inspector.dimensions as Dimension).width as number,
        this.ROW_HEIGHT
      )
    )
  }
}
export default LayoutInspector;