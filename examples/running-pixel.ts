import ws281x from "../index"

let leds = 24
// Current pixel position
let offset = 0

// Configure ws281x
ws281x.configure({leds})

function loop() {
  const pixels = new Uint32Array(leds)

  // Set a specific pixel
  pixels[offset] = 0xff0000

  // Move on to next
  offset = (offset + 1) % leds

  // Render to strip
  ws281x.render(pixels)
}

setInterval(loop, 100)
