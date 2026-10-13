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

/**
 * Absolute site URL for canonical / Open Graph / Twitter tags (social
 * crawlers need absolute image URLs). SITE_URL wins; on Netlify builds the
 * platform's URL (primary domain) is used; local dev falls back to localhost.
 */
function siteUrl(): Plugin {
  const url = (process.env.SITE_URL || process.env.URL || (process.env.NODE_ENV === 'production' ? 'https://mansorcustom.netlify.app' : 'http://localhost:5180')).replace(/\/+$/, '')
  return { name: 'site-url', transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', url) }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), instagramReelsStub(), siteUrl()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: { port: 5180, strictPort: true },
  preview: { port: 4180, strictPort: true },
})
