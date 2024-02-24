import {alternatingMatrixMapping} from "../utils"

import ws281x from "../index"

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
  ws281x.render(pixels, mapping)
}

setInterval(loop, 100)
