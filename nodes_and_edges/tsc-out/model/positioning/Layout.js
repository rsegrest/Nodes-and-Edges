import ApplicationModel from "../ApplicationModel";
import InspectorModel from "../inspector/InspectorModel";
import ToolboxModel from "../ToolboxModel";
import Dimension from "./Dimension";
import Position from "./Position";
export class Layout {
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
        // console.log('Layout.height : ' + Layout.height);
        const inspectorPosition = new Position(10, this.height - (inspectorHeight + 10));
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
        const toolboxPosition = new Position(screenWidth - (toolboxWidth + 10), 10);
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
            tool.setPosition(new Position((OFFSET_X + (toolboxPosition.x) + (90 * (i % 2))), // - (toolWidth + 10) + ((i % 2)*(toolWidth + 10))
            (toolboxPosition.y) + FIRST_ROW_Y + (Math.floor(i / 2)) * 50));
        }
    }
    static positionPanel(element) {
        if ((this.width === 0) || (this.height === 0)) {
            throw new Error('Layout dimensions are not set');
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
export default Layout;
