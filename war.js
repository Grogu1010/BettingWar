// ace is 14, jack is 11, queen is 12, king is 13, joker is 15
// 1 is clubs, 2 is diamonds, 3 is Hearts, 4 is spades
const c11 = new Image(); c11.src = 'cards/ace_of_clubs.png';
const c12 = new Image(); c12.src = 'cards/ace_of_diamonds.png';
const c13 = new Image(); c13.src = 'cards/ace_of_hearts.png';
const c14 = new Image(); c14.src = 'cards/ace_of_spades.png';
const c21 = new Image(); c21.src = 'cards/2_of_clubs.png';
const c22 = new Image(); c22.src = 'cards/2_of_diamonds.png';
const c23 = new Image(); c23.src = 'cards/2_of_hearts.png';
const c24 = new Image(); c24.src = 'cards/2_of_spades.png';
const c31 = new Image(); c31.src = 'cards/3_of_clubs.png';
const c32 = new Image(); c32.src = 'cards/3_of_diamonds.png';
const c33 = new Image(); c33.src = 'cards/3_of_hearts.png';
const c34 = new Image(); c34.src = 'cards/3_of_spades.png';
const cfd = new Image(); cfd.src = 'back.png'; // card face down

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
// for (let i = 0; i < current.length; i++) {current[i].flipCard();}

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
var p1winnum;
var p2winnum;
var p3winnum;
var p4winnum;
var p1winsuit;
var p2winsuit;
var p3winsuit;
var p4winsuit;
var winner = 1;

// ace is 1, jack is 11, queen is 12, king is 13, joker is 15
// 1 is clubs, 2 is diamonds, 3 is Hearts, 4 is spades
var player1num = 1;
var player1suit = 1;
var player2num = 1;
var player2suit = 1;
var player3num = 1;
var player3suit = 1;
var player4num = 1;
var player4suit = 1;
var base = [];
base[0] = new Card(c11, 0, 0, 0, 0, 0, false, false);
base[1] = new Card(c11, 0, 0, 0, 0, 0, false, false);
base[2] = new Card(c11, 0, 0, 0, 0, 0, false, false);
base[3] = new Card(c11, 0, 0, 0, 0, 0, false, false);

var current = [];//always start everthing at 0
current[0] = new Card(c11, 0, 0, 0, 0, 0, false, false);
current[1] = new Card(c11, 0, 0, 0, 0, 0, false, false);
current[2] = new Card(c11, 0, 0, 0, 0, 0, false, false);
current[3] = new Card(c11, 0, 0, 0, 0, 0, false, false);

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = bgcolor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  players = document.getElementById('Players').value;
  if(players != lastplayers){
    reset();
  }
  
  for (let i = 0; i < current.length; i++) {
    if(current[i].visible){
      current[i].drawCard();
    }
  }
  for (let i = 0; i < base.length; i++) {
    if(base[i].visible){
      base[i].drawCard();
    }
  }
  lastplayers = players;
}
function reset(){
  for (let i = 0; i < current.length; i++) {
    current[i] = new Card(c11, 0, 0, 0, 0, 0, false, false);
  }
  for (let i = 0; i < base.length; i++) {
    base[i] = new Card(cfd, 0, 0, 0, 0, 0, false, false);
  }
  players = document.getElementById('Players').value;
  lastplayers = players;
  if(players == 2){
    player1num = Math.floor(Math.random() * 2) + 2; // 2 to 14
    player1suit = Math.floor(Math.random() * 4) + 2; // 2 to 4
    player2num = Math.floor(Math.random() * 2) + 2; // 2 to 14
    player2suit = Math.floor(Math.random() * 4) + 2; // 2 to 4
    var player1img = num2img(player1num, player1suit);
    var player2img = num2img(player2num, player2suit);

    current[0] = new Card(player1img, canvas.width / 2, canvas.height * 0.1, 0.15, 0.15, 180, false, true);
    current[1] = new Card(player2img, canvas.width / 2, canvas.height * 0.9, 0.15, 0.15, 0, false, true);
    base[0] = new Card(cfd, canvas.width / 2, canvas.height * 0.1, 0.15, 0.15, 180, false, true);
    base[1] = new Card(cfd, canvas.width / 2, canvas.height * 0.9, 0.15, 0.15, 0, false, true);
  }
  else if(players == 3){
    player1num = Math.floor(Math.random() * 2) + 2; // 2 to 14
    player1suit = Math.floor(Math.random() * 4) + 2; // 2 to 4
    player2num = Math.floor(Math.random() * 2) + 2; // 2 to 14
    player2suit = Math.floor(Math.random() * 4) + 2; // 2 to 4
    player3num = Math.floor(Math.random() * 2) + 2; // 2 to 14
    player3suit = Math.floor(Math.random() * 4) + 2; // 2 to 4
    if(player1num == 1){player1num = 14;};
    if(player1num == 1){player1num = 14;};
    var player1img = num2img(player1num, player1suit);
    var player2img = num2img(player2num, player2suit);
    var player3img = num2img(player3num, player3suit);
    
    current[0] = new Card(player1img, canvas.width / 2, canvas.height * 0.1, 0.15, 0.15, 180, false, true);
    current[1] = new Card(player2img, canvas.width / 2, canvas.height * 0.9, 0.15, 0.15, 0, false, true);
    current[2] = new Card(player3img, canvas.width * 0.25, canvas.height / 2, 0.15, 0.15, 90, false, true);
    base[0] = new Card(cfd, canvas.width / 2, canvas.height * 0.1, 0.15, 0.15, 180, false, true);
    base[1] = new Card(cfd, canvas.width / 2, canvas.height * 0.9, 0.15, 0.15, 0, false, true);
    base[2] = new Card(cfd, canvas.width * 0.2, canvas.height / 2, 0.15, 0.15, 90, false, true);
  }
  else if(players == 4){
    player1num = Math.floor(Math.random() * 2) + 2; // 2 to 14
    player1suit = Math.floor(Math.random() * 4) + 2; // 2 to 4
    player2num = Math.floor(Math.random() * 2) + 2; // 2 to 14
    player2suit = Math.floor(Math.random() * 4) + 2; // 2 to 4
    player3num = Math.floor(Math.random() * 2) + 2; // 2 to 14
    player3suit = Math.floor(Math.random() * 4) + 2; // 2 to 4
    player4num = Math.floor(Math.random() * 2) + 2; // 2 to 14
    player4suit = Math.floor(Math.random() * 4) + 2; // 2 to 4
    var player1img = num2img(player1num, player1suit);
    var player2img = num2img(player2num, player2suit);
    var player3img = num2img(player3num, player3suit);
    var player4img = num2img(player4num, player4suit);
    current[0] = new Card(player1img, canvas.width / 2, canvas.height * 0.1, 0.15, 0.15, 180, false, true);
    current[1] = new Card(player2img, canvas.width / 2, canvas.height * 0.9, 0.15, 0.15, 0, false, true);
    current[2] = new Card(player3img, canvas.width * 0.2, canvas.height / 2, 0.15, 0.15, 90, false, true);
    current[3] = new Card(player4img, canvas.width * 0.8, canvas.height / 2, 0.15, 0.15, 270, false, true);
    base[0] = new Card(player1img, canvas.width / 2, canvas.height * 0.1, 0.15, 0.15, 180, false, true);
    base[1] = new Card(player2img, canvas.width / 2, canvas.height * 0.9, 0.15, 0.15, 0, false, true);
    base[2] = new Card(player3img, canvas.width * 0.2, canvas.height / 2, 0.15, 0.15, 90, false, true);
    base[3] = new Card(player4img, canvas.width * 0.8, canvas.height / 2, 0.15, 0.15, 270, false, true);
  }
}

function num2img(num, suit){
  if(num == 14){
    if(suit == 1){
      return c11;
    }
    else if(suit == 2){
      return c12;
    }
    else if(suit == 3){
      return c13;
    }
    else{
      return c14;
    }
  }else if(num == 2){
    if(suit == 1){
      return c21;
    }
    else if(suit == 2){
      return c22;
    }
    else if(suit == 3){
      return c23;
    }
    else{
      return c24;
    }
  }else if(num == 3){
    if(suit == 1){
      return c31;
    }
    else if(suit == 2){
      return c32;
    }
    else if(suit == 3){
      return c33;
    }
    else{
      return c34;
    }
  }
}

function flipAll(){
  p1winsuit = false;
  p2winsuit = false;
  p3winsuit = false;
  p4winsuit = false;
  for (let i = 0; i < current.length; i++) {
    current[i].flipCard();
  }
  current[0].posY += cardh * current[0].scaleY * 1.25;
  current[1].posY -= cardh * current[0].scaleY * 1.25;
  current[2].posX += cardw * current[0].scaleX * 2;
  current[3].posX -= cardw * current[0].scaleX * 2;
  winner = 0;
  if(player1suit > player2suit && player1suit > player3suit && player1suit > player4suit){
    p1winsuit = true;
  }
  if(player2suit > player1suit && player2suit > player3suit && player2suit > player4suit){
    p2winsuit = true;
  }
  if(player3suit > player1suit && player3suit > player2suit && player3suit > player4suit){
    p3winsuit = true;
  }
  if(player4suit > player1suit && player4suit > player2suit && player4suit > player3suit){
    p4winsuit = true;
  }
  if(player1num > player2num && player1num > player3num && player1num > player4num){
    p1winnum = true;
  }
  if(player2num > player1num && player2num > player3num && player2num > player4num){
    p2winnum = true;
  }
  if(player3num > player1num && player3num > player2num && player3num > player4num){
    p3winnum = true;
  }
  if(player4num > player1num && player4num > player2num && player4num > player3num){
    p4winnum = true;
  }
  /*if(p1winsuit && !p2winsuit && !p3winsuit && !p4winsuit){
    winner = 1;
  }else if(!p1winsuit && p2winsuit && !p3winsuit && !p4winsuit){
    winner = 2;
  }else if(!p1winsuit && !p2winsuit && p3winsuit && !p4winsuit){
    winner = 3;
  }else if(!p1winsuit && !p2winsuit && !p3winsuit && p4winsuit){
    winner = 4;
  }*/
  if(p1winnum && !p2winnum && !p3winnum && !p4winnum){
    winner = 1;
  }else if(!p1winnum && p2winnum && !p3winnum && !p4winnum){
    winner = 2;
  }else if(!p1winnum && !p2winnum && p3winnum && !p4winnum){
    winner = 3;
  }else if(!p1winnum && !p2winnum && !p3winnum && p4winnum){
    winner = 4;
  }
  document.getElementById('winner').value = winner;
}

loopid = setInterval(draw, loopspeed);
reset();
