const cac = new Image(); cac.src = 'cards/ace_of_clubs.png';
const cad = new Image(); cad.src = 'cards/ace_of_diamonds.png';
const cah = new Image(); cah.src = 'cards/ace_of_hearts.png';
const cas = new Image(); cas.src = 'cards/ace_of_spades.png';
const cfd = new Image(); cfd.src = 'back2.png'; // card face down

class Card{
  constructor(image, posX, posY, scaleX, scaleY, rotation, faceup){
    this.image = image;
    this.posX = posX;
    this.posY = posY;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.rotation = rotation;
    this.faceup = faceup;
  }
  flipCard(){
    if(this.faceup){this.faceup = false;}
    else{this.faceup = true;}
  }
  drawCard(){
    rotateAndPaintImage(ctx, this.image, this.rotation * TO_RAD, this.posX, this.posY, this.posX + cardw * this.scaleX, this.posY + cardh * this.scaleY);
  }
  rotateAndPaintImage(context, image, angleInRad, positionX, positionY, axisX, axisY){
    context.translate( positionX, positionY );
    context.rotate( angleInRad );
    //context.drawImage( image, -axisX, -axisY );
    if(this.faceup){
      context.drawImage(image, -axisX, -axisY, cardw * this.scaleX, cardh * this.scaleY);
    }
    else{
      context.drawImage(cfd, -axisX, -axisY, cardw * this.scaleX, cardh * this.scaleY);
    }
    context.rotate(-angleInRad);
    context.translate(-positionX, -positionY);
  }
}
// Byron Knoll: http://code.google.com/p/vector-playing-cards/
// card pngs are 500 x 726
// ctx.drawImage(cfd, card1.posX, card1.posY, cardw * card1.scale, cardh * card1.scale);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const TO_RAD = Math.PI / 180;
var loopid;
var loopspeed = 1000;
const cardw = 500;
const cardh = 726;
const bgcolor = 'green';
var players = 2;
var game = "classic";

var sprites = [];
sprites[0] = new Card(cas, 0, 0, 1, 1, 0, true);
sprites[1] = new Card(cac, 0, 0, 1, 1, 90, false);

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = bgcolor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  players = document.getElementById('Players').value;
  for (let i = 0; i < sprites.length; i++) {
    sprites[i].rotateAndPaintImage(ctx, this.image, this.rotation * TO_RAD, this.posX, this.posY);
  }
}
function reset(){
  if(players == 2){
    sprites[0] = new Card(cas, 0, 0, 0.2, 0.2, true);
    //sprites[0].faceup = true;
    sprites[1] = new Card(cac, 200, 0, 0.2, 0.2, false);
  }
  else if(players == 3){
    
  }
  else if(player == 4){
    
  }
}

loopid = setInterval(draw, loopspeed);
reset();
