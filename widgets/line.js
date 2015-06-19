var inherits     = require('inherits');
var Control      = require('./control');

module.exports = Line;
inherits(Line, Control);

function Line(opt) {
  if (!(this instanceof Line)) return new Line(opt);
  this.constructor.super_.call(this, opt);
}

Line.prototype.matchEvent = function matchEvent(event) {
  return event.type === 'path' && event.args.d &&
    event.args.d.split(',').length === 3 &&
    !event.args['data-arrow']
  ;
};

Line.prototype.down = function(xy) {
  this.event = {
    type: 'path',
    args: {
      'd': 'M ' + xy.join(',')
    },
    origin: xy
  };
  this.emit('createEvent', this.event);
};

Line.prototype.move = function(xy) {
  if (!this.paint) return;
  var d = this.event.args.d;
  d = d.replace(/ L.*/g, '');
  this.event.args.d = d + ' L ' + xy.join(',');
  this.emit('updateEvent', this.event);
};
