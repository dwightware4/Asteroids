(function() {
	if(typeof Asteroids === 'undefined') window.Asteroids = {};

	var Ship = Asteroids.Ship = function(options) {
		this.turnSpeed   = 0.0025;
		this.gunCoolDown = false;
		this.speed       = 0.25;
		this.vulnerable  = true;
		this.angle       = 0;

		options.radius = Ship.RADIUS;
		options.vel    = options.vel || [0, 0];

		Asteroids.MovingObject.call(this, options);

		this.rocketThrust = new Asteroids.Thrust({
			width    : 64,
			height   : 64,
			frames   : 4,
			ticksPer : 10,
			ship     : this,
			image    : 'images/rocketThrust.png'
		});
	};

	Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

	Ship.prototype.draw = function(ctx) {
		var radians = this.angle/Math.PI*180;
		ctx.save();
		ctx.translate(this.pos[0], this.pos[1]);
		ctx.rotate(radians);
		if(key.isPressed('w') || key.isPressed('up')) this.rocketThrust.draw(ctx);
		ctx.drawImage(Ship.SKIN, -37, -38, Ship.RADIUS * 2.5, Ship.RADIUS * 2.5);
		ctx.restore();
	};

	Ship.prototype.fireBullet = function() {
		var shipFront = [
			this.pos[0] + (5 * Math.sin(this.angle * 57.325)),
			this.pos[1] + (-5 * Math.cos(this.angle * 57.325))
		];
		var bulletDirection = Asteroids.Util.dir(
			[(shipFront[0] - this.pos[0]),
			(shipFront[1] - this.pos[1])]
		);
		var bulletVel = Asteroids.Util.scale(bulletDirection, Asteroids.Bullet.SPEED);
		bulletVel[0] += this.vel[0];
		bulletVel[1] += this.vel[1];
		var bullet = new Asteroids.Bullet({
			pos   : shipFront,
			vel   : bulletVel,
			color : this.color,
			game  : this.game
		});
		this.game.add(bullet);
		this.gunCoolDown = true;
		setTimeout(function() {
			this.gunCoolDown = false;
		}.bind(this),150);
		document.getElementById('laser').pause();
		document.getElementById('laser').currentTime = 0;
		document.getElementById('laser').play();
	};

	Ship.prototype.accelerate = function() {
		var radians = (this.angle * 180) / Math.PI;
		this.vel[0] += (Math.sin(radians) * this.speed);
		this.vel[1] -= (Math.cos(radians) * this.speed);
	};

	Ship.prototype.brake = function() {
		if(this.vel[0] > 0.5) {
			this.vel[0] -= 0.5;
		} else if(this.vel[0] > 0) {
			this.vel[0] = 0;
		} else if(this.vel[0] < -0.5) {
			this.vel[0] += 0.5;
		} else if(this.vel[0] < 0) {
			this.vel[0] = 0;
		}

		if(this.vel[1] > 0.5) {
			this.vel[1] -= 0.5;
		} else if(this.vel[1] > 0) {
			this.vel[1] = 0;
		} else if(this.vel[1] < -0.5) {
			this.vel[1] += 0.5;
		} else if(this.vel[1] < 0) {
			this.vel[1] = 0;
		}
	};

	Ship.prototype.turn = function(direction) {
		this.angle += this.turnSpeed * direction;
	};

	Ship.prototype.relocate = function() {
		this.vulnerable = false;
		this.pos        = this.game.centerPosition();
		this.vel        = [0, 0];
		setTimeout(function() {
			this.vulnerable = true;
		}.bind(this), 1500);
	};

	Ship.SKIN     = new Image();
	Ship.SKIN.src = 'images/ship.png';
	Ship.RADIUS   = 30;
}());
