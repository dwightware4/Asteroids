test

(function() {
  if(typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };

  MovingObject.prototype.collideWith = function(otherObject) {

  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var centerDistance = Asteroids.Util.distance(this.pos, otherObject.pos);
    return centerDistance < (this.radius + otherObject.radius);
  };

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.remove = function() {
    this.game.remove(this);
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  };

  MovingObject.prototype.move = function() {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    if(this.game.isOutofBounds(this.pos)) {
      if(this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      }else {
        this.remove();
      }
    }
  };
}());
