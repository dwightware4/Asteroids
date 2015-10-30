(function() {
  if(typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(options) {
    this.angle = 0;
    this.speed = 0.1;
    this.turnSpeed = 0.001;
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || Ship.COLOR;

    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function(ctx) {
    var radians = this.angle/Math.PI*180;
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(radians);
    ctx.drawImage(Ship.IMAGE, -25, -25, 50, 50);
    ctx.restore();
  };

  Ship.prototype.fireBullet = function() {
    var relVel = Asteroids.Util.scale(
      Asteroids.Util.dir(this.vel),
      Asteroids.Bullet.SPEED
    );

    var bulletVel = [relVel[0] + this.vel[0], relVel[1] + this.vel[1]];

    var bullet = new Asteroids.Bullet({
      pos: [this.pos[0] + 25, this.pos[1]],
      vel: bulletVel,
      color: this.color,
      game: this.game
    });
    this.game.add(bullet);
  };


  Ship.prototype.accelerate = function() {
    var radians = (this.angle * 180) / Math.PI;
    this.vel[1] -= (Math.cos(radians) * this.speed);
    this.vel[0] += (Math.sin(radians) * this.speed);
  };

  Ship.prototype.brake = function() {
    this.vel = [0, 0];
  };

  Ship.prototype.turn = function(direction) {
    this.angle += this.turnSpeed * direction;
  };

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.IMAGES = [
    'images/ship1.png',
    'images/ship2.png',
    'images/ship3.png',
    'images/ship4.png',
    'images/ship5.png',
  ];
  Ship.IMAGE = new Image();
  Ship.IMAGE.src = Ship.IMAGES[Math.floor(Math.random() * 5)];
  Ship.RADIUS = 15;
}());
