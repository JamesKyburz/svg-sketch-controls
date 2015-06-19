var inherits     = require('inherits');
var Control      = require('./control');

module.exports = Arrow;
inherits(Arrow, Control);

function Arrow(opt) {
  if (!(this instanceof Arrow)) return new Arrow(opt);
  this.constructor.super_.call(this, opt);
}

Arrow.prototype.matchEvent = function matchEvent(event) {
  return event.type === 'path' && event.args['data-arrow'];
};

Arrow.prototype.down = function down(xy) {
  this.event = {
    type: 'path',
    args: {
      'd': 'M ' + xy.join(','),
      'data-arrow': true
    },
    origin: xy
  };
  this.emit('createEvent', this.event);
};

Arrow.prototype.move = function move(xy) {
  if (!this.paint) return;
  var self = this;
  var points = this.event.origin.concat(xy);
  var x1 = points[0];
  var y1 = points[1];
  var x2 = points[2];
  var y2 = points[3];
  var arrow = [ [ 2, 0 ], [ -10, -5 ], [ -10, 5] ];
  var angle = Math.atan2(y2 - y1, x2 - x1);
  rotate();
  translate();
  this.emit('updateEvent', this.event);
  function rotate() {
    arrow = arrow.map(rotatePoint);
    function rotatePoint(point) {
        var x = point[0];
        var y = point[1];
        return [
            (x * Math.cos(angle)) - (y * Math.sin(angle)),
            (x * Math.sin(angle)) + (y * Math.cos(angle))
        ];
    }
  }
  function translate() {
    arrow = arrow.map(movePoint);
    function movePoint(point) {
      return [
        point[0] + x2,
        point[1] + y2
      ];
    }
    var d = 'M ' + self.event.origin.join(',') + ' L ' + xy.join(',') + path();
    self.event.args.d = d;
    function path() {
      var d = '';
      d += ' M ' + arrow[0][0] + ' ' + arrow[0][1];
      d += ' L ' + arrow[1][0] + ' ' + arrow[1][1];
      d += ' M ' + arrow[2][0] + ' ' + arrow[2][1];
      d += ' L ' + arrow[0][0] + ' ' + arrow[0][1];
      return d;
    }
  }
};
