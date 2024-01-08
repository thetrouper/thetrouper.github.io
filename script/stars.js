var background = document.getElementById('background');
var ctx = background.getContext('2d');

background.width = innerWidth;
background.height = innerHeight;

window.onresize = function(){
  background.width = innerWidth;
	background.height = innerHeight;
};

var Star = function(){
  this.myX = Math.random() * innerWidth;
  this.myY = Math.random() * innerHeight;
  this.myColor = 0;
};

var xMod = 0;
var yMod = 0;
var warpSpeed = 0;

Star.prototype.updatePos = function(){
  var speedMult = 0.015;
  if (warpSpeed) { speedMult = 0.028; }
	this.myX += xMod + (this.myX - (innerWidth/2)) * (speedMult);
	this.myY += yMod + (this.myY - (innerHeight/2)) * (speedMult);
  this.updateColor();
  
  if (this.myX > innerWidth || this.myX < 0) {
    this.myX = Math.random() * innerWidth;
    this.myColor += 5;
  }
  if (this.myY > innerHeight || this.myY < 0) {
    this.myY = Math.random() * innerHeight;
    this.myColor += 5;
  }
  
};

Star.prototype.updateColor = function(){
  if (this.myColor < 255) {
    this.myColor += 5;
  }
  else {
    this.myColor = 255;
  }
};

var starField = [];
var starCounter = 0;

while (starCounter < 500) {
  var newStar = new Star;
  starField.push(newStar);
  starCounter++;
}

function init() {
  background.focus();
  window.requestAnimationFrame(draw);
}

function draw(event) {
  ctx.fillStyle = "rgba(0, 23, 24, 0.491)";
  ctx.fillRect(0,0,innerWidth,innerHeight);
  for (var i = 0; i < starField.length; i++) {
    ctx.fillStyle = "rgb(" + starField[i].myColor + "," + starField[i].myColor + "," + starField[i].myColor + ")";
    ctx.fillRect(starField[i].myX,starField[i].myY,starField[i].myColor / 128,starField[i].myColor / 128);
    starField[i].updatePos();
  }
  window.requestAnimationFrame(draw);
}

init();
