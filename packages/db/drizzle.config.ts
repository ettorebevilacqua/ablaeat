import type { Config } from "drizzle-kit";

if (!process.env.POSTGRES_URL) {
  // throw new Error("Missing POSTGRES_URL");
}

// const nonPoolingUrl = process.env.POSTGRES_URL.replace(":6543", ":5432");
const nonPoolingUrl1 = 'postgresql://postgres.ogplmnflybociuwhdqho:e32VAhEZxZAUPnvH@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?workaround=supabase-pooler.vercel';
const nonPoolingUrl = nonPoolingUrl1.replace(":6543", ":5432");
export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: nonPoolingUrl },
} satisfies Config;
