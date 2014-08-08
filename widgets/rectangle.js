var inherits     = require('inherits');
var Control      = require('./control');

module.exports = Rectangle;
inherits(Rectangle, Control);

function Rectangle(opt) {
  if (!(this instanceof Rectangle)) return new Rectangle(opt);
  this.constructor.super_.call(this, opt);
}

Rectangle.prototype.down = function(xy) {
  this.event = {
    type: 'rect',
    args: {
      x:0, y:0, width: 0, height: 0
    },
    origin: xy
  };
  this.emit('createEvent', this.event);
};

Rectangle.prototype.matchEvent = function matchEvent(event) {
  return event.type === 'rect';
};

Rectangle.prototype.move = function(xy) {
  if (!this.paint) return;
  var event = this.event;
  var args = event.args;
  var origin = event.origin;
  var to = xy;
  var x = Math.min(to[0], origin[0]);
  var y = Math.min(to[1], origin[1]);
  var w = Math.abs(to[0] - origin[0]);
  var h = Math.abs(to[1] - origin[1]);
  event.args.x = x;
  event.args.y = y;
  event.args.width = w;
  event.args.height = h;
  this.emit('updateEvent', event);
};
