import Layout from "./Layout";
import Dimension from "./Dimension";
import Position from "./Position";
class InspectorLayout {
    constructor(pos = new Position(0, 0), dim = new Dimension(0, 0)) {
        InspectorLayout.position = pos;
        InspectorLayout.dimensions = dim;
    }
    static createInstance() {
        const newPos = new Position(10, 400);
        const newDim = new Dimension(300, 190);
        InspectorLayout.instance = new InspectorLayout(newPos, newDim);
        return InspectorLayout.instance;
    }
    static getInstance() {
        if (InspectorLayout.instance === null) {
            throw (new Error('InspectorLayout instance is null'));
        }
        return InspectorLayout.instance;
    }
}
InspectorLayout.instance = null;
InspectorLayout.layout = Layout.getInstance();
InspectorLayout.position = new Position(0, 0);
InspectorLayout.dimensions = new Dimension(0, 0);
export default InspectorLayout;
