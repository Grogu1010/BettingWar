const cac = new Image(); cac.src = 'cards/ace_of_clubs.png';
const cad = new Image(); cad.src = 'cards/ace_of_diamonds.png';
const cah = new Image(); cah.src = 'cards/ace_of_hearts.png';
const cas = new Image(); cas.src = 'cards/ace_of_spades.png';
const cfd = new Image(); cfd.src = 'back2.png';
// Byron Knoll: http://code.google.com/p/vector-playing-cards/
// card pngs are 500 x 726
// ctx.drawImage(cfd, card1.posX, card1.posY, cardw * card1.scale, cardh * card1.scale);
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var loopid;
var loopspeed = 1000;
const cardw = 500;
const cardh = 726;
var players = 1;

class Card{
  constructor(number, image, posX, posY, scale, faceup){
    this.number = number;
    this.image = image;
    this.scale = scale;
    this.faceup = false;
  }
  flipCard(){
    if(this.faceup == false){this.faceup = true;}
    else{{this.faceup = false;}}
  }
  drawCard(){
    if(this.faceup == true){
      ctx.drawImage(this.image, this.posX, this.posY, cardw * this.scale, cardh * this.scale);
    }
    else{
      ctx.drawImage(cfd, this.posX, this.posY, cardw * this.scale, cardh * this.scale);
    }
  }
}

const card1 = new Card(0, cas, 0, 0, 1, true);
card1.number = 0;
card1.image = cas;
card1.posX = 0;
card1.posY = 0;
card1.scale = 0.2;
card1.faceup = true;
const card2 = new Card(0, cac, 0, 0, 1, false);
card2.number = 1;
card2.image = cac;
card2.posX = 200;
card2.posY = 0;
card2.scale = 0.2;
card2.faceup = false;

var sprites = [];

sprites[0] = new Card(0, cas, 0, 0, 1, false);

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  players = document.getElementById('Players');
  card1.drawCard();
  card2.drawCard();
  card1.posX += 10;
}
function reset(){
  
}

loopid = setInterval(draw, loopspeed);
reset();
