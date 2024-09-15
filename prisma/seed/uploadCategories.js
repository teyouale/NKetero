const fs = require('fs');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function uploadCategories() {
  try {
    const categories = new Map();

    // Read and insert categories
    await new Promise((resolve, reject) => {
      fs.createReadStream('prisma/seed/categories.csv')
        .pipe(csv())
        .on('data', async (row) => {
          const category = await prisma.category.create({
            data: {
              name: row.name,
              description: row.description,
            },
          });
          categories.set(category.name, category.id);
        })
        .on('end', () => {
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    return categories; // Return the categories map if needed later
  } catch (error) {
    console.error('Error uploading categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Call this function to upload categories
uploadCategories();
