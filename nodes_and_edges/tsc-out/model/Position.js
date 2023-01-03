export class Position {
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
export default Position;
