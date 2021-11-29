export class Node {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._width = 100;
        this._height = 100;
        this._children = [];
        this.element;
        this._active = true;
        this.initElement();
    }

    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this.element.style.left = this._x + 'px';
    }

    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this.element.style.top = this._y + 'px';
    }

    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
        this.element.style.width = this._width + 'px';
    }

    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
        this.element.style.height = this._height + 'px';
    }

    initElement() {
        this.element = document.createElement('div');
        this.setSize(this._width, this._height);
        this.element.style.backgroundRepeat = "no-repeat";
        this.element.style.display = "";
        this.element.style.position = "absolute";
        this.element.style.borderRadius = "8px";
        this.element.style.userSelect = "none";
    }

    addChild(node) {
        this._children.push(node);
        this.element.appendChild(node.element);
    }

    setSize(w, h) {
        this.width = w;
        this.height = h;
    }

    setPosition(posX, posY) {
        this.x = posX;
        this.y = posY;
    }

    getActive() {
        return this._active;
    }
    setActive(isActive) {
        this._active = isActive;
        if (isActive) this.element.style.display = "";
        else this.element.style.display = "none";
    }
}