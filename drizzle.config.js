import { defineConfig } from "drizzle-kit";
// if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL not found in environment');
export default defineConfig({
  dialect: "postgresql",
  out: "./drizzle",
  schema: './utils/schema.jsx',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL,
  }
});