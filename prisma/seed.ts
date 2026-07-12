import { PrismaPg } from "@prisma/adapter-pg";
import config from "../prisma.config";
import { PrismaClient, type Ticket } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: config.datasource?.url,
});

const prisma = new PrismaClient({ adapter });

const tickets: Partial<Ticket>[] = [
  {
    title: "Ticket 1",
    content: "This is the first ticket from the database",
    status: "OPEN",
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket from the database",
    status: "DONE",
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399,
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket from the database",
    status: "IN_PROGRESS",
    deadline: new Date().toISOString().split("T")[0],
    bounty: 599,
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("seeding tickets...");
  await prisma.ticket.deleteMany();
  await prisma.ticket.createMany({
    data: tickets as Ticket[], // can't be partial any more
  });
  const t1 = performance.now();
  console.log(`tickets seeded in ${t1 - t0} milliseconds`);
};

seed()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
