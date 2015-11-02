(function() {
  if(typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.explosions = [];
    this.bullets = [];
    this.BG_IMAGE = new Image();
    this.BG_IMAGE.src = 'images/bg.jpg';
    this.pulse = 0;
    this.shields = 100;
    this.score = 0;
    this.level = 1;
  };

  Game.FPS = 32;
  Game.DIM_X = window.innerWidth;
  Game.DIM_Y = window.innerHeight;

  Game.prototype.add = function(object) {
    if(object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    }else if(object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    }else if(object instanceof Asteroids.Ship) {
      this.ship = object;
    }else if(object instanceof Asteroids.Explosion) {
      this.explosions.push(object);
    }
  };

  Game.prototype.addShip = function() {
    var ship = new Asteroids.Ship({
      pos: [Game.DIM_X / 2, Game.DIM_Y / 2],
      game: this
    });
    this.add(ship);
    return ship;
  };

  Game.prototype.centerPosition = function() {
    return [Game.DIM_X / 2, Game.DIM_Y / 2];
  };

  Game.prototype.addAsteroids = function(size) {
    var radius = 20 * size;
    for(var i = 0; i < this.level; i++) {
      var pos = this.randomPosition();
      while(Asteroids.Util.distance(pos, this.ship.pos) < 125) {
        pos = this.randomPosition();
      }
      this.add(new Asteroids.Asteroid({
        game: this,
        pos: pos,
        width: 128,
        height: 128,
        frames: 8,
        ticksPer: 5,
        size: size,
        radius: radius
      }));
    }
  };

  Game.prototype.addExplosion = function(asteroid) {
    this.add(new Asteroids.Explosion({
      width: 64,
      height: 64,
      frames: 5,
      ticksPer: 2,
      image: 'images/explosion.png',
      asteroid: asteroid,
    }));
  };


  Game.prototype.allObjects = function() {
    allObjects = [].concat(this.bullets, this.asteroids);
    allObjects.push(this.ship);
    return allObjects;
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
    ctx.drawImage(this.BG_IMAGE, 0, 0);

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 250, 40);
    ctx.fillRect(Game.DIM_X / 2 - 87.5, 0, 175, 40);
    ctx.fillRect(Game.DIM_X, 0, -160 - (this.score.toString().length * 12), 40);

    ctx.fillStyle = '#FFF';
    ctx.font="20px gameFont";
    ctx.fillText("Shields: " + Math.floor(this.shields) + "%", 125, 30);
    ctx.fillText("Level: " + this.level, Game.DIM_X / 2, 30);
    ctx.fillText(
      "Score: " + this.score,
      Game.DIM_X - (80 + (this.score.toString().length * 6)), 30
    );

    var drawableObjects = this.allObjects().concat(this.explosions);

    drawableObjects.forEach(function(object) {
      object.draw(ctx);
    });
  };

  Game.prototype.drawPause = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.drawImage(this.BG_IMAGE, 0, 0);

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 100, 40);
    ctx.fillRect(Game.DIM_X / 2 - 50, 0, 100, 40);
    ctx.fillRect(Game.DIM_X, 0, -105 - (this.score.toString().length * 11), 40);

    ctx.fillStyle = '#FFF';
    ctx.font="20px gameFont";
    ctx.fillText("Shields: " + Math.floor(this.shields) + "%", 80, 30);
    ctx.fillText("Level: " + this.level, Game.DIM_X / 2, 30);
    ctx.fillText(
      "Score: " + this.score,
      Game.DIM_X - (50 + (this.score.toString().length * 6)), 30
    );

    this.allObjects().forEach(function(object) {
      object.draw(ctx);
    });
    if(key.isPressed('p')) {
      this.gameView.start();
    }
  };

  Game.prototype.drawIntro = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.drawImage(this.BG_IMAGE, 0, 0);
    ctx.fillStyle = '#FFF';
    ctx.font="50px gameFont";
    ctx.textAlign='center';
    ctx.fillText("Welcome to Asteroids", Game.DIM_X / 2, Game.DIM_Y / 2 - 20);
    ctx.font="25px gameFont";

    if(this.pulse >= Asteroids.Game.FPS) {
      this.pulse = 0;
    }else if(this.pulse > Asteroids.Game.FPS - (Asteroids.Game.FPS / 3)){
      this.pulse += 1;
    }else {
      ctx.fillText(
        "Press <enter> to Start",
        Game.DIM_X / 2, Game.DIM_Y / 2 + 100
      );
      this.pulse += 1;
    }

    ctx.font="15px Arial";
    ctx.fillText("© 2015 Dwight Ware", 75, Game.DIM_Y - 10);

    if(key.isPressed('enter')) {
      this.gameView.start();
    }
  };

  Game.prototype.drawOutro = function(ctx) {
    document.getElementById('thrust').pause();
    document.getElementById('thrust').currentTime = 0;
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.drawImage(this.BG_IMAGE, 0, 0);
    ctx.fillStyle = '#FFF';
    ctx.font="75px gameFont";
    ctx.textAlign='center';
    ctx.fillText("Game Over!", Game.DIM_X / 2, Game.DIM_Y / 2 - 20);
    ctx.font="25px gameFont";
    ctx.fillText(
      "Level Reached: " + this.level + "!",
      Game.DIM_X / 2, Game.DIM_Y / 2 + 40
    );
    ctx.fillText(
      "Final Score: " + this.score + "!",
      Game.DIM_X / 2, Game.DIM_Y / 2 + 80
    );

    if(this.pulse >= Asteroids.Game.FPS) {
      this.pulse = 0;
    }else if(this.pulse > Asteroids.Game.FPS - (Asteroids.Game.FPS / 3)){
      this.pulse += 1;
    }else {
      ctx.fillText(
        "Press <enter> to Start a New Game",
        Game.DIM_X / 2, Game.DIM_Y / 2 + 160
      );
      this.pulse += 1;
    }

    ctx.font="15px Arial";
    ctx.fillText("© 2015 Dwight Ware", 75, Game.DIM_Y - 10);

    if(key.isPressed('enter')) {
      this.gameView.reset();
    }
  };

  Game.prototype.isOutofBounds = function(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
    (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.randomPosition = function() {
    return [
      Math.floor(Game.DIM_X * Math.random()),
      Math.floor(Game.DIM_Y * Math.random())
    ];
  };

  Game.prototype.remove = function(object) {
    if(object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    }else if(object instanceof Asteroids.Asteroid) {
      // don't regenerate asteroids
      this.asteroids.splice(this.asteroids.indexOf(object), 1);

      // regenerate asteroids
      // var idx = this.asteroids.indexOf(object);
      // var pos = this.randomPosition();
      // while(Asteroids.Util.distance(pos, this.ship.pos) < 75) {
      //   pos = this.randomPosition();
      // }
      // this.asteroids[idx] = new Asteroids.Asteroid({
      //   game: this,
      //   pos: pos,
      //   width: 128,
      //   height: 128,
      //   frames: 7,
      //   ticksPer: 5,
      // });
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
}());
