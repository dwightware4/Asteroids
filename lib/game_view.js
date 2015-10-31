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
      if(activeKeys.space) {
        activeKeys.space = false;
      }else {
        activeKeys.space = true;
      }
    }
    if(key.isPressed('w')) {
      if(activeKeys.w) {
        activeKeys.w = false;
      }else {
        activeKeys.w = true;
      }
    }
    if(key.isPressed('a')) {
      if(activeKeys.a) {
        activeKeys.a = false;
      }else {
        activeKeys.a = true;
      }
    }
    if(key.isPressed('s')) {
      if(activeKeys.s) {
        activeKeys.s = false;
      }else {
        activeKeys.s = true;
      }
    }
    if(key.isPressed('d')) {
      if(activeKeys.d) {
        activeKeys.d = false;
      }else {
        activeKeys.d = true;
      }
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

  GameView.prototype.start = function() {
    var gameView = this;
    this.timerId = setInterval(
      function() {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
        gameView.handleKeys();
      }, 1000 / Asteroids.Game.FPS
    );
  };

  GameView.prototype.stop = function() {
    clearInterval(this.timerId);
  };
}());
