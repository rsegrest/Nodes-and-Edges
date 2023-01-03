export class Dimension {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    toString() {
        return `Dimension:(width:${this.width},  height:${this.height})`;
    }
}
export default Dimension;
