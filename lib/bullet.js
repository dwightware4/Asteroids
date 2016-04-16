(function() {
	if(typeof Asteroids === 'undefined') window.Asteroids = {};

	var Bullet = Asteroids.Bullet = function(options) {
		options.radius = Bullet.RADIUS;
		options.color  = Bullet.COLOR;

		Asteroids.MovingObject.call(this, options);
	};

	Bullet.SKIN     = new Image();
	Bullet.SKIN.src = 'images/bullet.png';
	Bullet.RADIUS   = 4;
	Bullet.SPEED    = 20;

	Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

	Bullet.prototype.draw = function(ctx) {
		ctx.drawImage(
			Bullet.SKIN,
			this.pos[0] - 5, this.pos[1] - 5,
			Bullet.RADIUS * 2.75,
			Bullet.RADIUS * 2.75);
		};

		Bullet.prototype.isWrappable = false;
}());
