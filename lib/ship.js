(function() {
  if(typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(options) {
    this.angle = 0;
    this.speed = 0.2;
    this.turnSpeed = 0.0015;
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];

    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function(ctx) {
    var radians = this.angle/Math.PI*180;
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(radians);
    ctx.drawImage(Ship.SKIN, -25, -25, 50, 50);
    ctx.restore();
  };

  Ship.prototype.fireBullet = function() {
    var shipFront = [
      this.pos[0] + (5 * Math.sin(this.angle * 57.325)),
      this.pos[1] + (-5 * Math.cos(this.angle * 57.325))
    ];
    var bulletDirection = Asteroids.Util.dir(
      [(shipFront[0] - this.pos[0]),
      (shipFront[1] - this.pos[1])]
    );
    var bulletVel = Asteroids.Util.scale(
      bulletDirection,
      Asteroids.Bullet.SPEED
    );
    bulletVel[0] += this.vel[0];
    bulletVel[1] += this.vel[1];
    var bullet = new Asteroids.Bullet({
      pos: [this.pos[0], this.pos[1]],
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
    if(this.vel[0] > 0.5) {
      this.vel[0] -= 0.5;
    }else if(this.vel[0] > 0) {
      this.vel[0] = 0;
    }else if(this.vel[0] < -0.5) {
      this.vel[0] += 0.5;
    }else if(this.vel[0] < 0) {
      this.vel[0] = 0;
    }

    if(this.vel[1] > 0.5) {
      this.vel[1] -= 0.5;
    }else if(this.vel[1] > 0) {
      this.vel[1] = 0;
    }else if(this.vel[1] < -0.5) {
      this.vel[1] += 0.5;
    }else if(this.vel[1] < 0) {
      this.vel[1] = 0;
    }
  };

  Ship.prototype.turn = function(direction) {
    this.angle += this.turnSpeed * direction;
  };

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.SKINS = [
    'images/ship1.png',
    'images/ship2.png',
    'images/ship3.png',
    'images/ship4.png',
    'images/ship5.png',
  ];
  Ship.SKIN = new Image();
  Ship.SKIN.src = Ship.SKINS[Math.floor(Math.random() * 5)];
  Ship.RADIUS = 15.3;
}());
