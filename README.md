# Blog API

A blog REST API made using TypeScript, Express, and Prisma. Implements JWT sessions.

You can also check out the corresponding [user-facing website](https://github.com/JoeZlonicky/blog-website) and [admin dashboard](https://github.com/JoeZlonicky/blog-admin) projects made using Vue.

## Running

1. Create a `.env` file that follows the `.env.example` template. Expected to connect to a PostgreSQL database with a `DATABASE_URL` like `postgresql://name:password@host:port/dbname?schema=public`.

2. Install packages with `pnpm install`.

3. Set up database with `pnpm prisma migrate dev`.

4. Run with `pnpm start`
