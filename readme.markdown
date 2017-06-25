# svg-sketch-controls

[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/JamesKyburz/svg-sketch-controls.svg)](https://greenkeeper.io/)

controls used together with [svg-sketch](https://github.com/JamesKyburz/svg-sketch)

Try it out! [![view on requirebin](http://requirebin.com/badge.png)](http://requirebin.com/?gist=0dc5356985194d0b8466)

Use with [browserify](http://browserify.org)

# methods

## optional methods implemented by each control

```
var control = Control(el);
```

el is the svg parent element

## control.matchEvent(event)

does event match current control?

useful if UI is to show current control (pencil, rectangle etc)

## control.down(xy)

Called with xy

## control.up(xy)

Called with xy

## control.pathSelected(opt)

opt.e dom event
opt.path svg path in json eventstream

# events

## createEvent(event)
event contains
```
{
  type: 'type',
  args: {
    'svg args + metadata'
  },
  origin: xy
}
```

## updateEvent(event)
same structure as for createEvent

## deleteEvent(event)
delete event

## closeToPath(target)
close to svg path useful with touch devices

when touching the exact point on the svg path may be hard

# install

With [npm](https://npmjs.org) do:

```
npm install svg-sketch-controls
```

# license

MIT
