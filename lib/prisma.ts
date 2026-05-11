import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// ၁။ pg Pool ကို အရင်ဆောက်ပါ
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// ၂။ အဲ့ဒီ Pool ကို adapter ထဲ ထည့်ပေးပါ
const adapter = new PrismaPg(pool);

// ၃။ Prisma Client ကို adapter နဲ့ အတူ ပတ်ပေးပါ
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default prisma;
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };