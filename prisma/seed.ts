/**
 * Prisma seed script — creates the initial admin user.
 * Run with: npx prisma db seed
 *
 * Reads credentials from environment variables so they are never
 * hard-coded in source control.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, password: hash, name: "Chi Nguyen" },
  });

  console.log(`Admin user ready: ${user.email}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
