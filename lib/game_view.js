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
    if(key.isPressed('space')) {
      this.ship.fireBullet();
    }else if(key.isPressed('w')) {
      this.ship.accelerate();
    }else if(key.isPressed('a')) {
      this.ship.turn(-1);
    }else if(key.isPressed('s')) {
      this.ship.brake();
    }else if(key.isPressed('d')) {
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
