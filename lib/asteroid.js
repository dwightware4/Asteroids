(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(options) {
    options.pos = options.pos || options.game.randomPosition();
    options.radius = options.radius;
    options.vel = options.vel || Asteroids.Util.randomVector(Asteroid.SPEED);

    this.width = options.width;
    this.height = options.height;
    this.frames = options.frames;
    this.ticksPer = options.ticksPer;
    this.size = options.size;
    this.radius = options.radius;

    this.frameIndex = 0;
    this.tick = 0;
    this.image = new Image();
    this.image.src = 'images/asteroids.png';
    this.pos = [0, 0];

    Asteroids.MovingObject.call(this, options);
  };

  Asteroid.SPEED = 5;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.draw = function(ctx) {
    // this draws the asteroid as a circle, which helps calibrate image pos
    // ctx.fillStyle = '#cc5500';w
    // ctx.beginPath();
    // ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    // ctx.fill();

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

      this.pos[0] - (this.radius + (this.size * 8)), // destination x
      this.pos[1] - (this.radius + (this.size * 8)), // destination y
      this.radius * 2.75, // destination width
      this.radius * 2.75 // destination height
    );

    this.frameIndex = this.frameIndex === this.frames - 1 ? 0 : this.frameIndex;
  };

  Asteroid.prototype.collideWith = function(otherObject) {
    if(otherObject instanceof Asteroids.Ship) {
      document.getElementById('damage').pause();
      document.getElementById('damage').currentTime = 0;
      document.getElementById('damage').play();

      this.game.shields -= 33.33;
      otherObject.relocate();
    }else if(otherObject instanceof Asteroids.Bullet) {
      this.game.addExplosion(this);
      document.getElementById('explosion').pause();
      document.getElementById('explosion').currentTime = 0;
      document.getElementById('explosion').play();

      this.game.score += 1;
      if(this.size > 1) {
        this.respawn();
      }
      this.remove();
      otherObject.remove();
    }
  };

  Asteroid.prototype.respawn = function() {
    var radius = 20 * (this.size - 1);
    for (var i = 0; i < 3; i++) {
      this.game.add(new Asteroids.Asteroid({
        game: this.game,
        pos: this.pos,
        width: 128,
        height: 128,
        frames: 8,
        ticksPer: 5,
        size: this.size - 1,
        radius: radius
      }));
    }
  };
}());
