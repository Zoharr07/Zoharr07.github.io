import { Node } from "./Node.js";
export class Button extends Node {
    constructor(string, x, y) {
        super();
        this._string = string || "";
        this.string = this._string;
        this.element.style.color = "black";
        this.element.style.fontSize = "26px";
        this.height = 50;
        this.setPosition(x, y)
        this.setSize(120, 60)
        this.element.style.backgroundColor = "green";
        this.element.style.border = "2px solid black";
        this.element.style.justifyContent = "center";
        this.element.style.display = "flex";
        this.element.style.alignItems = "center";
        this.element.style.cursor = "pointer";
    }

    get string() {
        return this._string;
    }

    set string(value) {
        this._string = value;
        this.element.innerHTML = this._string;
    }
    showButton() {
        this.element.style.visibility = "visible";
        this.element.style.display = "flex";
    }
    hideButton() {
        this.element.style.display = "none";
    }
}