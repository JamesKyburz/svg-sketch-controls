var inherits     = require('inherits');
var Control      = require('./control');

module.exports = Text;
inherits(Text, Control);

function Text(opt) {
  if (!(this instanceof Text)) return new Text(opt);
  this.constructor.super_.call(this, opt);
}

Text.prototype.matchEvent = function matchEvent(event) {
  return event.type === 'text';
};

Text.prototype.down = function(xy) {
  process.nextTick(this._createEvent.bind(this, xy));
};

Text.prototype._createEvent = function(xy) {
  this.event = {
    type: 'text',
    args: {
      value: prompt('text'),
      x: xy[0],
      y: xy[1]
    },
    layout: {
      font: {
        name: 'default',
        size: 20
      },
      style: {
        characterSpacing: 3
      }
    },
    origin: xy
  };
  this.emit('createEvent', this.event);
};

Text.prototype.pathSelected = function(opt) {
  var path = opt.path;
  if (path.type !== 'text') return;
  opt.e.stopPropagation();
  process.nextTick(this._updateEvent.bind(this, opt));
};

Text.prototype._updateEvent = function(opt) {
  var newText = prompt('text', opt.e.target.textContent);
  if (newText) {
    this.emit('createEvent', {
      type: 'changeText',
      args: {
        value: newText
      },
      target: opt.e.target,
      path: opt.path
    });
  }
};
