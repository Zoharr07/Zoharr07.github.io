import { Cover } from "./Cover.js";
import { Label } from "./Label.js";
import { Node } from "./Node.js"
import { Sprite } from "./Sprite.js";

export class Card extends Node {
    constructor(index, value, cardWidth, cardHeight) {
        super();
        this._number = index;
        this._value = value;
        this._cover;
        this._label;
        this._sprite;
        this.setSize(cardWidth, cardHeight);
        this.initCard(index, value);
        this.showCover(true);
        this.showCard(true);
    }
    numberCard() {
        return this._number;
    }
    valueCard() {
        return this._value;
    }
    getCover() {
        return this._cover;
    }

    initCard(index, value) {
        this.element.id = "card" + index;

        this._sprite = new Sprite(this.width, this.height, "./img/" + value + ".jpeg");
        this._sprite.element.id = "sprite" + index;

        this._cover = new Cover(this.width, this.height, "orange");
        this._cover.element.id = "cover" + index;

        this._label = new Label(index);
        this._label.setPosition(this.width / 2 - 5, this.height / 2 - 10)
        this._label.element.id = "label" + index;

        this._cover.addChild(this._label);
        this.addChild(this._sprite);
        this.addChild(this._cover);
    }

    showCover(isShow) {
        this._cover.setActive(isShow)
    }

    showCard(isShow) {
        this.setActive(isShow)
    }
}


