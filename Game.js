import { Cover } from "./Cover.js";
import { Label } from "./Label.js";
import { Node } from "./Node.js"

let imageURL = [
    "url('./img/1.jpeg')",
    "url('./img/2.jpeg')",
    "url('./img/3.jpeg')",
    "url('./img/4.jpeg')",
    "url('./img/5.jpeg')",
    "url('./img/6.jpeg')",
    "url('./img/7.jpeg')",
    "url('./img/8.jpeg')",
    "url('./img/9.jpeg')",
    "url('./img/10.jpeg')",
]

let canClick = true;
let firstIndex = null;
let firstValue = null;
let cards = [];

let colum = 5;
let row = 4;
let offsetX = 20;
let offsetY = 100;
let count = 0;
let scoreTotal = 10000;
let cardRemain = colum*row;

let cardWidth = 100;
let cardHeight = 120;

//document.body.style.backgroundColor = "#e6ffcc";
let mainBG = document.createElement("div")
document.body.appendChild(mainBG)
mainBG.style.width = offsetX + colum * (cardWidth + offsetX) + "px";
mainBG.style.height = offsetY + row * (cardHeight + offsetX) + "px";
mainBG.style.backgroundColor = "#ccffcc";

let scoreBoard = document.createElement("div")
mainBG.appendChild(scoreBoard)
let scoreLabel = new Label();
scoreBoard.appendChild(scoreLabel.view);


setScoreBox();   
updateScore(0);
makeRandomListCard(10,2);
instanceBoardGame();


function setScoreBox(){
    scoreBoard.style.width = cardHeight*2 + "px";
    scoreBoard.style.height = cardWidth*(3/4) + "px";
    scoreBoard.style.backgroundColor = "#ffbf00";
    scoreBoard.style.position = "absolute";
    scoreBoard.style.left = (row* cardWidth - offsetX)/2 + "px"
    scoreBoard.style.top = (colum* cardHeight - offsetX) + "px"
    scoreBoard.style.borderRadius = "16px";
    scoreLabel.setPosition(cardWidth*(2.5/4), cardHeight/5)
    scoreLabel.setSize(250, 120)  
}

function instanceBoardGame(){
    for(let i = 0; i < row; i++){
        for(let j = 0; j < colum; j++){
            count++;
            let card = Card(count, cards[count - 1]);
            card.setPosition(offsetX + j * (cardWidth + offsetX), offsetX + i* (cardHeight + offsetX))
            mainBG.appendChild(card.view);
        }
    }
}

function Card(index, value) {
    let card = new Node();   
    card.setSize(cardWidth, cardHeight);
    card.setBackGround(imageURL[value]);
    card.view.id = "card" + index;
    let cover = new Cover();
    let label = new Label(index);
    cover.addChild(label);
    cover.setSize(card.width, card.height);
    cover.view.id = "cover" + index;
    card.addChild(cover);
    card.view.style.transition = "transform 0.8s";
    card.view.style.transformStyle = "preserve-3d";
    addEvenListenerCard(card, cover, index, value);
    return card;
}

function addEvenListenerCard(card, cover, index, value) {
    card.view.addEventListener('mousedown', function(){
        if (!canClick) return;
        card.view.style.transform = "rotateY(180deg)";
        setTimeout(function(){
            if(cover.view.style.display != 'none') {
                cover.active(false)
                if (firstValue === null) {
                    firstIndex = index;
                    firstValue = value;
                    return;
                } 
                canClick = false;   
                if (firstValue === value) {
                    cardRemain += -2;
                    updateScore(1000);                
                    setTimeout(function(){
                        setActiveElement("card"+index, "none");
                        setActiveElement("card"+firstIndex, "none");
                        reset();
                    },800);    
                } else {
                    updateScore(-500)
                    setTimeout(function(){
                        setActiveElement("cover"+index, "");
                        setActiveElement("cover"+firstIndex, "");
                        card.view.style.transform = "rotateY(360deg)";
                        document.getElementById('card'+firstIndex).style.transform = "rotateY(360deg)";
                        reset();
                    },900);
                }
            }
            
        },500);
    })
}

function reset(){
    canClick = true;
    firstIndex = null;
    firstValue = null;
}

function setActiveElement(_target, _status){
    document.getElementById(_target).style.display = _status;
}

function makeRandomListCard(number, numberRep){
    for(let i = 0; i < number; i++){
        for(let j = 0; j < numberRep; j++){
            cards.push(i);
        }
    }
    let temp = [];
    let rand = shuffle(cards);
    for(let i = 0; i< rand.length; i++) temp.push(cards[rand[i]]);
    cards = temp;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }  
    return array;
}

function updateScore(_value){
    _value ? scoreTotal += _value : 0;
    scoreLabel.view.innerHTML = "Score: " + scoreTotal;
    scoreLabel.view.style.fontSize = "x-large"
    checkWinLose(scoreTotal);
}

function checkWinLose(_score){
    if(_score <= 0){
        scoreTotal = 0;
        console.log("You Lose Game");
        confirm("You Lose Game")
        window.location.reload();
    }
    if(cardRemain <= 0){
        setTimeout(function(){
            confirm("You Win Game");
            window.location.reload();
        },800);
    }
}


