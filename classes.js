var tankSpeed = 5;
var rotateSpeed = 0.1;
var turretRotateSpeed = 0.02;
var pelletSpeed = 7;
var pelletSize = 3;
var health = 10;
var tankSkinny = Math.PI/5; // Terrible variable name. This angle controls how fat the tank is.
var tankSize = 15;
var turretSize = 20; // More like turret length
var ammo = 6; // Max number of pellets that can exist from one tank at a time

class Tank {
  constructor(x, y, bodyRotation, turretRotation, color) {
    this.x = x;
    this.y = y;
    this.velX = 0;
    this.velY = 0;
    this.isMoving = false;
    this.deceleration = 0.8;

    this.color = color;
    this.health = health;

    this.bodyRotation = bodyRotation;
    this.turretRotation = turretRotation;
    this.bodyRotationVel = 0;
    this.turretRotationVel = 0;
    this.isSyncingTurretWithBody = false; // Tell if the tank should align the body to the turret

    this.turretEndX = this.x + Math.cos(this.bodyRotation + this.turretRotation) * turretSize;
    this.turretEndY = this.y - Math.sin(this.bodyRotation + this.turretRotation) * turretSize;

    this.pellets = []; // List of all pellets

    this.TRx = this.x + Math.cos(this.bodyRotation + tankSkinny) * tankSize;
    this.TRy = this.y - Math.sin(this.bodyRotation + tankSkinny) * tankSize;
    this.TLx = this.x + Math.cos(this.bodyRotation + Math.PI - tankSkinny) * tankSize;
    this.TLy = this.y - Math.sin(this.bodyRotation + Math.PI - tankSkinny) * tankSize;
    this.BRx = this.x + Math.cos(this.bodyRotation - tankSkinny) * tankSize;
    this.BRy = this.y - Math.sin(this.bodyRotation - tankSkinny) * tankSize;
    this.BLx = this.x + Math.cos(this.bodyRotation + Math.PI + tankSkinny) * tankSize;
    this.BLy = this.y - Math.sin(this.bodyRotation + Math.PI + tankSkinny) * tankSize;
  }
  move(dir) {
    // Moves the tank forwards or backwards (by changing velocity)
    this.isMoving = true;
    var velX = Math.cos(this.turretRotation + this.bodyRotation) * tankSpeed * dir;
    var velY = -1 * Math.sin(this.turretRotation + this.bodyRotation) * tankSpeed * dir;
    this.velX = velX
    this.velY = velY
    this.isSyncingTurretWithBody = true;
  }

  rotateTurretLeft() {
    // Rotates the turret left (by changing velocity)
    this.turretRotationVel = turretRotateSpeed;
  }
  rotateTurretRight() {
    // Rotates the turret right (by changing velocity)
    this.turretRotationVel = -turretRotateSpeed;
  }
  shoot(){
    // Shoots a pellet
    if (this.pellets.length < ammo) {
      // Determine the velocity of the pellet
      var pellVelX = Math.cos(this.turretRotation + this.bodyRotation) * pelletSpeed;
      var pellVelY = -1 * Math.sin(this.turretRotation + this.bodyRotation) * pelletSpeed;
      // Create a moving pellet
      var pellet = new Pellet(this.turretEndX, this.turretEndY, pellVelX, pellVelY, this.color)
      this.pellets.push(pellet);
    }
  }
  draw(){
    /*
      This method is regularly called, similar to the drawAll() function.
      Changes positions of the tank and draws it.
    */

    // Change the position of the tank
    if (this.isMoving) {
      // Move the tank at full speed
      this.x += this.velX;
      this.y += this.velY;
    } else if (Math.sqrt(this.velX**2 + this.velY**2) > 0.1) {
      // Decelerate the tank
      this.velX *= this.deceleration;
      this.velY *= this.deceleration;
      this.x += this.velX;
      this.y += this.velY;
    }

    // Align the body with the turret after moving
    if (this.isSyncingTurretWithBody) {
      if (this.turretRotation > rotateSpeed/2) {
        this.bodyRotationVel = rotateSpeed;
      } else if (this.turretRotation < - rotateSpeed/2) {
        this.bodyRotationVel = -rotateSpeed;
      } else {
        this.bodyRotationVel = 0;
        this.isSyncingTurretWithBody = false;
      }
    }

    // Rotate the tank body and the turret
    this.bodyRotation += this.bodyRotationVel;
    this.bodyRotation = adjustAngles(this.bodyRotation);
    this.turretRotation -= this.bodyRotationVel;
    this.turretRotation += this.turretRotationVel;
    this.turretRotation = adjustAngles(this.turretRotation);

    // Update coordinates of tank corners
    this.TRx = this.x + Math.cos(this.bodyRotation + tankSkinny) * tankSize;
    this.TRy = this.y - Math.sin(this.bodyRotation + tankSkinny) * tankSize;
    this.TLx = this.x + Math.cos(this.bodyRotation + Math.PI - tankSkinny) * tankSize;
    this.TLy = this.y - Math.sin(this.bodyRotation + Math.PI - tankSkinny) * tankSize;
    this.BRx = this.x + Math.cos(this.bodyRotation - tankSkinny) * tankSize;
    this.BRy = this.y - Math.sin(this.bodyRotation - tankSkinny) * tankSize;
    this.BLx = this.x + Math.cos(this.bodyRotation + Math.PI + tankSkinny) * tankSize;
    this.BLy = this.y - Math.sin(this.bodyRotation + Math.PI + tankSkinny) * tankSize;

    // Update coordinates of the end of the turret
    this.turretEndX = this.x + Math.cos(this.bodyRotation + this.turretRotation) * turretSize;
    this.turretEndY = this.y - Math.sin(this.bodyRotation + this.turretRotation) * turretSize;

    // Regeneration
    this.health += 0.001;

    // Draw pellets
    context.beginPath();
    for (var i = 0; i < this.pellets.length; i++) {
      this.pellets[i].draw();
    }

    // Draw tank
    context.beginPath();
    context.strokeStyle = this.color;
    drawLine(this.TRx, this.TRy, this.TLx, this.TLy);
    drawLine(this.TLx, this.TLy, this.BLx, this.BLy);
    drawLine(this.BLx, this.BLy, this.BRx, this.BRy);
    drawLine(this.BRx, this.BRy, this.TRx, this.TRy);
    context.stroke();

    // Draw turret
    context.beginPath();
    context.lineWidth = 3;
    drawLine(this.x, this.y, this.turretEndX, this.turretEndY);
    context.stroke();
    context.lineWidth = 1;
    context.strokeStyle = "black";

    // Draw health bar
    var startX = this.TRx/4 + this.BRx/4 + this.x/2;
    var startY = this.TRy/4 + this.BRy/4 + this.y/2;
    var endX = this.TLx/4 + this.BLx/4 + this.x/2;
    var endY = this.TLy/4 + this.BLy/4 + this.y/2;
    var fracHealth = this.health / health;
    // Red part
    context.beginPath();
    context.lineWidth = 8;
    context.strokeStyle = "red";
    drawLine(startX, startY, fracHealth*startX + (1-fracHealth)*endX, fracHealth*startY + (1-fracHealth)*endY);
    context.stroke();
    // Green part
    context.beginPath();
    context.strokeStyle = "green";
    drawLine(fracHealth*startX + (1-fracHealth)*endX, fracHealth*startY + (1-fracHealth)*endY, endX, endY);
    context.stroke();

    // Reset context properties
    context.lineWidth = 1;
    context.strokeStyle = "black";

  }
  nextFrame(){
    // Returns a copy of the tank one frame ahead. This is usefull in collision detection.
    return new Tank(this.x + this.velX, this.y + this.velY, this.bodyRotation, 0);
  }

  contains(x, y){
    // Determines if point (x,y) is inside the tank.

    // Shift the point so that the center of the tank (this.x, this.y) is at the origin.
    var adjustedX = x - this.x;
    var adjustedY = y - this.y;
    // Define and apply a rotation matrix:
    //   a  c
    //   b  d
    var a = Math.cos(-this.bodyRotation);
    var b = Math.sin(-this.bodyRotation);
    var c = Math.sin(this.bodyRotation);
    var d = Math.cos(this.bodyRotation);

    var newX = a*adjustedX + c * adjustedY;
    var newY = b*adjustedX + d * adjustedY;

    // Now that everything has been rotated so that the tank's edges
    // are parallel to the x and y axes, the job is easy.
    if (Math.abs(newX) <= Math.cos(tankSkinny) * tankSize && Math.abs(newY) <= Math.sin(tankSkinny) * tankSize) {
      return true;
    } else {
      return false;
    }
  }

}

class Pellet {
  constructor(x, y, velX, velY, color) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
  }
  draw(){
    this.x += this.velX;
    this.y += this.velY;

    context.beginPath();
    context.strokeStyle = this.color;
    context.arc(this.x, this.y, pelletSize, 0, 2 * Math.PI);
    context.stroke();
    context.strokeStyle = "black";
  }
}

class Wall {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.TLx = x;
    this.TLy = y;
    this.BLx = x;
    this.BLy = y + height;
    this.TRx = x + width;
    this.TRy = y;
    this.BRx = x + width;
    this.BRy = y + height;
  }
  contains(x,y){
    // Determine if a point (x,y) is in the wall.
    if (this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.height) {
      return true;
    }
    else {
      return false;
    }
  }
  draw(){
    // context.beginPath();
    context.fillStyle = "#A0A0A0";
    context.fillRect(this.x, this.y, this.width, this.height);
    // context.rect(this.x, this.y, this.width, this.height);
    // context.stroke();
  }
}

function drawLine(x1, y1, x2, y2){
  // Easy way to draw a line from (x_1,y_1) to (x_2, y_2).
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

function adjustAngles(angle){
  // Adjusts every angle to be between -π and π.
  while (angle > Math.PI) {
    angle -= 2*Math.PI
  }
  while (angle < -Math.PI) {
    angle += 2*Math.PI
  }
  return angle;
}

function detectCollisions(x, y, item){
  // Detect if a collision has occurrred between point (x,y) and an item.
  if (item.contains(x, y)){
    return true;
  }
  return false;
}

function tankToTankInteractions(tankA, tankB){
  /*
    Checks for two things
      1. Collision between tanks
      2. The pellets of one tank hitting the other
  */

  // Check if tankA pellets hit tank B.
  tankA.pellets.forEach((pellet) => {
    if (tankB.contains(pellet.x, pellet.y) || tankB.contains(pellet.x + pelletSize, pellet.y) || tankB.contains(pellet.x + pelletSize, pellet.y + pelletSize) || tankB.contains(pellet.x, pellet.y + pelletSize)) {
      // Pellets hit tank B
      var index = tankA.pellets.indexOf(pellet);
      if (index > -1) {
        // Delete the pellet
        tankA.pellets.splice(index, 1);
      }
      // Decrease tank B's health
      tankB.health -= 1;
      // Check if tank B is dead
      if (tankB.health <= 0) {
        LOSER = tankB.color;
      }
    }
  });

  // Check if tank B contains the corners of tank A.
  var collision = false;
  if (tankB.nextFrame().contains(tankA.TLx, tankA.TLy)) {
    collision = true;
  }
  if (tankB.nextFrame().contains(tankA.TRx, tankA.TRy)) {
    collision = true;
  }
  if (tankB.nextFrame().contains(tankA.BLx, tankA.BLy)) {
    collision = true;
  }
  if (tankB.nextFrame().contains(tankA.BRx, tankA.BRy)) {
    collision = true;
  }
  if (collision) {
    // There is a collision
    // Stop tank B from moving.
    tankB.velX = 0;
    tankB.velY = 0;

    // Collision damage
    tankB.health -= 0.05;
    // Check if tank B is dead
    if (tankB.health <= 0) {
      LOSER = tankB.color;
    }
  }
}

function tankInWallCollisions(tank, wall){
  // Determine if a corner of the tank is in the wall. If yes, stop the tank.
  if(detectCollisions(tank.nextFrame().TLx, tank.nextFrame().TLy, wall)){
    tank.velX = 0;
    tank.velY = 0;
  };
  if(detectCollisions(tank.nextFrame().TRx, tank.nextFrame().TRy, wall)){
    tank.velX = 0;
    tank.velY = 0;
  };
  if(detectCollisions(tank.nextFrame().BLx, tank.nextFrame().BLy, wall)){
    tank.velX = 0;
    tank.velY = 0;
  };
  if(detectCollisions(tank.nextFrame().BRx, tank.nextFrame().BRy, wall)){
    tank.velX = 0;
    tank.velY = 0;
  };
}

function wallInTankCollisions(tank, wall){
  // Determine if a corner of the wall is in the tank. If yes, stop the tank.
  if(detectCollisions(wall.TRx, wall.TRy, tank.nextFrame())){
    tank.velX = 0;
    tank.velY = 0;
  };
  if(detectCollisions(wall.TLx, wall.TLy, tank.nextFrame())){
    tank.velX = 0;
    tank.velY = 0;
  };
  if(detectCollisions(wall.BRx, wall.BRy, tank.nextFrame())){
    tank.velX = 0;
    tank.velY = 0;
  };
  if(detectCollisions(wall.BLx, wall.BLy, tank.nextFrame())){
    tank.velX = 0;
    tank.velY = 0;
  };
}

function wallAndPelletCollisions(tank, wall){
  // Determine if any of a tank's pellets are in the wall.
  tank.pellets.forEach((pellet) => {
    var collision = false;
    if(detectCollisions(pellet.x, pellet.y, wall)){
      collision = true;
    }
    if(detectCollisions(pellet.x + pelletSize, pellet.y, wall)){
      collision = true;
    }
    if(detectCollisions(pellet.x - pelletSize, pellet.y, wall)){
      collision = true;
    }
    if(detectCollisions(pellet.x, pellet.y + pelletSize, wall)){
      collision = true;
    }
    if(detectCollisions(pellet.x, pellet.y - pelletSize, wall)){
      collision = true;
    }
    if(detectCollisions(pellet.x + pelletSize, pellet.y + pelletSize, wall)){
      collision = true;
    }
    if(detectCollisions(pellet.x - pelletSize, pellet.y - pelletSize, wall)){
      collision = true;
    }
    if(detectCollisions(pellet.x + pelletSize, pellet.y + pelletSize, wall)){
      collision = true;
    }
    if(detectCollisions(pellet.x - pelletSize, pellet.y - pelletSize, wall)){
      collision = true;
    }

    if (collision) {
      // A pellet hit the wall. Delete it.
      var index = tank.pellets.indexOf(pellet);
      if (index > -1) {
        tank.pellets.splice(index, 1);
      }
    }
  });
}

function fillBackground(){
  // This function draws the background.

  // Fills the background with a lovely solid gray color.
  context.fillStyle = "#FCFCFC";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.beginPath();

  // Draw the vertical grid lines
  var i=0;
  while (i < canvas.width) {
    context.strokeStyle = "#DDDDDD";
    drawLine(i, 0, i, canvas.height);
    i += 100;
  }

  // Draw the horizontal grid lines
  i=0;
  while (i < canvas.height) {
    drawLine(0, i, canvas.width, i);
    i+= 100;
  }
  context.stroke();
}
