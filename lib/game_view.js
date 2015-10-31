(function() {
  if(typeof Asteroids === 'undefined'){
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.timerId = null;
  };

  GameView.prototype.handleKeys = function() {
    activeKeys = {};

    if(key.isPressed('space')) {
      activeKeys.space = activeKeys.space ? false : true;
    }
    if(key.isPressed('w')) {
      activeKeys.w = activeKeys.w ? false : true;
    }
    if(key.isPressed('a')) {
      activeKeys.a = activeKeys.a ? false : true;
    }
    if(key.isPressed('s')) {
      activeKeys.s = activeKeys.s ? false : true;
    }
    if(key.isPressed('d')) {
      activeKeys.d = activeKeys.d ? false : true;
    }

    if(activeKeys.space) {
      this.ship.fireBullet();
    }
    if(activeKeys.w) {
      this.ship.accelerate();
    }
    if(activeKeys.a) {
      this.ship.turn(-1);
    }
    if(activeKeys.s) {
      this.ship.brake();
    }
    if(activeKeys.d) {
      this.ship.turn(1);
    }
  };

  GameView.prototype.intro = function() {
    this.introTimerId = setInterval(
      function() {
        this.game.drawIntro(this.ctx);
      }.bind(this), 1000 / Asteroids.Game.FPS);
  };

  GameView.prototype.start = function() {
    clearInterval(this.introTimerId);
    clearInterval(this.outroTimerId);
    this.gameTimerId = setInterval(
      function() {
        if(this.game.lives < 1) {
          this.outro();
        }
        this.game.step();
        this.game.draw(this.ctx);
        this.handleKeys();
      }.bind(this), 1000 / Asteroids.Game.FPS);
  };

  GameView.prototype.outro = function() {
    clearInterval(this.gameTimerId);
    this.outroTimerId = setInterval(
      function() {
        this.game.drawOutro(this.ctx);
      }.bind(this), 1000 / Asteroids.Game.FPS);
  };

  GameView.prototype.reset = function() {
    this.game = new Asteroids.Game();
    this.game.gameView = this;
    this.ship = this.game.addShip();
    this.start();
  };

  GameView.prototype.stop = function() {
    clearInterval(this.timerId);
  };
}());
