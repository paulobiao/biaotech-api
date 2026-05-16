import type { Pool } from "pg";

export const pool: Pool;

export const testConnection: () => Promise<void>;