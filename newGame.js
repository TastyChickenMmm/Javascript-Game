function drawAll(){
  context.clearRect(0,0,canvas.width, canvas.height);

  context.beginPath();
  // context.arc(circlePos[0], circlePos[1], 50, 0, 2 * Math.PI);
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

var TANK = new Tank(100, 100, 0, 0);
console.log(TANK);

window.requestAnimationFrame(drawAll)

function myKeyUp (event) {
  TANK.isMoving = false;
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
  if (keyStr == 'd') {
    TANK.rotateBodyRight();
  }
  if (keyStr == 'e') {
    TANK.shoot();
  }
}

function drawRect(centerX, centerY, angle){
  context.beginPath();
  x=0;
  y=0;
  context.rect(centerX - x, centerY - y, tankWidth, tankHeight)
  context.translate(centerX, centerY)
  context.rotate(angle);

  context.rotate(-1 * angle);
  context.translate(-1 * centerX, -1 * centerY)
  context.stroke();
}
