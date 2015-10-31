(function() {
  if(typeof Asteroids === 'undefined'){
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = game.addShip();
    this.game.addAsteroids();
    this.timerId = null;
  };

  GameView.prototype.handleKeys = function() {
    keys = {};

    if(key.isPressed('space')) {keys.space = keys.space ? false : true;}
    if(key.isPressed('w')) {keys.w = keys.w ? false : true;}
    if(key.isPressed('a')) {keys.a = keys.a ? false : true;}
    if(key.isPressed('s')) {keys.s = keys.s ? false : true;}
    if(key.isPressed('d')) {keys.d = keys.d ? false : true;}

    if(keys.space) {this.ship.fireBullet();}
    if(keys.w) {this.ship.accelerate();}
    if(keys.a) {this.ship.turn(-1);}
    if(keys.s) {this.ship.brake();}
    if(keys.d) {this.ship.turn(1);}
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
        if(this.game.lives < 1) {this.outro();}
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
    this.ship = this.game.addShip();
    this.game.addAsteroids();
    this.game.gameView = this;
    this.ship = this.game.addShip();
    this.start();
  };

  GameView.prototype.stop = function() {
    clearInterval(this.timerId);
  };
}());
