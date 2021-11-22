export class Node {
    constructor(){
        this._x = 0;
        this._y = 0;
        this._width = 100;
        this._height = 100;
        this._children = [];
        this.initView();
        this.view.style.display = "";
        this.view.style.position = "absolute";
        this.view.style.borderRadius = "8px";
    }

    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this.view.style.left = this._x + 'px';
    }

    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this.view.style.top = this._y + 'px';
    }

    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
        this.view.style.width = this._width + 'px';
    }

    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
        this.view.style.height = this._height + 'px';
    }

    
    active(isActive) {
        this._active = isActive;
        if(isActive) this.view.style.display = "";
        else this.view.style.display = "none";
        
    }

    initView(){
        this.view = document.createElement('div');
        this.setSize(this._width, this._height)
        // this.view.style.backgroundSize = "contain";
        this.view.style.backgroundRepeat = "no-repeat";
    }
    setBackGround(backGround){
        this.view.style.backgroundImage = backGround;
        this.view.style.backgroundSize = "contain";
    }

    addChild(node){
        this._children.push(node);
        this.view.appendChild(node.view);
    }
    
    setSize(widths, heights){
        this.width = widths;
        this.height = heights;
    }

    setPosition(posX, posY){
        this.x = posX;
        this.y = posY;
    }
    
}