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
  constructor(int num, Image image, float posX, float posY, float scale){
    this.num = num;
    this.image = image;
    this.scale = scale;
    this.faceup = false;
  }
  flipCard(){
    if(this.faceup == false){faceup = true;}
    else{{faceup = false;}}
  }
  drawCard(){
    if(faceup = true){
      ctx.drawImage(this.image, this.posX, this.posY, cardw * scale, cardh * scale);
    }
    else{
      ctx.drawImage(faceDown, this.posX, this.posY, cardw * scale, cardh * scale);
    }
  }
}

var card1 = new Card(0, cas, 0, 0, 1);

function a(){
  card1.flipCard();
  card1.drawCard();
}
setTimeout(a, 1000);
