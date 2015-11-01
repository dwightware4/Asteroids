(function() {
  if(typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Sprite = Asteroids.Sprite = function(options) {
    this.width = options.width;
    this.height = options.height;
    this.frames = options.frames;
    this.frameIndex = 0;
    this.tick = 0;
    this.ticksPer = options.ticksPer;
    this.image = new Image();
    this.image.src = options.image;
    this.pos = [0, 0];
  };

  Sprite.prototype.draw = function(ctx) {
    if(this.tick >= this.ticksPer) {
      this.tick = 0;
      this.frameIndex += 1;
    }else {
      this.tick += 1;
    }

    ctx.drawImage(
      this.image,
      this.frameIndex * this.width,
      this.frameIndex % 10 * this.height,
      this.width,
      this.height,
      400,
      400,
      this.width,
      this.height
    );

    this.frameIndex = this.frameIndex === this.frames - 1 ? 0 : this.frameIndex;
  };
}());
