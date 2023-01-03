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
export default Boundary;
