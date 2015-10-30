(function() {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};

  var randomVector = Util.randomVector = function(length) {
    var deg = 2 * Math.PI * Math.random();

    return scale([Math.sin(deg), Math.cos(deg)], length);
  };

  var direction = Util.direction = function(vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  };

  var distance = Util.distance = function(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  var norm = Util.norm = function(vector) {
    return Util.distance([0, 0], vector);
  };

  var scale = Util.scale = function(vector, m) {
    return [vector[0] * m, vector[1] * m];
  };

  var inherits = Util.inherits = function(ChildClass, BaseClass) {
    function Surrogate () { this.constructor = ChildClass; }
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };
}());
