var tankWidth = 20
var tankLength = 32
var tankSpeed = 10;
var rotateSpeed = 0.1;
var pelletSpeed = 20;
var pelletSize = 5;

class Tank {
  constructor(x, y, bodyRotation, turretRotation) {
    this.x = x;
    this.y = y;
    this.velX = 0;
    this.velY = 0;
    this.isMoving = false;
    this.bodyRotation = bodyRotation;
    this.turretRotation = turretRotation;
    this.deceleration = 0.8;
    this.pellets = [];
  }
  move(dir) {
    this.isMoving = true;
    var velX = Math.cos(this.turretRotation + this.bodyRotation) * tankSpeed * dir;
    var velY = -1 * Math.sin(this.turretRotation + this.bodyRotation) * tankSpeed * dir;
    this.velX = velX
    this.velY = velY
    if (this.turretRotation > rotateSpeed/2) {
      this.rotateBodyRight();
      this.rotateTurretLeft();
    } else if (this.turretRotation < rotateSpeed/2) {
      this.rotateBodyLeft()
      this.rotateTurretRight();
    }
  }

  rotateBodyLeft() {
    this.bodyRotation += rotateSpeed
  }
  rotateBodyRight() {
    this.bodyRotation -= rotateSpeed
  }
  rotateTurretLeft() {
    this.turretRotation += rotateSpeed
  }
  rotateTurretRight() {
    this.turretRotation -= rotateSpeed
  }
  shoot(){
    var pellVelX = Math.cos(this.turretRotation + this.bodyRotation) * pelletSpeed;
    var pellVelY = -1 * Math.sin(this.turretRotation + this.bodyRotation) * pelletSpeed;
    var pellet = new Pellet(this.x, this.y, pellVelX, pellVelY)
    this.pellets.push(pellet);
  }
  draw(){
    if (this.isMoving) {
      this.x += this.velX;
      this.y += this.velY;
    } else if (Math.sqrt(this.velX**2 + this.velY**2) > 0.1) {
      this.velX *= this.deceleration;
      this.velY *= this.deceleration;
      this.x += this.velX;
      this.y += this.velY;
    }

    context.beginPath();
    // context.translate(-1 * this.x, -1 * this.y);
    // context.rotate(this.bodyRotation);
    for (var i = 0; i < this.pellets.length; i++) {
      this.pellets[i].draw();
    }
    context.rect(this.x, this.y, tankWidth, tankLength);

    // context.rotate(-1 * this.bodyRotation);
    // context.translate(this.x, this.y);
    context.stroke();
    // TODO:
  }
}

class Pellet {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
  draw(){
    this.x += this.velX;
    this.y += this.velY;

    context.beginPath();
    context.arc(this.x, this.y, pelletSize, 0, 2 * Math.PI);
    context.stroke();
  }
}
