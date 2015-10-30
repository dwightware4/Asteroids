Ship.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.drawImage(Ship.IMAGE, this.pos[0], this.pos[1], 50, 50);
};
