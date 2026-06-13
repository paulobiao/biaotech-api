# BiaoTech Frontend

React + TypeScript + Vite frontend for the BiaoTech API.

## Tech Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS + shadcn/ui
- Axios (with automatic access/refresh token renewal)

## Running Locally

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The dev server proxies API calls to `http://localhost:3000/api` by default (set in `.env`).

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the API (e.g. `http://localhost:3000/api`) |

**Production:** the `VITE_API_URL` is injected at build time by the CI pipeline (`VITE_API_URL=https://api.biaotech.dev/api npm run build`). No `.env` file is committed or deployed — the build artifact already contains the baked-in URL.

Never commit a `.env` file with a production URL. The `.env` file is in `.gitignore`; use `.env.example` as the template.

## Auth Flow

Authentication uses short-lived access tokens (JWT, 1 h) + long-lived refresh tokens (7 d). The Axios instance in `src/lib/api.ts` automatically:

1. Attaches the access token to every request.
2. On a 401 response (except `/auth/login` and `/auth/refresh`), silently calls `POST /auth/refresh` with the stored refresh token.
3. If successful, saves the new access token, retries the original request once, and resumes normal operation — the user never sees a login screen.
4. If the refresh also fails (expired or revoked), clears tokens and redirects to `/login`.

Simultaneous 401s are deduplicated: only one refresh request fires; all pending requests wait for it.

### Security Note — localStorage vs httpOnly cookies

Access and refresh tokens are currently stored in `localStorage`. This is simple and works well for SPAs, but exposes tokens to any JavaScript running on the page (XSS risk).

The planned evolution is to store the **refresh token in an httpOnly + SameSite=Strict cookie**, issued by the server. This makes it invisible to JS and significantly reduces the XSS attack surface. The access token can remain in memory (React state) and be re-fetched on page load via the cookie-based refresh. This change requires coordinated backend + frontend work and is tracked in the roadmap.
