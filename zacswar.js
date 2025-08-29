// Byron Knoll: http://code.google.com/p/vector-playing-cards/
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const img = new Image();
img.src = '2_of_hearts.png';
img.onload = function() {
  ctx.drawImage(img, 0, 0);
};
