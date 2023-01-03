class P5Reference {
    constructor(p) {
        P5Reference.p = p;
    }
    static createInstance(p) {
        P5Reference.instance = new P5Reference(p);
        return P5Reference.instance;
    }
    static getInstance() {
        if (P5Reference.instance === null) {
            throw (new Error('P5Reference instance is null'));
        }
        return P5Reference.instance;
    }
}
P5Reference.instance = null;
P5Reference.p = null;
export default P5Reference;
