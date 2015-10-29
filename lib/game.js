(function() {
  if(typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];

    this.addAsteroids();
  };

  Game.prototype.add = function(object) {
    if(object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    }else if(object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    }else if(object instanceof Asteroids.Ship) {
      this.ships.push(object);
    }else{
      throw "invalid object";
    }
  };

  Game.prototype.addAsteroids = function() {
    for(var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({game: this}));
    }
  };

  Game.prototype.addShip = function() {
    var ship = new Asteroids.Ship({
      pos: this.randomPosition(),
      game: this
    });
    this.add(ship);
    return ship;
  };

  Game.prototype.allObjects = function() {
    return [].concat(this.ships, this.asteroids, this.bullets);
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
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.drawImage(Game.BG_IMAGE, 0, 0);

    this.allObjects().forEach(function(object) {
      object.draw(ctx);
    });
  };

  Game.prototype.isOutofBounds = function(pos) {
    return (pos[0] < 0) || (pos[1] < 0) || (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.randomPosition = function() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  };

  Game.prototype.remove = function(object) {
    if(object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    }else if(object instanceof Asteroids.Asteroid) {
      var idx = this.asteroids.indexOf(object);
      this.asteroids[idx] = new Asteroids.Asteroid({game: this});
    }else if(object instanceof Asteroids.ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    }else {
      throw "invalid object";
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
      wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)
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

  Game.BG_IMAGE = new Image();
  Game.BG_IMAGE.src = 'http://img4.wikia.nocookie.net/__cb20120730200249/ipod/images/6/65/Earth_and_Moon.jpg';
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.NUM_ASTEROIDS = 10;

}());