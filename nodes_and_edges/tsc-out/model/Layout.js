export class Layout {
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
            throw new Error('Layout instance is not created yet');
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
export default Layout;
