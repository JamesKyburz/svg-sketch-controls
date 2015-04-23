var EventEmitter = require('events').EventEmitter;
var inherits     = require('inherits');
var paperSize;

module.exports = Control;
inherits(Control, EventEmitter);

function Control(el) {
  if (!(this instanceof Control)) return new Control(el);
  this.el = el;
}

Control.prototype.ondown = function down(e) {
  e.preventDefault();
  this.paint = true;
  this._delegate(e, 'down');
};

Control.setPaperSize = function setPaperSize(size) {
  paperSize = size;
};

Control.prototype.onmove = function move(e) {
  e.preventDefault();
  this._delegate(e, 'move');
};

Control.prototype.onpathselected = function pathSelected(opt) {
  if (typeof this.pathSelected === 'function') {
    this.pathSelected(opt);
  }
};

Control.prototype.onup = function up(e) {
  e.preventDefault();
  this.paint = false;
  this._delegate(e, 'up');
};

Control.prototype._delegate = function delegate(e, eventName) {
  var xy = this.xy(e);
  if (xy) {
    if (typeof this[eventName] === 'function') {
      if (boundcheck(xy[0], xy[1])) {
        this[eventName](xy, e);
      }
    }
  }
};

function boundcheck(x, y) {
  return x > 0 &&
         y > 0 &&
         (!paperSize || x <= paperSize[1]) &&
         (!paperSize || y <= paperSize[0])
  ;
}

Control.prototype._checkCloseToPath = function checkCloseToPath(xy, e) {
  if (!this.el.getIntersectionList) return;
  var close;
  var self = this;
  [0, 5, -5].forEach(check);

  function check(offset) {
    if (!close) close = self._closeToPath(xy[0] + offset, xy[1] + offset);
  }
};

Control.prototype._closeToPath = function closeToPath(x, y) {
  var rect = this.el.createSVGRect();
  rect.x = x;
  rect.y = y;
  rect.width = 7;
  rect.height = 7;

  var list = [].slice.call(this.el.getIntersectionList(rect, null)).filter(notGrid);

  if (list.length) {
    return this.emit('closeToPath', {target: list[0]});
    return list.length;
  }

  function notGrid(element) {
    return element.classList[0] !== 'grid';
  }
};

Control.prototype.xy = function xy(e) {
  if (e.targetTouches && e.targetTouches.length) {
    x = e.targetTouches[0].pageX;
    y = e.targetTouches[0].pageY;
  } else {
    x = e.clientX || e.pageX || 0;
    y = e.clientY || e.pageY || 0;
  }
  var ctm = this.el.getScreenCTM();
  var point = this.el.createSVGPoint();
  point.x = x; point.y = y;
  point = point.matrixTransform(ctm.inverse());

  return [point.x, point.y].map(Math.floor);
};
