var tankWidth = 20
var tankLength = 32
var tankSpeed = 10;

class Tank {
  constructor(x, y, bodyRotation, turretRotation) {
    this.x = x;
    this.y = y;
    this.velX = 0;
    this.velY = 0;
    this.bodyRotation = bodyRotation;
    this.turretRotation = turretRotation;
    this.isMoving = false;
    this.deceleration = 0.8;
  }
  move(dir) {
    this.isMoving = true;
    var velX = Math.cos(this.turretRotation + this.bodyRotation) * tankSpeed * dir;
    var velY = -1 * Math.sin(this.turretRotation + this.bodyRotation) * tankSpeed * dir;
    this.velX = velX
    this.velY = velY
    if (this.turretRotation > 0.005) {
      rotateBodyRight()
    } else if (this.turretRotation < -0.005) {
      rotateBodyLeft()
    }
  }

  rotateBodyLeft() {
    this.bodyRotation -= 0.01
  }
  rotateBodyRight() {
    this.bodyRotation += 0.01
  }
  rotateTurretLeft() {
    this.turretRotation -= 0.01
  }
  rotateTurretRight() {
    this.turretRotation += 0.01
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
    context.rect(this.x, this.y, tankWidth, tankLength);
    context.stroke();
    // TODO:
  }
}
