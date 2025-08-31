const cac = new Image(); cac.src = 'cards/ace_of_clubs.png';
const cad = new Image(); cad.src = 'cards/ace_of_diamonds.png';
const cah = new Image(); cah.src = 'cards/ace_of_hearts.png';
const cas = new Image(); cas.src = 'cards/ace_of_spades.png';
const faceDown = new Image(); faceDown.src = 'back.png';
// Byron Knoll: http://code.google.com/p/vector-playing-cards/
// card pngs are 500 x 726
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const cardw = 500;
const cardh = 726;

class Card{
  constructor(number, image, posX, posY, scale){
    this.number = number;
    this.image = image;
    this.scale = scale;
    this.faceup = false;
  }
  flipCard(){
    if(this.faceup == false){this.faceup = true;}
    else{{this.aceup = false;}}
  }
  drawCard(){
    if(this.faceup = true){
      ctx.drawImage(this.image, this.posX, this.posY, cardw * this.scale, cardh * this.scale);
    }
    else{
      ctx.drawImage(faceDown, this.posX, this.posY, cardw * this.scale, cardh * this.scale);
    }
  }
}

const card1 = new Card(0, cas, 0, 0, 1);
card1.number = 0;
card1.image = cas;
card1.posX = 0;
card1.posY = 0;
card1.scale = 1;

console.log(card1.posX);
console.log(card1.posY);
console.log(card1.scale);

function a(){
  //card1.flipCard();
  card1.drawCard();
}
setTimeout(a, 1000);
