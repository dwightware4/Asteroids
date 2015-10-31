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
    var gameView = this;
    this.introTimerId = setInterval(
      function() {
        gameView.game.drawIntro(gameView.ctx);
      }, 1000 / Asteroids.Game.FPS);
  };

  GameView.prototype.start = function() {
    clearInterval(this.introTimerId);
    if(this.game.lives === 0) {
      clearInterval(this.timerId);
      this.game.drawGameOver();
    }
    var gameView = this;
    this.timerId = setInterval(
      function() {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
        gameView.handleKeys();
      }, 1000 / Asteroids.Game.FPS);
  };

  GameView.prototype.stop = function() {
    clearInterval(this.timerId);
  };
}());
