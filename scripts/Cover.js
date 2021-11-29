import { Node } from "./Node.js";
export class Cover extends Node {
    constructor(width, height) {
        super();
        this.setCoverColor("url('./img/backCard.jpeg')");
        this.setSize(width, height);
    }
    setCoverColor(color) {
        this.element.style.backgroundImage = color;
        this.element.style.backgroundSize = "contain";
    }
}