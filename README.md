# Users Dashboard

A responsive user directory. The list is loaded from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users). Search, filter, and sort run in the browser. Users you add or remove are kept in this browser and survive a refresh.

## Features

- User list with name, email, and company
- Search by name or email
- Sort by name, email, or company
- Filter by company and by source (API or added locally)
- Add a user with form validation (stored locally, not sent to the API)
- Delete a user locally, including users that originally came from the API
- User details with name, username, email, phone, address, and company
- Loading, error, and empty states
- Light and dark theme, remembered after refresh
- Layout that works on mobile and desktop

## Scripts

```bash
pnpm install
pnpm dev
```

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the Vite dev server |
| `pnpm build` | Typecheck and build for production |
| `pnpm preview` | Serve the production build |
| `pnpm lint` | Run Oxlint |

Open the app at `http://localhost:5173`. `/` redirects to `/users`.

## How data works

The directory API does not support server-side search, filter, or sort, so those run on the fetched list.

| Action | Where it goes |
| --- | --- |
| Load the list | `GET /users` |
| Open an API user | `GET /users/:id` |
| Add a user | `localStorage` only |
| Delete a user | `localStorage` only (the API is not called) |
| Theme | `localStorage` |

A user created here has no username, phone, or address. Those fields show as an em dash on the details page. Removing an API user hides that person after refresh; it does not delete them on the server.

## Project structure

```text
src/
  components/     Shared UI (button, modal, table states, form fields)
  constants/      API paths, routes, storage keys
  handler/        Client-side search, filter, and sort
  helpers/query/  TanStack Query client and query keys
  helpers/storage.ts
  Layout/         App shell
  loader/         Route loader for user details
  pages/Users/    List, details, and their components
  router/         Routes
  services/       Axios client and user API
  theme/          Light / dark theme
```

Path alias `@/` points at `src/`.
