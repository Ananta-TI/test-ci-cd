// Generates public/logo.png — a 256x256 location-pin mark with a
// lime→violet gradient. Pure Node (zlib), no dependencies.
import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SIZE = 256
const px = new Uint8Array(SIZE * SIZE * 4)

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const smooth = (d, w) => clamp(0.5 - d / w, 0, 1)

// Palette
const c1 = [215, 255, 62] // lime
const c2 = [139, 124, 246] // violet

const cx = SIZE / 2
const pinR = SIZE * 0.3
const headBottom = SIZE * 0.52
const tailLen = SIZE * 0.36
const dotR = pinR * 0.3

for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    const i = (y * SIZE + x) * 4
    // Gradient factor along the pin
    const g = clamp((y - SIZE * 0.12) / (SIZE * 0.8), 0, 1)
    const col = [c1[0] + (c2[0] - c1[0]) * g, c1[1] + (c2[1] - c1[1]) * g, c1[2] + (c2[2] - c1[2]) * g]

    let a = 0

    // Circle head
    const dHead = Math.hypot(x - cx, y - (headBottom - pinR))
    if (dHead < pinR + 1) a = Math.max(a, smooth(dHead - pinR, 1.4))

    // Triangle tail (pointing down to a sharp tip)
    const tipY = headBottom + tailLen
    const halfW = ((tipY - y) / tailLen) * pinR * 0.86
    if (y > headBottom - 1 && y < tipY + 1) {
      const dTail = Math.abs(x - cx) - halfW
      a = Math.max(a, smooth(dTail, 1.4))
    }

    // White dot in the middle of the head
    const dDot = Math.hypot(x - cx, y - (headBottom - pinR))
    if (dDot < dotR) a = 0

    px[i] = col[0]
    px[i + 1] = col[1]
    px[i + 2] = col[2]
    px[i + 3] = Math.round(a * 255)
  }
}

// Build PNG
function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const typeBuf = Buffer.from(type, 'ascii')
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])) >>> 0)
  return Buffer.concat([len, typeBuf, data, crcBuf])
}

function crc32(buf) {
  let c
  const table = []
  for (let n = 0; n < 256; n++) {
    c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c
  }
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(SIZE, 0)
ihdr.writeUInt32BE(SIZE, 4)
ihdr[8] = 8 // bit depth
ihdr[9] = 6 // color type RGBA

// Raw scanlines with filter byte 0
const raw = Buffer.alloc(SIZE * (SIZE * 4 + 1))
for (let y = 0; y < SIZE; y++) {
  raw[y * (SIZE * 4 + 1)] = 0
  px.subarray(y * SIZE * 4, (y + 1) * SIZE * 4).forEach((v, i) => {
    raw[y * (SIZE * 4 + 1) + 1 + i] = v
  })
}

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', deflateSync(raw)),
  chunk('IEND', Buffer.alloc(0)),
])

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'logo.png')
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, png)
console.log('wrote', out, png.length, 'bytes')