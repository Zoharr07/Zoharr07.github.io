import { Node } from './Node.js';
export class Label extends Node {
    constructor(string) {
        super();
        this._string = string || "";
        this.string = this._string;
        this.view.style.color = 'black';
        this.setPosition(this.width/2 - 5, this.height/2 - 5)
    }

    get string() {
        return this._string;
    }

    set string(value) {
        this._string = value;
        this.view.innerHTML = this._string;
    }
}
