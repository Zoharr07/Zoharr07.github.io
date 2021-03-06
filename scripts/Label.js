import { Node } from './Node.js';
export class Label extends Node {
    constructor(string) {
        super();
        this._string = string || "";
        this.string = this._string;
        this.element.style.color = 'white';
        this.element.style.fontSize = "x-large";
        this.element.id = "scoreView";
        this.setSize(50, 50);
    }

    get string() {
        return this._string;
    }
    set string(value) {
        this._string = value;
        this.element.innerHTML = this._string;
        this.element.style.alignItems = "center";
    }
}
