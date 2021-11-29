import { Node } from './Node.js';
export class Sprite extends Node {
    constructor(width, height, src) {
        super();
        this.initView();
        this.element.style.position = "absolute";
        this.setSize(width, height);
        this.setImage(src);
    }
    initView() {
        this.element = document.createElement('img');
    }
    setImage(src) {
        this.element.src = src;
    }
}