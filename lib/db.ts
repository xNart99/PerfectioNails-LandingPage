import { PrismaClient } from "@prisma/client";

/**
 * Creates a single PrismaClient instance shared across the app.
 * In development, attaches it to `global` to prevent hot-reload from
 * opening multiple connections.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
