/**
 * Build-request submission via Netlify Forms (no API keys in the code).
 *
 * The form named FORM_NAME is declared statically in index.html so Netlify
 * detects it at deploy time; the React form posts the same fields to "/"
 * as application/x-www-form-urlencoded. Spam: Netlify's own filtering plus
 * the `bot-field` honeypot. Recipients and notification emails are set in
 * the Netlify dashboard (Forms › build-request › Notifications); nothing is
 * hard-coded here.
 *
 * Locally (Vite dev) there is no Netlify Forms handler, so submissions fail
 * gracefully with the form's error state; use `netlify dev` or a deploy
 * preview to send real submissions.
 */

export const FORM_NAME = 'build-request'

export type BuildRequest = {
  make: string
  model: string
  year: string
  service: string
  details: string
  name: string
  email: string
  phone: string
  contact: 'Email' | 'Phone call' | 'Text message'
  /** Honeypot: real people never see or fill it */
  'bot-field': string
}

export async function submitBuildRequest(data: BuildRequest, signal?: AbortSignal) {
  const body = new URLSearchParams({ 'form-name': FORM_NAME, ...data })
  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    signal,
  })
  if (!res.ok) throw new Error(`Submission failed (${res.status})`)
}
