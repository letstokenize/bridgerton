import { createServer, type Server } from 'node:http'
import { bridge, getApiKey, url } from './client.js'

/** Request a Plaid link_token from Bridge for a customer. */
export const createPlaidLinkToken = (customerId: string) =>
  bridge.post(`/customers/${customerId}/plaid_link_requests`, {})

/** Exchange a Plaid public_token with Bridge (server-side only). */
export function exchangePublicToken(linkToken: string, publicToken: string) {
  const apiKey = getApiKey()
  if (!apiKey) throw new Error('No Bridge API key configured. Run: bridgerton configure api-key <key>')
  return fetch(url(`/plaid_exchange_public_token/${linkToken}`), {
    method: 'POST',
    headers: {
      'Api-Key': apiKey,
      'Content-Type': 'application/json',
      'Idempotency-Key': crypto.randomUUID(),
    },
    body: JSON.stringify({ public_token: publicToken }),
  }).then(res => res.json())
}

/** Build the Plaid Link HTML page. No secrets are embedded — only the link_token. */
function buildHtml(linkToken: string, port: number): string {
  return `<!DOCTYPE html>
<html>
<head>
  <title>Link Bank Account — Bridgerton</title>
  <script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
  <style>
    body { font-family: system-ui; max-width: 500px; margin: 80px auto; text-align: center; }
    button { padding: 16px 32px; font-size: 18px; cursor: pointer; background: #0a85ea; color: white; border: none; border-radius: 8px; }
    button:hover { background: #0870c4; }
    button:disabled { background: #ccc; cursor: not-allowed; }
    .status { margin-top: 20px; color: #666; }
    .error { color: #d32f2f; }
    .success { color: #2e7d32; }
  </style>
</head>
<body>
  <h2>🏦 Link Bank Account</h2>
  <p>Connect a bank account via Plaid Link</p>
  <button id="link-btn">Connect Bank Account</button>
  <div class="status" id="status"></div>
  <script>
    (function () {
      var btn = document.getElementById('link-btn');
      var statusEl = document.getElementById('status');
      var handler = Plaid.create({
        token: ${JSON.stringify(linkToken)},
        onSuccess: function (publicToken, metadata) {
          btn.disabled = true;
          statusEl.textContent = 'Exchanging token…';
          fetch('http://localhost:${port}/exchange', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ public_token: publicToken })
          }).then(function (r) { return r.json(); }).then(function (data) {
            statusEl.className = 'status success';
            statusEl.textContent = '✅ Bank linked! You can close this tab.';
          }).catch(function () {
            statusEl.className = 'status error';
            statusEl.textContent = '❌ Exchange failed. Check the terminal.';
          });
        },
        onExit: function (err) {
          if (err) {
            statusEl.className = 'status error';
            statusEl.textContent = '❌ ' + (err.display_message || err.error_message || 'Link exited with an error.');
          } else {
            statusEl.textContent = 'Exited without connecting.';
          }
        }
      });
      btn.addEventListener('click', function () {
        statusEl.textContent = 'Opening Plaid Link…';
        btn.disabled = true;
        handler.open();
      });
    })();
  </script>
</body>
</html>`
}

/** Run the full Plaid Link flow: get link_token, serve HTML, exchange public_token. */
export async function runPlaidLinkFlow(customerId: string): Promise<Record<string, unknown>> {
  // 1. Get link_token from Bridge
  const linkRes = await createPlaidLinkToken(customerId) as Record<string, unknown>
  const linkToken = linkRes.link_token as string | undefined
  if (!linkToken) {
    return { error: 'Failed to get link_token from Bridge', details: linkRes }
  }

  console.error(`\n  ✓ Got link_token: ${linkToken.slice(0, 20)}...`)
  console.error(`    Expires: ${linkRes.link_token_expires_at}`)

  // 2. Start local server on an ephemeral port
  return new Promise((resolve) => {
    let server: Server

    const handler = (req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse) => {
      // CORS headers for the local page
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

      if (req.method === 'OPTIONS') {
        res.writeHead(204)
        res.end()
        return
      }

      if (req.method === 'GET' && req.url === '/') {
        const port = (server.address() as import('node:net').AddressInfo).port
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(buildHtml(linkToken, port))
        return
      }

      if (req.method === 'POST' && req.url === '/exchange') {
        let body = ''
        req.on('data', (chunk: Buffer) => { body += chunk.toString() })
        req.on('end', async () => {
          try {
            const { public_token } = JSON.parse(body) as { public_token: string }
            console.error(`\n  ✓ Received public_token, exchanging with Bridge…`)
            const result = await exchangePublicToken(linkToken, public_token)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(result))
            console.error(`  ✓ Exchange complete. Shutting down.\n`)
            server.close()
            resolve(result as Record<string, unknown>)
          } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: String(e) }))
          }
        })
        return
      }

      res.writeHead(404)
      res.end('Not found')
    }

    server = createServer(handler)
    server.listen(0, '127.0.0.1', async () => {
      const { port } = server.address() as import('node:net').AddressInfo
      const localUrl = `http://localhost:${port}`
      console.error(`  ✓ Local server running at ${localUrl}`)
      console.error(`  ✓ Opening browser…\n`)

      // Open browser (cross-platform)
      const { exec } = await import('node:child_process')
      const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open'
      exec(`${cmd} ${localUrl}`)
    })
  })
}
