/**
 * seed.ts
 * Populates the DB with sample customers, transactions, policies, and KB docs.
 */

import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding sample data...');

  const c1 = await prisma.customer.upsert({
    where: { id: '1' },
    update: {},
    create: { id: '1', name: 'Alice Example', email: 'alice@example.com' },
  });

  const merchants = ['Amazon', 'Uber', 'Flipkart', 'Swiggy', 'Paytm'];
  for (let i = 0; i < 10; i++) {
    await prisma.transaction.create({
      data: {
        id: randomUUID(),
        customer_id: c1.id,
        amount: 100 + i * 10,
        merchant: merchants[i % merchants.length],
        category: 'shopping',
        occurred_at: new Date(Date.now() - i * 3600_000),
      },
    });
  }

  await prisma.kbDoc.create({
    data: {
      id: 'kb-123',
      title: 'Duplicate charge resolution',
      body: 'If customer sees two identical transactions, open dispute and refund one.',
    },
  });

  await prisma.policy.createMany({
    data: [
      { key: 'blocked_mccs', value: '9999,8888' },
      { key: 'otp_merchants', value: 'Amazon,Uber' },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
