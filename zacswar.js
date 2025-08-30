// Byron Knoll: http://code.google.com/p/vector-playing-cards/
// card pngs are 500 x 726
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const cardw = 500;
const cardh = 726;
const cac = new Image(); cac.src = 'cards/ace_of_clubs.png';
const cad = new Image(); cad.src = 'cards/ace_of_diamonds.png';
const cah = new Image(); cah.src = 'cards/ace_of_hearts.png';
const cas = new Image(); cas.src = 'cards/ace_of_spades.png';


function a(){
  ctx.drawImage(cas, 0, 0, cardw * 0.25, cardh * 0.25);
}
setTimeout(a, 1000);
