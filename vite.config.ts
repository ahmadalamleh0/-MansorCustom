import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Local stand-in for the Netlify function /api/instagram-reels: answers as
 * the function does with no token configured. Run `netlify dev` instead to
 * exercise the real function (with INSTAGRAM_ACCESS_TOKEN in the Netlify env).
 */
function instagramReelsStub(): Plugin {
  const handler = (_req: unknown, res: { setHeader(k: string, v: string): void; end(b: string): void }) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ status: 'not_configured', reels: [] }))
  }
  return {
    name: 'instagram-reels-stub',
    configureServer: (server) => void server.middlewares.use('/api/instagram-reels', handler),
    configurePreviewServer: (server) => void server.middlewares.use('/api/instagram-reels', handler),
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), instagramReelsStub()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: { port: 5180, strictPort: true },
  preview: { port: 4180, strictPort: true },
})
