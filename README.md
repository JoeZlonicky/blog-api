# Blog API

An Express.js blog API.

## Running

1. Create a `.env` file that follows the `.env.example` template. Expected to connect to a PostgreSQL database with a `DATABASE_URL` like `postgresql://name:password@host:port/dbname?schema=public`.

2. Install packages with `pnpm install`.

3. Set up database with `pnpm prisma migrate dev`.

4. Run with `pnpm start`
