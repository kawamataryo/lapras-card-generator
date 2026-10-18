import assert from 'node:assert/strict'
import {spawn} from 'node:child_process'
import {once} from 'node:events'
import {createServer} from 'node:net'
import {setTimeout as delay} from 'node:timers/promises'

// Test the production build, including sharp's native PNG conversion.
const socket = createServer()
socket.listen(0, '127.0.0.1')
await once(socket, 'listening')
const port = socket.address().port
await new Promise(resolve => socket.close(resolve))

const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-H', '127.0.0.1', '-p', String(port)], {
  stdio: ['ignore', 'pipe', 'pipe']
})
let output = ''
server.stdout.on('data', chunk => { output += chunk })
server.stderr.on('data', chunk => { output += chunk })
const base = `http://127.0.0.1:${port}`

try {
  let ready = false
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error(output)
    try {
      const response = await fetch(base)
      if (response.ok) { ready = true; break }
    } catch {}
    await delay(100)
  }
  assert.ok(ready, `Production server did not start: ${output}`)

  for (const lang of ['ja', 'en']) {
    for (const type of ['score', 'tech']) {
      const query = new URLSearchParams({type, l: lang, e: '4.26', b: '3.48', i: '4.05', ep: '8.4', g: '4.1', ta: '3.5', te: '2.8', tg: '4.9'})
      const svg = await fetch(`${base}/api/svg?${query}`)
      assert.equal(svg.status, 200)
      assert.match(svg.headers.get('content-type'), /image\/svg\+xml/)
      assert.match(await svg.text(), /<svg/)

      const png = await fetch(`${base}/api/png?${query}`)
      assert.equal(png.status, 200)
      assert.match(png.headers.get('content-type'), /image\/png/)
      const data = Buffer.from(await png.arrayBuffer())
      assert.equal(data.subarray(0, 8).toString('hex'), '89504e470d0a1a0a')
      assert.ok(data.readUInt32BE(16) > 0 && data.readUInt32BE(20) > 0)
      console.log(`PASS ${type}/${lang}: SVG and valid PNG`)
    }
  }

  const missing = await fetch(`${base}/api/svg?type=tech&e=4.26`)
  assert.equal(missing.status, 200)
  assert.ok((await missing.text()).includes('-.--'))
  const page = await fetch(`${base}/?type=tech&e=4.26`)
  assert.equal(page.status, 200)
  const html = await page.text()
  assert.match(html, /property="og:image"[^>]+\/api\/png\?type=tech/)
  assert.match(html, /name="twitter:image"[^>]+\/api\/png\?type=tech/)
  assert.equal((await fetch(`${base}/api/og`)).status, 404)
  console.log('PASS missing tech axes, OGP metadata and removed /api/og')
} catch (error) {
  console.error(output)
  throw error
} finally {
  const exited = once(server, 'exit')
  server.kill('SIGTERM')
  await exited
}
