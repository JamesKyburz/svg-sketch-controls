var path = require('path')
var bulk = require('bulk-require')

module.exports = bulk(path.join(__dirname, '/widgets/'), '*.js')

module.exports.movePath = require('./move_path')
