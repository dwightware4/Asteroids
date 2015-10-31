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
    ctx.drawImage(Asteroid.SKIN, this.pos[0], this.pos[1], 50, 50);
  };

  Asteroid.SKINS = [
    'images/asteroid1.png',
    'images/asteroid2.png',
    'images/asteroid3.png',
    'images/asteroid4.png',
    'images/asteroid5.png',
    'images/asteroid6.png',
    'images/asteroid7.png',
    'images/asteroid8.png',
  ];
  Asteroid.SKIN = new Image();
  Asteroid.SKIN.src = Asteroid.SKINS[Math.floor(Math.random() * 8)];
  Asteroid.COLOR = '#000';
  Asteroid.RADIUS = 25;
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
