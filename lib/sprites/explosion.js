(function() {
  if(typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Explosion = Asteroids.Explosion = function(options) {
    this.width = options.width;
    this.height = options.height;
    this.frames = options.frames;
    this.frameIndex = 0;
    this.tick = 0;
    this.ticksPer = options.ticksPer;
    this.image = new Image();
    this.image.src = options.image;
    this.asteroid = options.asteroid;
  };

  Explosion.prototype.draw = function(ctx) {
    if(this.tick >= this.ticksPer) {
      this.tick = 0;
      this.frameIndex += 1;
    }else {
      this.tick += 1;
    }
    ctx.drawImage(
      this.image,
      this.frameIndex * this.width, // src x
      this.frameIndex % 10 * this.height, // src y
      this.width, // src width
      this.height, // src height

      this.asteroid.pos[0] - (this.asteroid.radius + (this.asteroid.size * 8)), // destination x
      this.asteroid.pos[1] - (this.asteroid.radius + (this.asteroid.size * 8)), // destination y
      this.width * this.asteroid.size, // destination width
      this.height * this.asteroid.size // destination height
    );
  };
}());
