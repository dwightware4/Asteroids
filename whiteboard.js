if(key.isPressed('space')) {
  this.ship.fireBullet();
}else if(key.isPressed('w')) {
  this.ship.accelerate();
}else if(key.isPressed('a')) {
  this.ship.turn(-1);
}else if(key.isPressed('s')) {
  this.ship.brake();
}else if(key.isPressed('d')) {
  this.ship.turn(1);
}
