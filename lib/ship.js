(function() {
  if(typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || Ship.COLOR;

    Asteroids.MovingObject.call(this, options);
  };

  Ship.prototype.pos = function() {
    return this.pos;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.drawImage(Ship.IMAGE, this.pos[0], this.pos[1], 50, 50);
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
  Ship.COLOR = '#c0c0c0';

  Ship.prototype.fireBullet = function() {
    // var norm = Asteroids.Util.norm(this.vel);
    // if(norm === 0) {
    //   return;
    // }

    var relVel = Asteroids.Util.scale(
      Asteroids.Util.direction(this.vel),
      Asteroids.Bullet.SPEED
    );

    var bulletVel = [relVel[0] + this.vel[0], relVel[1] + this.vel[1]];

    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vel: bulletVel,
      color: this.color,
      game: this.game
    });
    this.game.add(bullet);
  };

  Ship.prototype.power = function(order) {
    if(order === 'go'){
      if(this.vel[1] > 0) {
        this.vel[1] -= 5;
      }else if(this.vel[1] > -25) {
        this.vel[1] -= 0.5;
      }
    }else if(order === 'stop'){
      if(this.vel[1] < 0) {
        this.vel[1] += 5;
      }else if(this.vel[1] < 25) {
        this.vel[1] += 0.5;
      }
    }else if(order === 'turnRight') {
      if(this.vel[0] > 0) {
        this.vel[0] -= 5;
      }else if(this.vel[0] > -25) {
        this.vel[0] -= 0.5;
      }
    }else if(order === 'turnLeft') {
      if(this.vel[0] < 0) {
        this.vel[0] += 5;
      }else if(this.vel[0] < 25) {
        this.vel[0] += 0.5;
      }
    }
  };

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };
}());
