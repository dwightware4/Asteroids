(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(options) {
    options.pos = options.pos || options.game.randomPosition();
    options.radius = Asteroid.RADIUS;
    options.vel = options.vel || Asteroids.Util.randomVector(Asteroid.SPEED);

    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.drawImage(Asteroid.IMAGE, this.pos[0], this.pos[1], 50, 50);
  };

  Asteroid.IMAGES = [
    'images/asteroid1.png',
    'images/asteroid2.png',
    'images/asteroid3.png',
    'images/asteroid4.png',
    'images/asteroid5.png',
    'images/asteroid6.png',
    'images/asteroid7.png',
    'images/asteroid8.png',
  ];
  Asteroid.IMAGE = new Image();
  Asteroid.IMAGE.src = Asteroid.IMAGES[Math.floor(Math.random() * 8)];
  Asteroid.COLOR = '#000';
  Asteroid.RADIUS = 25;
  Asteroid.SPEED = 4;

  Asteroid.prototype.collideWith = function(otherObject) {
    if(otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };
}());
