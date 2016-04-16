(function() {
	if(typeof Asteroids === 'undefined') window.Asteroids = {};

	var GameView = Asteroids.GameView = function(game, ctx) {
		this.ctx     = ctx;
		this.game    = game;
		this.ship    = game.addShip();
		this.timerId = null;
		this.game.addAsteroids(3);
	};

	GameView.prototype.handleKeys = function() {
		keys = {};
		if(key.isPressed('space')) keys.space = keys.space ? false : true;
		if(key.isPressed('w') || key.isPressed('up')) keys.w = keys.w ? false : true;
		if(key.isPressed('a') || key.isPressed('left')) keys.a = keys.a ? false : true;
		if(key.isPressed('s') || key.isPressed('down')) keys.s = keys.s ? false : true;
		if(key.isPressed('d') || key.isPressed('right')) keys.d = keys.d ? false : true;
		if(keys.space && !this.ship.gunCoolDown) this.ship.fireBullet();
		if(keys.a) {this.ship.turn(-1);}
		if(keys.s) {this.ship.brake();}
		if(keys.d) {this.ship.turn(1);}
		if(keys.w) {
			this.ship.accelerate();
			document.getElementById('thrust').play();
		} else {
			document.getElementById('thrust').pause();
			document.getElementById('thrust').currentTime = 0;
		}
	};

	GameView.prototype.intro = function() {
		this.introTimerId = setInterval(function() {
				this.game.drawIntro(this.ctx);
			}.bind(this), 1000 / Asteroids.Game.FPS);
	};

	GameView.prototype.start = function() {
		clearInterval(this.pauseTimerId);
		clearInterval(this.introTimerId);
		clearInterval(this.outroTimerId);
		clearInterval(this.levelUpTimerId);
		this.gameTimerId = setInterval(function() {
			if(this.game.shields < 1) this.outro();
			if(this.game.asteroids.length < 1) this.levelUp();
			this.game.step();
			this.game.draw(this.ctx);
			this.handleKeys();
		}.bind(this), 1000 / Asteroids.Game.FPS);
	};

	GameView.prototype.levelUp = function() {
		document.getElementById('levelUp').play();
		this.game.level += 1;
		clearInterval(this.gameTimerId);
		this.game.addAsteroids(3);
		this.start();
	};

	GameView.prototype.outro = function() {
		document.getElementById('gameOver').play();
		clearInterval(this.gameTimerId);
		this.outroTimerId = setInterval(function() {
			this.game.drawOutro(this.ctx);
		}.bind(this), 1000 / Asteroids.Game.FPS);
	};

	GameView.prototype.reset = function() {
		this.game = new Asteroids.Game();
		this.ship = this.game.addShip();
		this.game.addAsteroids(3);
		this.game.gameView = this;
		this.ship = this.game.addShip();
		this.start();
	};
}());
