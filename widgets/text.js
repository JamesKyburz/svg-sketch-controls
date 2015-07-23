var inherits     = require('inherits');
var Control      = require('./control');

module.exports = Text;
inherits(Text, Control);

function Text(opt, dialogs) {
  if (!(this instanceof Text)) return new Text(opt);
  this.constructor.super_.call(this, opt);
  this.dialogs = dialogs;
}

Text.prototype.matchEvent = function matchEvent(event) {
  return event.type === 'text';
};

Text.prototype.down = function(xy) {
  process.nextTick(this._createEvent.bind(this, xy));
};

Text.prototype.setText = function(text) {
  this.text = text;
};

Text.prototype._createEvent = function(xy) {
  if (this.dialogs && !this.text) {
    this.dialogs.prompt('text', create.bind(this));
  } else {
    create.bind(this)(this.text || prompt('text'));
  }
  function create(text) {
    this.event = {
      type: 'text',
      args: {
        value: text,
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
  }
};

Text.prototype.pathSelected = function(opt) {
  var path = opt.path;
  if (path.type !== 'text') return;
  opt.e.stopPropagation();
  process.nextTick(this._updateEvent.bind(this, opt));
};

Text.prototype._updateEvent = function(opt) {
  var defaultValue = opt.e.target.textContent;
  if (this.dialogs) {
    this.dialogs.prompt('text', defaultValue, update.bind(this));
  } else {
    update.bind(this)(prompt('text', defaultValue));
  }
  function update(text) {
    if (text) {
      this.emit('createEvent', {
        type: 'changeText',
        args: {
          value: text
        },
        target: opt.e.target,
        path: opt.path
      });
    }
  }
};
