import { Node } from "./Node.js";
import { Card } from "./Card.js";
import { Label } from "./Label.js"
import { Cover } from "./Cover.js";

let canClick = true;
let openedCard = [];
let cardRemain;
let scoreTotal = 10000;



export class GameController extends Node {
    constructor() {
        super();
        this._cardWidth = 100;
        this._cardHeight = 130;
        this._row = 4;
        this._colum = 5;
        this._offsetX = 20;
        this._offsetY = 100;

        this._cardRemain = this._row * this._colum;
        this._scoreLabel;
        this._scoreBoard;
        this._cards = [];

        this.initGameBackground();
        this.initGame("new");
    }
    initGameBackground() {
        document.body.appendChild(this.element);
        this.element.style.width = this._offsetX + this._colum * (this._cardWidth + this._offsetX) + "px";
        this.element.style.height = this._offsetY + this._row * (this._cardHeight + this._offsetX * 1.5) + "px";
        this.element.style.backgroundColor = "#ccffcc";

        this.setScoreBox();


    }
    setScoreBox() {
        this._scoreBoard = new Cover();
        this._scoreLabel = new Label();
        this._scoreBoard.addChild(this._scoreLabel);
        this._scoreBoard.element.style.width = this._cardHeight * 2 + "px";
        this._scoreBoard.element.style.height = this._cardWidth * (3 / 4) + "px";
        this._scoreBoard.element.style.backgroundColor = "#ffbf00";
        this._scoreBoard.element.style.position = "absolute";
        this._scoreBoard.element.style.left = (this._row * this._cardWidth - this._offsetX) / 2 + "px"
        this._scoreBoard.element.style.top = (this._colum * this._cardHeight - this._offsetX * 0.5) + "px"
        this._scoreBoard.element.style.borderRadius = "16px";
        this._scoreLabel.setPosition(this._cardWidth * (2.5 / 4), this._cardHeight / 5)
        this._scoreLabel.setSize(250, 120);
        this.addChild(this._scoreBoard);
        this._scoreLabel.element.id = "scoreView"
    }

    initGame(gameStatus) {
        if (gameStatus === "new") {
            this._cards = makeRandomListCard(10, 2);
            console.log(this._cards);
            this.instanceBoardGame()
            updateScore();
        }

    }

    instanceBoardGame() {
        let counter = 0
        for (let i = 0; i < this._row; i++) {
            for (let j = 0; j < this._colum; j++) {
                let card = new Card(counter + 1, this._cards[counter], this._cardWidth, this._cardHeight);
                card.setPosition(this._offsetX + j * (this._cardWidth + this._offsetX), this._offsetX + i * (this._cardHeight + this._offsetX))
                card.element.addEventListener("mousedown", onClickCard.bind(card))
                this.addChild(card);
                counter++;
            }
        }
        cardRemain = (counter);
    }
}

function makeRandomListCard(numberCard, mulNumber) {
    let cardList = [];
    for (let i = 1; i <= numberCard; i++) {
        for (let j = 1; j <= mulNumber; j++) {
            cardList.push(i);
        }
    }
    //cardList.sort(() => Math.random() - 0.5);
    return cardList;
}

function onClickCard(card) {
    if (!canClick) return;
    if (openedCard.length != 0 && this.numberCard() === openedCard[0].numberCard()) return;
    canClick = false;

    setTimeout(function (card) {
        card.showCover(false);

    }, 500, this);

    let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 })
    tl.to(this.element, { scaleX: 0, duration: 0.5 })

    tl.to(this.element, { scaleX: 1, duration: 0.5 })


    if (openedCard.length === 0) {
        openedCard.push(this)
        canClick = true;
        return;
    }

    if (this.valueCard() == openedCard[0].valueCard()) {
        console.log(true)
        cardRemain += -2;
        //let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 })
        tl.fromTo(this.element, { scale: 1 }, { scale: 1.3, duration: 0.9 })
        tl.fromTo(openedCard[0].element, { scale: 1 }, { scale: 1.3, duration: 0.9 })
        setTimeout(function (card, openedCard) {
            card.showCard(false);
            openedCard[0].showCard(false);
            updateScore(1000);
            reset();
        }, 2000, this, openedCard);
    } else {
        updateScore(-500)
        let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 })
        tl.to(openedCard[0].element, { scaleX: 0, duration: 0.5 })
        tl.to(openedCard[0].element, { scaleX: 1, duration: 0.5 })
        tl.to(this.element, { scaleX: 0, duration: 0.5 })
        tl.to(this.element, { scaleX: 1, duration: 0.5 })

        setTimeout(function (card, openedCard) {
            openedCard[0].showCover(true)
            card.showCover(true);
            reset();
        }, 1500, this, openedCard);
    }
}

function updateScore(_value) {
    _value ? scoreTotal += _value : 0;
    let scoreView = document.getElementById("scoreView");
    scoreView.innerHTML = "Score: " + scoreTotal;
    scoreView.style.fontSize = "x-large"
    checkWinLose(scoreTotal);
}

function checkWinLose(_score) {
    if (_score <= 0) {
        scoreTotal = 0;
        console.log("You Lose Game");
        confirm("You Lose Game")
        window.location.reload();
    }
    if (cardRemain <= 0) {
        setTimeout(function () {
            confirm("You Win Game");
            window.location.reload();
        }, 800);
    }
}


function reset() {
    canClick = true;
    openedCard = [];
}

