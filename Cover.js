import { Node } from './Node.js';
export class Cover extends Node {
    constructor(width, height, color) {
        super();
        this.setCoverColor(color);
        this.setSize(width, height);
    }
    setCoverColor(color) {
        this.element.style.backgroundColor = color;
    }
}