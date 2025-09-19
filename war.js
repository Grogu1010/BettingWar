// ace is 14, jack is 11, queen is 12, king is 13, joker is 15
// 1 is clubs, 2 is diamonds, 3 is Hearts, 4 is spades
//1, ace
const c11 = new Image(); c11.src = 'cards/ace_of_clubs.png';
const c12 = new Image(); c12.src = 'cards/ace_of_diamonds.png';
const c13 = new Image(); c13.src = 'cards/ace_of_hearts.png';
const c14 = new Image(); c14.src = 'cards/ace_of_spades.png';
//2
const c21 = new Image(); c21.src = 'cards/2_of_clubs.png';
const c22 = new Image(); c22.src = 'cards/2_of_diamonds.png';
const c23 = new Image(); c23.src = 'cards/2_of_hearts.png';
const c24 = new Image(); c24.src = 'cards/2_of_spades.png';
//3
const c31 = new Image(); c31.src = 'cards/3_of_clubs.png';
const c32 = new Image(); c32.src = 'cards/3_of_diamonds.png';
const c33 = new Image(); c33.src = 'cards/3_of_hearts.png';
const c34 = new Image(); c34.src = 'cards/3_of_spades.png';
//4
const c41 = new Image(); c41.src = 'cards/4_of_clubs.png';
const c42 = new Image(); c42.src = 'cards/4_of_diamonds.png';
const c43 = new Image(); c43.src = 'cards/4_of_hearts.png';
const c44 = new Image(); c44.src = 'cards/4_of_spades.png';
//5
const c51 = new Image(); c51.src = 'cards/5_of_clubs.png';
const c52 = new Image(); c52.src = 'cards/5_of_diamonds.png';
const c53 = new Image(); c53.src = 'cards/5_of_hearts.png';
const c54 = new Image(); c54.src = 'cards/5_of_spades.png';
//6
const c61 = new Image(); c61.src = 'cards/6_of_clubs.png';
const c62 = new Image(); c62.src = 'cards/6_of_diamonds.png';
const c63 = new Image(); c63.src = 'cards/6_of_hearts.png';
const c64 = new Image(); c64.src = 'cards/6_of_spades.png';
//7
const c71 = new Image(); c71.src = 'cards/7_of_clubs.png';
const c72 = new Image(); c72.src = 'cards/7_of_diamonds.png';
const c73 = new Image(); c73.src = 'cards/7_of_hearts.png';
const c74 = new Image(); c74.src = 'cards/7_of_spades.png';
//8
const c81 = new Image(); c81.src = 'cards/8_of_clubs.png';
const c82 = new Image(); c82.src = 'cards/8_of_diamonds.png';
const c83 = new Image(); c83.src = 'cards/8_of_hearts.png';
const c84 = new Image(); c84.src = 'cards/8_of_spades.png';
//9
const c91 = new Image(); c91.src = 'cards/9_of_clubs.png';
const c92 = new Image(); c92.src = 'cards/9_of_diamonds.png';
const c93 = new Image(); c93.src = 'cards/9_of_hearts.png';
const c94 = new Image(); c94.src = 'cards/9_of_spades.png';
//10
const c101 = new Image(); c101.src = 'cards/10_of_clubs.png';
const c102 = new Image(); c102.src = 'cards/10_of_diamonds.png';
const c103 = new Image(); c103.src = 'cards/10_of_hearts.png';
const c104 = new Image(); c104.src = 'cards/10_of_spades.png';
//11, jack
const c111 = new Image(); c111.src = 'cards/jack_of_clubs2.png';
const c112 = new Image(); c112.src = 'cards/jack_of_diamonds2.png';
const c113 = new Image(); c113.src = 'cards/jack_of_hearts2.png';
const c114 = new Image(); c114.src = 'cards/jack_of_spades2.png';
//12, queen
const c121 = new Image(); c121.src = 'cards/queen_of_clubs2.png';
const c122 = new Image(); c122.src = 'cards/queen_of_diamonds2.png';
const c123 = new Image(); c123.src = 'cards/queen_of_hearts2.png';
const c124 = new Image(); c124.src = 'cards/queen_of_spades2.png';
//13, king
const c131 = new Image(); c131.src = 'cards/king_of_clubs2.png';
const c132 = new Image(); c132.src = 'cards/king_of_diamonds2.png';
const c133 = new Image(); c133.src = 'cards/king_of_hearts2.png';
const c134 = new Image(); c134.src = 'cards/king_of_spades2.png';
//other
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
var player1card
var player2card
var player3card
var player4card;
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
    player1num = Math.floor(Math.random() * 54) + 1; // 1 to 54
    player2num = Math.floor(Math.random() * 13) + 2; // 2 to 15
    player2suit = Math.floor(Math.random() * 4) + 2; // 2 to 4
    player3num = 0;
    player3suit = 0;
    player4num = 0;
    player4suit = 0;
    var player1img = num2img(player1num, player1suit);
    var player2img = num2img(player2num, player2suit);

    current[0] = new Card(player1img, canvas.width / 2, canvas.height * 0.1, 0.15, 0.15, 180, false, true);
    current[1] = new Card(player2img, canvas.width / 2, canvas.height * 0.9, 0.15, 0.15, 0, false, true);
    base[0] = new Card(cfd, canvas.width / 2, canvas.height * 0.1, 0.15, 0.15, 180, false, true);
    base[1] = new Card(cfd, canvas.width / 2, canvas.height * 0.9, 0.15, 0.15, 0, false, true);
  }
  else if(players == 3){
    player1num = Math.floor(Math.random() * 13) + 2; // 2 to 15
    player1suit = Math.floor(Math.random() * 4) + 2; // 2 to 4
    player2num = Math.floor(Math.random() * 13) + 2; // 2 to 15
    player2suit = Math.floor(Math.random() * 4) + 2; // 2 to 4
    player3num = Math.floor(Math.random() * 13) + 2; // 2 to 15
    player3suit = Math.floor(Math.random() * 4) + 2; // 2 to 4
    player4num = 0;
    player4suit = 0;
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
    player1num = Math.floor(Math.random() * 13) + 2; // 2 to 15
    player1suit = Math.floor(Math.random() * 4) + 2; // 2 to 4
    player2num = Math.floor(Math.random() * 13) + 2; // 2 to 15
    player2suit = Math.floor(Math.random() * 4) + 2; // 2 to 4
    player3num = Math.floor(Math.random() * 13) + 2; // 2 to 15
    player3suit = Math.floor(Math.random() * 4) + 2; // 2 to 4
    player4card
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
    }else if(suit == 2){
      return c22;
    }else if(suit == 3){
      return c23;
    }else{
      return c24;
    }
  }else if(num == 3){
    if(suit == 1){
      return c31;
    }else if(suit == 2){
      return c32;
    }else if(suit == 3){
      return c33;
    }else{
      return c34;
    }
  }else if(num == 4){
    if(suit == 1){
      return c41;
    }else if(suit == 2){
      return c42;
    }else if(suit == 3){
      return c43;
    }else{
      return c44;
    }
  }else if(num == 5){
    if(suit == 1){
      return c51;
    }else if(suit == 2){
      return c52;
    }else if(suit == 3){
      return c53;
    }else{
      return c54;
    }
  }else if(num == 6){
    if(suit == 1){
      return c61;
    }else if(suit == 2){
      return c62;
    }else if(suit == 3){
      return c63;
    }else{
      return c64;
    }
  }else if(num == 7){
    if(suit == 1){
      return c71;
    }else if(suit == 2){
      return c72;
    }else if(suit == 3){
      return c73;
    }else{
      return c74;
    }
  }else if(num == 8){
    if(suit == 1){
      return c81;
    }else if(suit == 2){
      return c82;
    }else if(suit == 3){
      return c83;
    }else{
      return c84;
    }
  }else if(num == 9){
    if(suit == 1){
      return c91;
    }else if(suit == 2){
      return c92;
    }else if(suit == 3){
      return c93;
    }else{
      return c94;
    }
  }else if(num == 10){
    if(suit == 1){
      return c101;
    }else if(suit == 2){
      return c102;
    }else if(suit == 3){
      return c103;
    }else{
      return c104;
    }
  }else if(num == 11){
    if(suit == 1){
      return c111;
    }else if(suit == 2){
      return c112;
    }else if(suit == 3){
      return c113;
    }else{
      return c114;
    }
  }else if(num == 12){
    if(suit == 1){
      return c121;
    }else if(suit == 2){
      return c122;
    }else if(suit == 3){
      return c123;
    }else{
      return c124;
    }
  }else if(num == 13){
    if(suit == 1){
      return c131;
    }else if(suit == 2){
      return c132;
    }else if(suit == 3){
      return c133;
    }else{
      return c134;
    }
  }else if(num == 15){
    if(suit == 1){
      return c151;
    }else if(suit == 2){
      return c152;
    }else if(suit == 3){
      return c153;
    }else{
      return c154;
    }
  }
}

function flipAll(){
  winner = 0;
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
