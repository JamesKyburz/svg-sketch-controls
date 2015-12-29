var inherits = require('inherits')
var Control = require('./control')
var movePath = require('../move_path')
var xtend = require('xtend')

module.exports = Move
inherits(Move, Control)

function Move (opt) {
  if (!(this instanceof Move)) return new Move(opt)
  this.constructor.super_.call(this, opt)
}

Move.prototype.down = Control.prototype._checkCloseToPath

Move.prototype.up = function up () {
  this.draggable = false
}

Move.prototype.move = function move (xy) {
  var event = this.event
  if (this.draggable && event) {
    var target = event.path
    target.origin = target.origin || xy
    var origin = target.origin
    var x = xy[0] - origin[0]
    var y = xy[1] - origin[1]

    x -= 9
    y += 9

    event.args = xtend(target.args)
    delete event.args.value
    movePath({x: x, y: y, event: event})
    this.emit('updateEvent', event)
  }
}

Move.prototype.pathSelected = function pathSelected (opt) {
  this.draggable = true
  var path = opt.path
  var e = opt.e

  if (e.stopPropagation) {
    e.stopPropagation()
  }

  this.event = {
    type: 'move',
    args: {},
    target: e.target,
    path: path
  }
  this.emit('createEvent', this.event)
}
