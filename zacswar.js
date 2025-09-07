const cac = new Image(); cac.src = 'cards/ace_of_clubs.png';
const cad = new Image(); cad.src = 'cards/ace_of_diamonds.png';
const cah = new Image(); cah.src = 'cards/ace_of_hearts.png';
const cas = new Image(); cas.src = 'cards/ace_of_spades.png';
const cfd = new Image(); cfd.src = 'back2.png'; // card face down

class Card{
  constructor(image, posX, posY, scaleX, scaleY, rotation, faceup, visible){
    this.image = image;
    this.posX = posX;
    this.posY = posY;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.rotation = rotation;
    this.faceup = faceup;
    this.visible = visible;
  }
  flipCard(){
    if(this.faceup){this.faceup = false;}
    else{this.faceup = true;}
  }
  drawCard(){
    ctx.save();
    ctx.translate(this.posX, this.posY);
    ctx.rotate(this.rotation * TO_RAD);
    ctx.translate(-(cardw * this.scaleX / 2), -(cardh * this.scaleY) / 2);
    if(this.faceup){
      ctx.drawImage(this.image, 0, 0, cardw * this.scaleX, cardh * this.scaleY);
    }
    else{
      ctx.drawImage(cfd, 0, 0, cardw * this.scaleX, cardh * this.scaleY);
    }
    ctx.restore();
  }
}
//*********************************************************************************
//                           ↓ main code below ↓
//*********************************************************************************

// Byron Knoll: http://code.google.com/p/vector-playing-cards/
// card pngs are 500 x 726
// for (let i = 0; i < base.length; i++) {base[i].flipCard();}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const dpr = window.devicePixelRatio || 1;
const baseCanvasWidth = 800;
const baseCanvasHeight = 550;
canvas.style.width = baseCanvasWidth + 'px';
canvas.style.height = baseCanvasHeight + 'px';
canvas.width = baseCanvasWidth * dpr;
canvas.height = baseCanvasHeight * dpr;
ctx.scale(dpr, dpr);

const TO_RAD = Math.PI / 180;
var loopid;
var loopspeed = 100;
const cardw = 500;
const cardh = 726;
const bgcolor = 'green';
var players = 2;
var lastplayers;
var game = "classic";

// ace is 1, jack is 11, queen is 12, king is 13, joker is 14
// 1 is clubs, 2 is diamonds, 3 is Hearts, 4 is spades
var player1num = 1;
var player1suit = 1;
var player2num = 1;
var player2suit = 1;
var player3num = 1;
var player3suit = 1;
var player4num = 1;
var player4suit = 1;

var base = [];//always start rotation at 0
base[0] = new Card(cas, 0, 0, 0, 0, 0, false, false);
base[1] = new Card(cas, 0, 0, 0, 0, 0, false, false);
base[2] = new Card(cas, 0, 0, 0, 0, 0, false, false);
base[3] = new Card(cas, 0, 0, 0, 0, 0, false, false);

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = bgcolor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  players = document.getElementById('Players').value;
  if(players != lastplayers){
    reset();
  }
  
  for (let i = 0; i < base.length; i++) {
    if(base[i].visible){
      base[i].drawCard();
    }
  }
  lastplayers = players;
}
function reset(){
  for (let i = 0; i < base.length; i++) {
    base[i] = new Card(cas, 0, 0, 0, 0, 0, false, false);
  }
  players = document.getElementById('Players').value;
  lastplayers = players;
  if(players == 2){
    player1num = Math.floor(Math.random() * 14) + 1; // 1 to 14
    player1suit = Math.floor(Math.random() * 4) + 1; // 1 to 4
    base[0] = new Card(cas, canvas.width / 2, canvas.height * 0.1, 0.15, 0.15, 180, false, true);
    base[1] = new Card(cac, canvas.width / 2, canvas.height * 0.9, 0.15, 0.15, 0, false, true);
  }
  else if(players == 3){
    base[0] = new Card(cas, canvas.width / 2, canvas.height * 0.1, 0.15, 0.15, 180, false, true);
    base[1] = new Card(cac, canvas.width / 2, canvas.height * 0.9, 0.15, 0.15, 0, false, true);
    base[2] = new Card(cad, canvas.width * 0.25, canvas.height / 2, 0.15, 0.15, 90, false, true);
  }
  else if(players == 4){
    base[0] = new Card(cas, canvas.width / 2, canvas.height * 0.1, 0.15, 0.15, 180, false, true);
    base[1] = new Card(cac, canvas.width / 2, canvas.height * 0.9, 0.15, 0.15, 0, false, true);
    base[2] = new Card(cad, canvas.width * 0.25, canvas.height / 2, 0.15, 0.15, 90, false, true);
    base[3] = new Card(cah, canvas.width * 0.75, canvas.height / 2, 0.15, 0.15, 270, false, true);
  }
}

function flipAll(){
  for (let i = 0; i < base.length; i++) {
    base[i].flipCard();
  }
}

loopid = setInterval(draw, loopspeed);
reset();
