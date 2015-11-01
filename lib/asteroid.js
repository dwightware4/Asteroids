(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(options) {
    options.pos = options.pos || options.game.randomPosition();
    options.radius = Asteroid.RADIUS;
    options.vel = options.vel || Asteroids.Util.randomVector(Asteroid.SPEED);

    this.frameIndex = 0;
    this.tick = 0;
    this.image = new Image();
    this.image.src = 'images/asteroids.png';
    this.pos = [0, 0];

    this.width = options.width;
    this.height = options.height;
    this.frames = options.frames;
    this.ticksPer = options.ticksPer;

    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.draw = function(ctx) {
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
      this.pos[0], // destination x
      this.pos[1], // destination y
      Asteroid.RADIUS, // destination width
      Asteroid.RADIUS // destination height
    );

    this.frameIndex = this.frameIndex === this.frames - 1 ? 0 : this.frameIndex;
  };

  Asteroid.RADIUS = 50;
  Asteroid.SPEED = 4;

  Asteroid.prototype.collideWith = function(otherObject) {
    if(otherObject instanceof Asteroids.Ship) {
      document.getElementById('shield').pause();
      document.getElementById('shield').currentTime = 0;
      document.getElementById('shield').play();

      this.game.shields -= 33.33;
      otherObject.relocate();
    }
  };
}());
