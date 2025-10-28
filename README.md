# Mi Ticket (Mi_Ticket_Vue)

Mi Ticket is a small single-page ticketing/demo application built with Vue 3 and Vite. It demonstrates a minimal auth flow (client-side), protected routes, CRUD operations for tickets (stored in localStorage), and a simple layout with pages for landing, login/signup, and a dashboard.

This README explains how to run the project locally, how the app works, where important files live, and common troubleshooting steps.

## Tech stack
- Vue 3 (Composition API)
- Vite
- vue-router (v4)
- Pinia (installed but app uses a simple composable-style auth module)
- Plain CSS for styling (variables in `src/assets/main.css`)

## Prerequisites
- Node.js (recommended 18+ but package.json expects Node 20+ based on engines)
- A package manager: npm (default), yarn or pnpm

On Windows PowerShell you may need to run npm via `npm.cmd` if script execution policy blocks `npm` (see Troubleshooting below).

## Install
From the repository root run:

```powershell
npm install
```

Or, if you prefer `yarn`:

```powershell
yarn
```

## Run in development

```powershell
npm run dev
```

Vite will start and print a local URL (usually `http://localhost:5173` or a nearby port). Open that in the browser.

## Build & Preview

Build for production:

```powershell
npm run build
```

Preview the built app locally:

```powershell
npm run preview
```

## How to use the app (user flow)

- Landing page: marketing copy and links to Login / Signup and a Dashboard link. The Dashboard link points to `/dashboard` and is protected by the router guard.
- Signup: creates a new user stored in localStorage (simple client-side signup). After signup, the app navigates to the dashboard.
- Login: logs a user in (also client-side). The demo sets a session token and an expiry timestamp (1 hour). After login the user is redirected to `/dashboard`.
- Dashboard: protected page. If you try to visit `/dashboard` while logged out, the router guard redirects you to `/auth/login`.
- Tickets: create/update/delete tickets from the dashboard. Tickets are stored in localStorage (`tickets` key).

Notes:
- This app stores auth and tickets in the browser (localStorage) for demo purposes only. Do not use this approach for real production authentication.
- Session expiry: the demo sets a one-hour expiry; when expired, the session is cleared and the user is logged out automatically.

## Important files & structure

Top-level:

- `index.html` — app entry HTML with `<div id="app"></div>`
- `src/main.js` — app bootstrap, creates the Vue app, registers Pinia and the router
- `src/App.vue` — root component (should contain `<router-view />` so routes render)
- `src/router/index.js` — routes and navigation guard (protects `/dashboard`)
- `src/Stores/AuthStore.js` — simple auth composable used across pages (login, logout, user ref, token)
- `src/pages/` — page components: `LandingPage.vue`, `LoginPage.vue`, `SignupPage.vue`, `Dashboard.vue`, `TicketList.vue`
- `src/layout/` — layout components (MainLayout, AuthLayout, DashboardLayout)
- `src/components/` — shared components (TicketForm, TicketCard, Toast, Footer, etc.)
- `src/utils/` — `TicketServices.js` (CRUD helpers using localStorage), `TicketValidators.js`
- `src/assets/main.css` — global CSS and CSS variables used by components

## Router & Auth behavior

- The router defines a `meta: { requiresAuth: true }` on the `/dashboard` route and its children.
- A global `beforeEach` guard checks `useAuth().isAuthenticated.value`. If unauthenticated, it redirects to the login page and includes a `redirect` query so you can return after login.

## Developer notes / common edits

- Default app page visible instead of your app: make sure `src/App.vue` renders `<router-view/>` — otherwise you will see the Vite starter page.
- Invisible submit button: component styles rely on CSS variables (e.g. `--accent`) defined in `src/assets/main.css`. If the file is empty, buttons may appear transparent. Update that file to change theme colors.
- Footer template errors: Vue templates use `{{ }}` for interpolation. For example, use `{{ new Date().getFullYear() }}` instead of `{ new Date().getFullYear() }`.
- PowerShell npm issue: If PowerShell blocks `npm` scripts with an execution policy error, either run `npm.cmd run dev` or change the policy (careful with system settings). Running commands in CMD instead of PowerShell also avoids this.

## Troubleshooting

- 500 / Vite overlay errors: open the browser console and the terminal running Vite — the overlay usually shows the failing module and stack trace. Copy the stack trace to debug.
- Cannot access `/dashboard` when logged out: the router guard should redirect to `/auth/login`. If it doesn't, check `src/router/index.js` to ensure it reads `isAuthenticated.value` from the auth composable or store.
- Login shows "User" as a name: templates automatically unwrap refs, but script code must use `.value` to read ref contents. Ensure places that read `auth.user` in scripts use `auth.user.value`.
- LocalStorage lingering session: to test auth flows, clear these keys in DevTools → Application → Local Storage: `ticketapp_session`, `auth_user`, `ticketapp_expiry`.

## Next improvements (ideas)

- Replace the simple composable auth with a Pinia store for consistent state management.
- Add real backend API calls (replace localStorage) and secure token handling.
- Add unit tests for validators and components.
- Improve styling and a11y details.

## Contributing

Feel free to open issues or pull requests. For small changes, update files and include a short description of the fix.

## License

This demo is provided as-is for learning and prototyping. Add a license if you intend to publish or reuse it under a specific license.

