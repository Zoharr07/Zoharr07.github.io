let fileName = [
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

var cardInfo = {
    cardNumber: 0,
    width: 120,
    height: 140,
    top: 0,
    left: 0,
    margin: 3,
    coverColor: "green",
    backGroudColor: "orange",
    backGroundImg: "./",
    imageNum: 0
}

let counterClick = 0;
let row = 4;
let col = 5;
let openedCard = [];
let openCardNum = 0;
let cardList = [];
let scoreTotal = 10000;
let count = row * col;

makeRandomListCard();

var mainBG = document.createElement("div")
document.body.appendChild(mainBG)
mainBG.style.width = col * (cardInfo.width + cardInfo.margin * 2).toString() + "px";
mainBG.style.backgroundColor = "blue";
mainBG.style.display = "flex";
mainBG.style.flexWrap = "wrap";

var score = document.createElement("div");
mainBG.appendChild(score);
score.style.width = col * cardInfo.width + "px";
score.style.fontSize = "50px";
updateScore();

instanceCard();



function instanceCard(){
    let countCard = 0;
    for(let i = 0; i < col; i++){
        for(let j = 0; j < row; j++){
            let _cardInfo = JSON.parse(JSON.stringify(cardInfo));
            countCard++;
            _cardInfo.cardNumber += countCard;
            _cardInfo.imageNum = cardList[countCard - 1];
            addElement(_cardInfo);
        }
    }
}

function addElement(cardRef) {
    var cardsIE = document.createElement("div"); 
    mainBG.appendChild(cardsIE);
    setCard(cardsIE, cardRef);
    
    var coverIE = document.createElement("div");
    cardsIE.appendChild(coverIE);
    setCover(coverIE, cardRef);

    var numLabelIE = document.createElement("div");
    coverIE.appendChild(numLabelIE);
    setNumlabel(numLabelIE, cardRef);

    addEvenListenerCard(cardsIE, coverIE, cardRef);
}

function makeRandomListCard(){
    createListCard(10, 2);
    let temp = [];
    let rand = shuffle(cardList);
    for(let i = 0; i< rand.length; i++) temp.push(cardList[rand[i]]);
    cardList = temp;
}

function createListCard(number, numberRep){
    for(let i = 0; i < number; i++){
        for(let j = 0; j < numberRep; j++){
            cardList.push(i);
        }
    }  
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

function addEvenListenerCard(_card, _cover, _cardRef){
    let key;
    _card.addEventListener('mousedown', function(){
        if(_cover.style.display != 'none') {
            if(key != false){
                if(openedCard.length < 2){ 
                    setActiveElement("cover" + _cardRef.cardNumber, "none");            
                    openedCard.push([_cardRef, _cover, _cardRef]);
                }
                if(openedCard.length > 1){
                    if(openedCard[0][2].imageNum === openedCard[1][2].imageNum){                    
                        let idSave = "card" + openedCard[0][2].cardNumber;
                        key = false;
                        setTimeout(function(){
                            setActiveElement(idSave, "none");
                            setActiveElement("card" + _cardRef.cardNumber, "none");
                            key = true;
                        },800);
                        count -=2;
                        updateScore(1000);                         
                    }
                    else{
                        key = false
                        updateScore(-500);                  
                        let idSave = "cover" + openedCard[0][2].cardNumber;
                        setTimeout(function(){
                            setActiveElement(idSave, "");  
                            setActiveElement(_cover.id, "");
                            key = true
                        },1000);
                    }  
                    openedCard = [];  
                }
            }
        }
    })
}

function setCover(_cover, _cardRef){
    _cover.style.top  = _cardRef.top + "px";
    _cover.style.left  = _cardRef.left + "px";
    _cover.style.width  = _cardRef.width + "px";
    _cover.style.height  = _cardRef.height + "px";
    _cover.style.backgroundColor = _cardRef.coverColor;
    _cover.id = "cover" + _cardRef.cardNumber;
}

function setCard(cards,_cardRef){
    cards.style.backgroundSize = "contain";
    cards.style.backgroundRepeat = "no-repeat";
    cards.style.width = _cardRef.width + "px";
    cards.style.height = _cardRef.height + "px";
    cards.style.top = _cardRef.top + "px";
    cards.style.left = _cardRef.left + "px";
    cards.style.margin = _cardRef.margin + "px";
    cards.style.cursor = "pointer";
    cards.style.backGroudColor = "orange"
    cards.style.backgroundImage = fileName[_cardRef.imageNum];
    cards.id = "card" + _cardRef.cardNumber;
}

function setNumlabel(_numlabel, _cardRef){
    _numlabel.style.position = "absolute";
    _numlabel.innerHTML = _cardRef.cardNumber;
    _numlabel.style.fontSize = "30px";
}

function setActiveElement(_target, _status){
    document.getElementById(_target).style.display = _status;
}

function updateScore(_value){
    _value ? scoreTotal += _value : 0;
    score.innerHTML = "Your Score: " + scoreTotal;
    checkWinLose(scoreTotal);
}

function checkWinLose(_score){
    if(_score < 0){
        scoreTotal = 0;
        console.log("You Lose Game");
        confirm("You Lose Game")
        window.location.reload();
    }
    if(count <= 0){
        confirm("You Win Game");
        window.location.reload();
    }
}
