function drawAll(){
  applyVel(circlePos, circleVel);
  if (SLOW_CIRCLE_DOWN) {
    slowCircleDown();
  }
  keepCircleIn()

  context.clearRect(0,0,canvas.width, canvas.height);

  context.beginPath();
  context.arc(circlePos[0], circlePos[1], 50, 0, 2 * Math.PI);
  context.stroke();
  TANK.draw();
  window.requestAnimationFrame(drawAll)

}

// Get width/height of the browser window
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
console.log("Window is %d by %d", windowWidth, windowHeight);

// Get the canvas, set the width and height from the window
canvas = document.getElementById("canvas");
// I found that - 20 worked well for me, YMMV
canvas.width = windowWidth - 20;
canvas.height = windowHeight - 20;
canvas.style.border = "1px solid black";

// Set up the context for the animation
context = canvas.getContext("2d");

document.addEventListener("keyup", myKeyUp)
document.addEventListener("keydown", myKeyDown);

// a = 0
circlePos = [50,50]
circleVel = [0,0]
SLOW_CIRCLE_DOWN = false

var TANK = new Tank(100, 100, 0, 0);
console.log(TANK);

window.requestAnimationFrame(drawAll)

function applyVel(pos, vel){
  for (i = 0; i < pos.length; i++){
    pos[i] += vel[i]
  }
}

function slowCircleDown(){
  if (Math.min(circleVel) < 0.1) {
    circleVel = [0,0]
  } else {
    circleVel[0] *= 0.8
    circleVel[1] *= 0.8
  }
}

function keepCircleIn(){
  circlePos[0] = Math.max(circlePos[0], 50)
  circlePos[0] = Math.min(circlePos[0], canvas.width - 50)
  circlePos[1] = Math.max(circlePos[1], 50)
  circlePos[1] = Math.min(circlePos[1], canvas.height - 50)
}

function myKeyUp (event) {
  // SLOW_CIRCLE_DOWN = true;
  TANK.isMoving = false;
  // circleVel = [0,0];
}


function myKeyDown (event) {
  /*
    Parameters: event object, which contains information about the event
      that triggered the event listener.
    Returns: None, but modifies global variables which track response to event.
    Purpose: Make the animation respond to keys being pressed.
  */
  // One of the attributes of the event object is 'which,' contains the key
  //   that was pressed to trigger the event listener.
  TANK_MOVING = true;
  keyCode = event.which;
  keyStr = event.key;
  console.log(event);
  console.log(keyCode);
  console.log(keyStr);

  // if (keyStr == 'w' && circlePos[1] > 50) {
  //   // Move circle up
  //   // circleVel[1] = -5;
  //
  // }
  // if (keyStr == 'a' && circlePos[0] > 50) {
  //   // Move circle left
  //   circleVel[0] = -5;
  // }
  // if (keyStr == 's' && circlePos[1] < canvas.height - 50) {
  //   // Move circle down
  //   circleVel[1] = 5;
  // }
  // if (keyStr == 'd' && circlePos[0] < canvas.width - 50) {
  //   // Move circle right
  //   circleVel[0] = 5;
  // }
  // if (keyStr == 'w' && circlePos[1] > 50) {
  //   // Move circle up
  //   // circleVel[1] = -5;
  //
  // }
  if (keyStr == 'w') {
    // Move tank forward
    TANK.move(1);
  }
  if (keyStr == 's') {
    // Move tank backwards
    TANK.move(-1);
  }
  if (keyStr == 'a') {
    TANK.rotateBodyLeft();
  }
  if (keyStr == 'd' && circlePos[0] < canvas.width - 50) {
    TANK.rotateBodyRight();
  }
}

function drawRect(centerX, centerY, angle){
  context.beginPath();
  x=0;
  y=0;
  context.rect(centerX - x, centerY - y, tankWidth, tankHeight)
  context.translate(centerX, centerY)
  context.rotate(angle);
  // x = -1 * Math.sin(angle) * Math.sqrt(tankWidth**2 + tankHeight**2) * 0.5
  // y = Math.cos(angle) * Math.sqrt(tankWidth**2 + tankHeight**2) * 0.5

  context.rotate(-1 * angle);
  context.translate(-1 * centerX, -1 * centerY)
  context.stroke();
}



// function distance(x1, y1, x2, y2, ){
//
// }
