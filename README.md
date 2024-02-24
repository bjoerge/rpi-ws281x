# rpi-ws281x

This is a npm module for connecting a Raspbery Pi to Neopixel strips. It uses the
library from **jgarff** https://github.com/jgarff/rpi_ws281x.

## Installation

```bash
$ npm install @bjoerge/rpi-ws281x --save
```

## Usage

```javascript
var ws281x = require("@bjoerge/rpi-ws281x")

// One time initialization
ws281x.configure({leds: 16})

// Create my pixels
var pixels = new Uint32Array(16)

// Render pixels to the Neopixel strip
ws281x.render(pixels)
```

## Methods

This module is simple and only has four methods **configure()**, **render()**, **reset()** and **sleep()**.

- **configure(options)** - Configures the ws281x strip. Must be called once and before anything else. See
  examples below.
- **render(pixels)** - Renders the pixels specified to the strip. The **pixels** parameter must
  be an **Uint32Array** representing the color values of all pixels
  and the same size as the number of leds specified when configuring.
- **reset()** - Resets configuration.
- **sleep(ms)** - Sleeps for the specified number of milliseconds.

## Examples

### Filling the Neopixel strip with a color

```typescript
import ws281x from "@bjoerge/rpi-ws281x"

const LEDS = 24

ws281x.configure({
  leds: LEDS,
  dma: 10,
  brightness: 255,
  gpio: 18,
  type: "rgb",
})

// Create a pixel array matching the number of leds.
// This must be an instance of Uint32Array.
const pixels = new Uint32Array(LEDS)

// Create a fill color with red/green/blue.
const red = 255,
  green = 0,
  blue = 0

const color = (red << 16) | (green << 8) | blue

for (let i = 0; i < LEDS; i++) {
  pixels[i] = color
}

// Render to strip
ws281x.render(pixels)
```

### Walking a pixel through the strip

```javascript

```

### Walking a pixel with pixel mapping

```javascript
import ws281x, {alternatingMatrixMapping, remap} from "@bjoerge/rpi-ws281x"

// By setting width and height instead of number of leds
// you may use named pixel mappings.
// Currently "matrix" and "alternating-matrix" are
// supported. You may also set the "map" property
// to a custom Uint32Array to define your own map.

const panel = {
	width: 13,
	height: 13,
}

const leds = panel.width * panel.height

// Configure ws281x
ws281x.configure({leds})

// Current pixel position
let offset = 0

const mapping = alternatingMatrixMapping(panel)

function loop() {
	const pixels = new Uint32Array(leds)

	// Set a specific pixel
	pixels[offset] = 0xff0000

	// Move on to next
	offset = (offset + 1) % leds

	// Render to strip
	ws281x.render(remap(pixels, mapping))
}

setInterval(loop, 100)
```
