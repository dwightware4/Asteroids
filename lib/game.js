(function() {
  if(typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.ships = [];
    this.bullets = [];
    this.BG_IMAGE = new Image();
    this.BG_IMAGE.src = 'images/bg.png';
    this.DIM_X = 1000;
    this.DIM_Y = 600;
    this.flash = true;

    this.addAsteroids();
  };

  Game.prototype.add = function(object) {
    if(object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    }else if(object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    }else if(object instanceof Asteroids.Ship) {
      this.ships.push(object);
    }
  };

  Game.prototype.addAsteroids = function() {
    for(var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({game: this}));
    }
  };

  Game.prototype.addShip = function() {
    var ship = new Asteroids.Ship({
      pos: [500, 300],
      game: this
    });
    this.add(ship);
    return ship;
  };

  Game.prototype.allObjects = function() {
    return [].concat(this.bullets, this.asteroids, this.ships);
  };

  Game.prototype.checkCollisions = function() {
    this.allObjects().forEach(function(obj1){
      this.allObjects().forEach(function(obj2){
        if(obj1 == obj2) {
          return;
        }

        if(obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    }.bind(this));
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.drawImage(this.BG_IMAGE, 0, 0);
    this.allObjects().forEach(function(object) {
      object.draw(ctx);
    });
  };

  Game.prototype.drawIntro = function(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.drawImage(this.BG_IMAGE, 0, 0);
    ctx.fillStyle = '#FFF';
    ctx.font="50px tron";
    ctx.textAlign='center';
    ctx.fillText("Welcome to Asteroids", this.DIM_X / 2, this.DIM_Y / 2 - 20);
    ctx.font="25px tron";
    if(this.flash) {
      ctx.fillText("Press <space> to Begin!", this.DIM_X / 2, this.DIM_Y / 2 + 100);
      this.flash = false;
    }else {
      this.flash = true;
    }
    ctx.font="15px Arial";
    ctx.fillText("© 2015 Dwight Ware", 75, this.DIM_Y - 20);

  };

  Game.prototype.isOutofBounds = function(pos) {
    return (pos[0] < 0) || (pos[1] < 0) || (pos[0] > this.DIM_X) || (pos[1] > this.DIM_Y);
  };

  Game.prototype.randomPosition = function() {
    return [
      this.DIM_X * Math.random(),
      this.DIM_Y * Math.random()
    ];
  };

  Game.prototype.remove = function(object) {
    if(object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    }else if(object instanceof Asteroids.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
      // regenerate asteroids
    }else if(object instanceof Asteroids.ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function(object){
      object.move();
    });
  };

  Game.prototype.wrap = function(pos) {
    return [
      wrap(pos[0], this.DIM_X), wrap(pos[1], this.DIM_Y)
    ];

    function wrap(coord, max) {
      if(coord < 0) {
        return max - (coord % max);
      }else if(coord > max) {
        return coord % max;
      }else {
        return coord;
      }
    }
  };

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function(object){
      object.move();
    });
  };

  Game.FPS = 32;
  Game.NUM_ASTEROIDS = 0;
}());
