# Synapsis Technical Test

## Setup

Clone isi file .env.example dan repopulate token gorest:

```bash
# npm
NUXT_APP_GOREST_API="https://gorest.co.in/public/v2/"
NUXT_APP_GOREST_TOKEN=""
```

Install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start development server di `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Build local preview production:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
