var bulk = require('bulk-require')

module.exports = bulk(__dirname + '/widgets/', '*.js')

module.exports.movePath = require('./move_path')
