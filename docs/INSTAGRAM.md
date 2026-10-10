# Instagram Reels: connecting @mansor.customs

The homepage shows the latest three Reels from @mansor.customs. It uses
Meta's official **Instagram API with Instagram Login**, read-only. When a
new Reel is published, the site picks it up within about an hour. No
redeploy or manual upload is needed.

## How it works

| Piece | What it does |
| --- | --- |
| `netlify/functions/instagram-auth.mts` | A one-time connect flow, using Instagram's own login and consent screen. It requests one permission, `instagram_business_basic`, which is read-only. It accepts only the @mansor.customs account and stores the 60-day token in Netlify Blobs, server-side. |
| `netlify/functions/instagram-sync.mts` | Runs **every hour**. It fetches the latest Reels and stores them. Once the token is a week old, it renews it, so the connection never lapses. |
| `netlify/functions/instagram-reels.mts` | `GET /api/instagram-reels`, called by the page. It serves the last sync from Blobs, so visitors never trigger a call to Meta. The CDN caches it for 5 minutes. If the stored result is stale, it syncs on demand. |
| `src/components/ui/ReelCard.tsx` | Our own 9:16 inline player. It shows the thumbnail first and loads the video lazily. Video is muted, plays inline on loop, and pauses off screen. It has a play/pause button and a "View Reel" link. |

**Failure handling**
- **Licensed music or copyright:** Meta withholds the video file. The Reel still shows, with its thumbnail and "View Reel". It has no play button.
- **Expired video URL:** the card keeps the thumbnail and the link.
- **Meta API down:** the site serves the last good result for up to 6 hours.
- **Expired or revoked token, or nothing connected:** the three cards link to the Reels tab on Instagram.

The page never shows stand-in content.

Tokens, the app secret and the connect key never reach the browser or git.

## One-time setup

### 1. Instagram account (Mansor)
@mansor.customs must be an Instagram **professional account**: Business or
Creator. To check or switch, go to Instagram → Settings → Account type and tools.

### 2. Meta app (Mansor's Meta developer account, or ours with Mansor's account added)
1. Go to <https://developers.facebook.com/apps> and create an app. Choose the
   Instagram use case: manage messaging and content on Instagram. Choose the
   **Instagram API with Instagram Login** setup, not Facebook Login.
2. In the app's Instagram **API setup with Instagram business login**, copy
   the **Instagram app ID** and the **Instagram app secret**. These are not
   the Facebook App ID and secret.
3. Under **Business login settings**, add this OAuth redirect URI, exactly
   as written:
   `https://<live-domain>/api/instagram-auth/callback`
4. Permission: `instagram_business_basic` only.
5. App Review: Meta's docs say it is **not required** when the app only
   serves a business you own or manage (Standard Access).
6. If the login screen refuses the account, the app is probably still in
   development mode and the account has no role on it. Add @mansor.customs
   to the app's roles as an Instagram tester, then accept the invite in
   Instagram. Dashboard wording changes often; follow what the dashboard
   shows.

### 3. Netlify environment variables
Go to Site configuration → Environment variables. Mark the secrets as
**secret**.

| Variable | Value |
| --- | --- |
| `INSTAGRAM_APP_ID` | Instagram app ID (step 2.2) |
| `INSTAGRAM_APP_SECRET` | Instagram app secret (step 2.2). **Secret.** |
| `INSTAGRAM_CONNECT_KEY` | Any long random string, for example from `openssl rand -hex 32`. **Secret.** |
| `INSTAGRAM_USERNAME` | Optional. Defaults to `mansor.customs`. |
| `INSTAGRAM_REDIRECT_URI` | Optional. Defaults to `$URL/api/instagram-auth/callback`. Set it only if the redirect URI in the app uses a different domain. |

Redeploy after setting them.

### 4. Connect (about 1 minute, with Mansor present)
1. Open `https://<live-domain>/api/instagram-auth/start?key=<INSTAGRAM_CONNECT_KEY>`.
2. Log in as **@mansor.customs** and approve.
3. The page should say "@mansor.customs is connected. 3 Reels synced."
   The section goes live right away.

Any other account is rejected, and its token is not stored.

### 5. Check health at any time
`https://<live-domain>/api/instagram-auth/status?key=<INSTAGRAM_CONNECT_KEY>`
returns JSON: connected account, token expiry, last sync, last error. It
never includes the token.

Netlify → Logs → Functions shows each hourly `instagram-sync` run.

## If it ever disconnects
This happens when Mansor changes their password, removes the app in
Instagram's settings, or the token isn't renewed for 60 days. The status
endpoint then shows `errorKind: "auth"` and the cards fall back to the
Reels-tab link. To fix it, repeat **step 4**.

## Local development
`npm run dev` stubs `/api/instagram-reels` as "not connected". To run the
real functions, use the Netlify CLI (`netlify dev`) with the variables
above.
