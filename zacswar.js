// Byron Knoll: http://code.google.com/p/vector-playing-cards/
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const img = new Image();
img.src = 'path/to/your/image.jpg';
img.onload = function() {
  ctx.drawImage(img, 0, 0);
};
