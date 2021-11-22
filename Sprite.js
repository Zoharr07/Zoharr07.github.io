import { Node } from './Node.js';
export class Sprite extends Node {
    initView() {
        this.view = document.createElement('img');
    }
    setImage(src){
        this.view.src = src;
    }
}