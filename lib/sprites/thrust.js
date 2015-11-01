(function() {
  if(typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Thrust = Asteroids.Thrust = function(options) {
    this.width = options.width;
    this.height = options.height;
    this.frames = options.frames;
    this.frameIndex = 0;
    this.tick = 0;
    this.ticksPer = options.ticksPer;
    this.image = new Image();
    this.image.src = options.image;
    this.ship = options.ship;
  };

  Thrust.prototype.draw = function(ctx) {
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

      -32, // destination x
      -7, // destination y
      this.width, // destination width
      this.height // destination height
    );

    this.frameIndex = this.frameIndex === this.frames - 1 ? 0 : this.frameIndex;
  };
}());
