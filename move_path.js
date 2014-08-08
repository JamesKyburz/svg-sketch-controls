module.exports = function move(opt) {
  var event = opt.event;
  if (!event || !event.args) return;
  var x = opt.x;
  var y = opt.y;

  var transforms = [
    {o: event.args, keys:['cx', 'cy'], values: [x, y]},
    {o: event.args, keys:['x', 'y'], values: [x, y]},
    {o: event.args, keys:['height', 'width'], values: [0, 0]},
    {o: event.args, keys:['rx', 'ry'], values: [0, 0]},
    event.layout ?
    {o: event.layout.font, keys: ['size'], values: [opt.scale < 1 ? 0.4 / opt.scale : 0]}
    :
    {},
    event.layout ?
    {o: event.layout.style, keys: ['characterSpacing'], values: [0]}
    :
    {}
  ];

  transforms.forEach(applyTransforms);
  transformPath();

  function transformPath() {
    var POINT = /\d+\.?\d*\s*,\s*\d+\.?\d*/g;
    if (!event.args.d) return;
    event.args.d = event.args.d.replace(POINT, transformCoordinate);
    function transformCoordinate(point) {
      var parts = point.split(',').map(Number);
      applyTransforms({o: parts, keys: [0, 1], values: [x, y]});
      return parts.join(',');
    }
  }

  function applyTransforms(opt) {
    if (!opt.o) return;
    opt.keys.forEach(apply);
    function apply(key, i) {
      var value = opt.values[i];
      if ('undefined' !== typeof key &&
          'undefined' !== typeof opt.o[key]) {
        opt.o[key] = transform(opt.o[key], value);
      }
    }
  }

  function transform(o, n) {
    return o * (opt.scale || 1) + n;
  }
};
