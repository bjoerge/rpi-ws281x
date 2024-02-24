import ws281x from "../index"

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
