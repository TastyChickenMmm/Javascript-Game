function drawAll(){
  if (linePos[0] < 0 || linePos[0] > canvas.width) {
    lineVel[0] = -1 * lineVel[0]
  }
  if (linePos[1] < 0 || linePos[1] > canvas.height) {
    lineVel[1] = -1 * lineVel[1]
  }
  if (linePos[2] < 0 || linePos[2] > canvas.width) {
    lineVel[2] *= -1
  }
  if (linePos[3] < 0 || linePos[3] > canvas.height) {
    lineVel[3] *= -1
  }

  applyVel(linePos,lineVel);
  applyVel(circlePos, circleVel);
  if (SLOW_CIRCLE_DOWN) {
    slowCircleDown();
  }
  keepCircleIn()

  context.clearRect(0,0,canvas.width, canvas.height);
  context.beginPath();
  context.moveTo(linePos[0], linePos[1])
  context.lineTo(linePos[2],linePos[3])
  context.stroke();

  context.beginPath();
  context.arc(circlePos[0], circlePos[1], 50, 0, 2 * Math.PI);
  context.stroke();

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


linePos = [0,0, 10,10]
lineVel = [1,4,3,2]
circlePos = [50,50]
circleVel = [0,0]
SLOW_CIRCLE_DOWN = false

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
  SLOW_CIRCLE_DOWN = true;
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
  SLOW_CIRCLE_DOWN = false;
  keyCode = event.which;
  keyStr = event.key;
  console.log(event);
  console.log(keyCode);
  console.log(keyStr);

  if (keyStr == 'w' && circlePos[1] > 50) {
    // Move circle up
    circleVel[1] = -5;
  }
  if (keyStr == 'a' && circlePos[0] > 50) {
    // Move circle left
    circleVel[0] = -5;
  }
  if (keyStr == 's' && circlePos[1] < canvas.height - 50) {
    // Move circle down
    circleVel[1] = 5;
  }
  if (keyStr == 'd' && circlePos[0] < canvas.width - 50) {
    // Move circle right
    circleVel[0] = 5;
  }
}

// function distance(x1, y1, x2, y2, ){
//
// }
