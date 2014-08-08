var inherits     = require('inherits');
var Control      = require('./control');

module.exports = Ellipse;
inherits(Ellipse, Control);

function Ellipse(opt) {
  if (!(this instanceof Ellipse)) return new Ellipse(opt);
  this.constructor.super_.call(this, opt);
}

Ellipse.prototype.matchEvent = function matchEvent(event) {
  return event.type === 'ellipse';
};

Ellipse.prototype.down = function(xy) {
  this.event = {
    type: 'ellipse',
    args: {},
    origin: xy
  };
  this.emit('createEvent', this.event);
};

Ellipse.prototype.move = function(xy) {
  if (!this.paint) return;
  var event = this.event;
  var args = event.args;
  var origin = event.origin;
  var to = xy;
  var x = Math.min(to[0], origin[0]);
  var y = Math.min(to[1], origin[1]);
  var w = Math.abs(to[0] - origin[0]);
  var h = Math.abs(to[1] - origin[1]);
  event.args.cx = x;
  event.args.cy = y;
  event.args.rx = w;
  event.args.ry = h;
  this.emit('updateEvent', event);
};
