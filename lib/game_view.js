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
      this.ship.power('go');
    }else if(key.isPressed('a')) {
      this.ship.power('turnRight');
    }else if(key.isPressed('s')) {
      this.ship.power('stop');
    }else if(key.isPressed('d')) {
      this.ship.power('turnLeft');
    }else if(key.isPressed('e')) {
      this.ship.power('halt');
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
