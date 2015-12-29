var inherits = require('inherits')
var Control = require('./control')

module.exports = Rubber
inherits(Rubber, Control)

function Rubber (opt) {
  if (!(this instanceof Rubber)) return new Rubber(opt)
  this.constructor.super_.call(this, opt)
}

Rubber.prototype.down = Control.prototype._checkCloseToPath

Rubber.prototype.pathSelected = function pathSelected (opt) {
  var path = opt.path
  var e = opt.e

  if (e.stopPropagation) {
    opt.e.stopPropagation()
  }

  if (path.el) path.el.style.display = 'none'

  this.emit('deletePath', {
    target: e.target,
    path: path
  })
}
