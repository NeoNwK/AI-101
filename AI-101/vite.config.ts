import { appendFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'prompt-log-api',
      configureServer(server) {
        server.middlewares.use('/api/log-prompt', async (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: 'Method Not Allowed' }))
            return
          }

          try {
            const chunks: Uint8Array[] = []

            for await (const chunk of req) {
              chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
            }

            const body = JSON.parse(Buffer.concat(chunks).toString('utf8')) as {
              text?: string
            }
            const text = body.text?.trim()

            if (!text) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: false, error: 'Prompt text is required' }))
              return
            }

            const logFilePath = path.resolve(__dirname, 'prompt-log.md')
            await mkdir(path.dirname(logFilePath), { recursive: true })
            await appendFile(logFilePath, `${text}\n\n`, 'utf8')

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
          } catch (error) {
            console.error('Failed to write prompt log:', error)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: 'Failed to write prompt log' }))
          }
        })
      },
    },
  ],
})
