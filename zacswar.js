const cac = new Image(); cac.src = 'cards/ace_of_clubs.png';
const cad = new Image(); cad.src = 'cards/ace_of_diamonds.png';
const cah = new Image(); cah.src = 'cards/ace_of_hearts.png';
const cas = new Image(); cas.src = 'cards/ace_of_spades.png';
const cfd = new Image(); cfd.src = 'back2.png'; // card face down
// Byron Knoll: http://code.google.com/p/vector-playing-cards/
// card pngs are 500 x 726
// ctx.drawImage(cfd, card1.posX, card1.posY, cardw * card1.scale, cardh * card1.scale);
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var loopid;
var loopspeed = 1000;
const cardw = 500;
const cardh = 726;
var players = 2;
var game = "classic";

class Card{
  constructor(image, posX, posY, scaleX, scaleY, faceup){
    this.image = image;
    this.posX = posX;
    this.posY = posY;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.faceup = false;
  }
  flipCard(){
    if(this.faceup){this.faceup = false;}
    else{this.faceup = true;}
  }
  drawCard(){
    if(this.faceup){
      ctx.drawImage(this.image, this.posX, this.posY, cardw * this.scaleX, cardh * this.scaleY);
    }
    else{
      ctx.drawImage(cfd, this.posX, this.posY, cardw * this.scaleX, cardh * this.scaleY);
    }
  }
}

//const card1 = new Card(0, cas, 0, 0, 1, true);
//const card2 = new Card(0, cac, 0, 0, 1, false);

var sprites = [];

sprites[0] = new Card(cas, 0, 0, 1, 1, true);
sprites[1] = new Card(cac, 0, 0, 1, 1, false);

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  players = document.getElementById('Players').value;
  sprites[0].drawCard();
  sprites[1].drawCard();
  sprites[0].posX += 10;
}
function reset(){
  if(players == 2){
    sprites[0] = new Card(cas, 0, 0, 0.2, 0.2, true);
    sprites[0].faceup = true;
    /*sprites[0].image = cas;
    sprites[0].posX = 2;
    sprites[0].posY = 0;
    sprites[0].scaleX = 0.2;
    sprites[1].scaleY = 0.2;
    sprites[0].faceup = true;*/
    sprites[1] = new Card(cac, 200, 0, 0.2, 0.2, false);
    /*sprites[1].image = cac;
    sprites[1].posX = 200;
    sprites[1].posY = 0;
    sprites[1].scaleX = 0.2;
    sprites[1].scaleY = 0.2;
    sprites[1].faceup = false;*/
  }
  else if(players == 3){
    
  }
  else if(player == 4){
    
  }
}

loopid = setInterval(draw, loopspeed);
reset();
