import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.potteryItem.deleteMany();

  // Create default items
  const items = await prisma.potteryItem.createMany({
    data: [
      {
        name: "Handmade Ceramic Mug",
        price: 45,
        image: "/images/mug.jpg",
        description: "Beautiful hand-thrown ceramic mug with glaze finish",
        category: "mugs",
        inStock: true,
      },
      {
        name: "Artisan Bowl Set",
        price: 120,
        image: "/images/bowl-set.jpg",
        description: "Set of 3 nesting bowls with natural finish",
        category: "bowls",
        inStock: true,
      },
      {
        name: "Decorative Vase",
        price: 85,
        image: "/images/vase.jpg",
        description: "Tall decorative vase with intricate patterns",
        category: "vases",
        inStock: false,
      },
      {
        name: "Clay Dinner Plate",
        price: 35,
        image: "/images/plate.jpg",
        description: "Earthenware dinner plate with rustic finish",
        category: "plates",
        inStock: true,
      },
    ],
  });

  console.log(`Seeded ${items.count} pottery items`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });