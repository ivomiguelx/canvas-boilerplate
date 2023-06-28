import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
var gravity = 1;
var friction = 0.59;

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

addEventListener('click',function(event){
  init();
});

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dy = dy;
    this.dx = dx;
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke();
    c.closePath()
  }

  update() {
    if(this.y + this.radius + this.dy > canvas.height){
      this.dy *= -1 * friction;
    }
    else{
      this.dy += gravity;
    }
    if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius < 0){
      this.dx *= -1 ;
    }
    this.y += this.dy;
    this.x += this.dx;
    this.draw()
  }
}

// Implementation
let balls = [];

function init() {
  balls = [];
  for(var i = 0; i < 400 ; i++){
    var radius = utils.randomIntFromRange(8,20);
    var x = utils.randomIntFromRange(0 + radius, canvas.width - radius);
    var y = utils.randomIntFromRange(0, canvas.height - radius);
    var dx = utils.randomIntFromRange(-2,2);
    var dy = utils.randomIntFromRange(-2,2)
    var color = utils.randomColor(colors);
    balls.push(new Ball(x, y,dx ,dy ,radius,color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  balls.forEach((x)=>{
    x.update();
  });
}

init()
animate()
