import { Node } from './Node.js';
export class Cover extends Node {
    constructor(){
        super();
        this.view.style.backgroundColor = "orange";
    }
    setBGColor(){
        this.view.style.backgroundColor = "orange";
    }
}