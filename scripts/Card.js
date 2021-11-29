import { Cover } from "./Cover.js";
import { Label } from "./Label.js";
import { Node } from "./Node.js"
import { Sprite } from "./Sprite.js";

export class Card extends Node {
    constructor(index, value, cardWidth, cardHeight) {
        super();
        this._number = null;
        this._value = null;
        this._cover = null;
        this._label = null;
        this._sprite = null;
        this.isOpen = false;
        this.setSize(cardWidth, cardHeight);
        this.initCard(index, value);
        this.posX = 0;
        this.posY = 0;
    }
    numberCard() {
        return this._number;
    }
    valueCard() {
        return this._value;
    }

    initCard(index, value) {
        this._number = index;
        this.element.id = "card" + index;
        this.element.style.cursor = "pointer";
        this.changeValueCard(value);
        this._sprite.element.id = "sprite" + index;

        this._cover = new Cover(this.width, this.height, "orange");
        this._cover.element.id = "cover" + index;

        this._label = new Label(index);
        this._label.setPosition(this.width / 2 - 7, this.height / 2 - 10);
        this._label.element.id = "label" + index;

        this._cover.addChild(this._label);
        this.addChild(this._sprite);
        this.addChild(this._cover);
    }

    changeValueCard(value) {
        this._value = value;
        this._sprite = new Sprite(this.width, this.height, "./img/" + value + ".jpeg");
    }

    flipOpen() {
        this.isOpen = true;

        let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
        tl.to(this.element, { scaleX: 0, duration: 0.2 })
            .add(() => {
                this.showCover(false);
            })
            .to(this.element, { scaleX: 1, duration: 0.2 })
    }

    flipClose() {
        let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
        tl.delay(1)
            .to(this.element, { scaleX: 0, duration: 0.2 })
            .add(() => { this.showCover(true) })
            .to(this.element, { scaleX: 1, duration: 0.2 })
            .add(() => { this.isOpen = false })
    }

    hideCard() {
        this.element.zIndex = "1";
        let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
        tl.delay(0.6)
            .fromTo(this.element, { scale: 1 }, { scale: 1.2, duration: 0.5 })
            .add(() => {
                this.setActive(false);
                this.showCover(true);
                tl.fromTo(this.element, { scale: 1.2 }, { scale: 1, duration: 0.2 })
            })
    }

    showCover(status) {
        this._cover.setActive(status);
    }
}