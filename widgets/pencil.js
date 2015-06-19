var inherits     = require('inherits');
var Control      = require('./control');

module.exports = Pencil;
inherits(Pencil, Control);

function Pencil(opt) {
  if (!(this instanceof Pencil)) return new Pencil(opt);
  this.constructor.super_.call(this, opt);
}

Pencil.prototype.matchEvent = function matchEvent(event) {
  return event.type === 'path' && event.args.d &&
    event.args.d.split(',').length > 3 &&
    !event.args['data-arrow']
  ;
};

Pencil.prototype.down = function(xy) {
  this.event = {
    type: 'path',
    args: {
      'd': 'M ' + xy.join(',')
    },
    origin: xy
  };
  this.emit('createEvent', this.event);
};

Pencil.prototype.move = function(xy) {
  if (!this.paint) return;
  var d = this.event.args.d;
  this.event.args.d = d + ' L ' + xy.join(',');
  this.emit('updateEvent', this.event);
};
