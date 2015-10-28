(function() {
  if(typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginpath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  };

  MovingObject.prototype.move = function() {
    
  };
}());
