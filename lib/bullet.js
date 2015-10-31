(function() {
  if(typeof Asteroids === 'undefined'){
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(options) {
    options.radius = Bullet.RADIUS;
    options.color = Bullet.COLOR;

    Asteroids.MovingObject.call(this, options);
  };

  Bullet.COLOR = '#FF0000';
  Bullet.RADIUS = 2;
  Bullet.SPEED = 15;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function(otherObject) {
    if(otherObject instanceof Asteroids.Asteroid) {
      this.game.score += 1;
      this.remove();
      otherObject.remove();
    }
  };

  Bullet.prototype.isWrappable = false;
}());
