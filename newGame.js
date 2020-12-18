// TODO: restart option, add powerups, wall health?

function drawAll(){
  /*
    This is the main function that loops and draws everything.
  */

  // Check for Wall + Tank or Wall + Pellet collisions
  tanks.forEach((tank) => {
    walls.forEach((wall) => {
      // Check to see if a corner of a tank is in a wall
      tankInWallCollisions(tank,wall);

      // Check to see if a corner of a wall is in a tank
      wallInTankCollisions(tank, wall);

      // Check to see if a pellet is in a wall
      wallAndPelletCollisions(tank, wall);
    });
  });

  // Account for collisions between tanks, and pellets hitting tanks
  tankToTankInteractions(tank1, tank2);
  tankToTankInteractions(tank2, tank1);

  // Drawing Everything
  context.clearRect(0,0,canvas.width, canvas.height);
  context.beginPath();
  fillBackground();
  tank1.draw();
  tank2.draw();
  walls.forEach((wall) => {
    wall.draw();
  });

  // Check if game over
  if (LOSER == "none") {
    window.requestAnimationFrame(drawAll)
  } else {
    gameOver(LOSER);
  }
}

// Get width/height of the browser window
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
console.log("Window is %d by %d", windowWidth, windowHeight);

// Get the canvas, set the width and height from the window
canvas = document.getElementById("canvas");
canvas.width = windowWidth - 20;
canvas.height = windowHeight - 20;
canvas.style.border = "1px solid black";

// Set up the context for the animation
context = canvas.getContext("2d");

// Set up event listeners to check if a key is pressed or released
document.addEventListener("keyup", myKeyUp)
document.addEventListener("keydown", myKeyDown);

// Changes to the name of the tank that loses its health.
// This variable tells us when the game is over.
var LOSER = "none";

// Tells if a key is pressed. Used for game over screen.
// var keyPressed = false;

// Create the tanks
var tank1 = new Tank(100, 100, 0, 0, "blue");
var tank2 = new Tank(800, 100, 0, 0, "red");
var tanks = [tank1, tank2];

// Create the walls
var walls = [];

// Four borders of the canvas
walls.push(new Wall(-50, 0, 50, canvas.height));
walls.push(new Wall(canvas.width, 0, 50, canvas.height));
walls.push(new Wall(0, -50, canvas.width, 50));
walls.push(new Wall(0, canvas.height, canvas.width, 50));

// "Actual" walls
walls.push(new Wall(200, 0, 300, 400));
walls.push(new Wall(300, 500, 900, 100));
walls.push(new Wall(1200, 400, 100, 300));
walls.push(new Wall(1000, 100, 200, 100));

// Starts the game
window.requestAnimationFrame(drawAll)

function myKeyUp (event) {
  /*
    Parameters: event object, which contains information about the event
      that triggered the event listener.
    Returns: None, but modifies global variables which track response to event.
    Purpose: Make the animation respond to keys being released.
  */
  keyStr = event.key;
  keyCode = event.which;
  if (keyStr == 'w' || keyStr == 's') {
    // Tank 1 stopped moving forward
    tank1.isMoving = false;
  }
  if (keyStr == 'a' || keyStr == 'd') {
    // Tank 1 stopped rotating
    tank1.turretRotationVel = 0;
  }
  if (keyCode == '38' || keyCode == '40') {
    // Tank 2 stopped moving forward
    tank2.isMoving = false;
  }
  if (keyCode == '37' || keyCode == '39') {
    // Tank 2 stopped rotating
    tank2.turretRotationVel = 0;
  }

  // keyPressed = false;
}

function myKeyDown (event) {
  /*
    Parameters: event object, which contains information about the event
      that triggered the event listener.
    Returns: None, but modifies global variables which track response to event.
    Purpose: Make the animation respond to keys being pressed.
  */
  keyCode = event.which;
  keyStr = event.key;

  if (keyStr == 'e') {
    // Tank 1 shoots
    tank1.shoot();
  }
  if (keyStr == 'w') {
    // Tank 1 moves forwards
    tank1.move(1);
  }
  if (keyStr == 's') {
    // Tank 1 moves backwards
    tank1.move(-1);
  }
  if (keyStr == 'a') {
    // Tank 1 rotates left
    tank1.rotateTurretLeft();
  }
  if (keyStr == 'd') {
    // Tank 1 rotates right
    tank1.rotateTurretRight();
  }

  if (keyStr == '/') {
    // Tank 2 shoots
    tank2.shoot();
  }
  if (keyCode == '38') {
    // Tank 2 moves forwards
    tank2.move(1);
  }
  if (keyCode == '40') {
    // Tank 2 moves backwards
    tank2.move(-1);
  }
  if (keyCode == '37') {
    // Tank 2 rotates left
    tank2.rotateTurretLeft();
  }
  if (keyCode == '39') {
    // Tank 2 rotates right
    tank2.rotateTurretRight();
  }

  // keyPressed = true;
}

function gameOver(LOSER){
  /*
    Parameters: Name of the tank that lost all its health (red or blue).
    Returns: None. This ends the game.
    Purpose: Display the graphics to say that the game is over.
  */

  // Determine the winner
  var WINNER;
  if (LOSER == "blue") {
    WINNER = "red";
  } else {
    WINNER = "blue";
  }

  // Write the ending message
  context.font = "30px Helvetica";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.fillText("GAME OVER", canvas.width/2, canvas.height/2);
  context.font = "20px Helvetica";
  context.fillText(WINNER.toUpperCase() + " won", canvas.width/2, canvas.height/2 + 50);
  context.fillText("Press any key to continue", canvas.width/2, canvas.height/2 + 100);
}
