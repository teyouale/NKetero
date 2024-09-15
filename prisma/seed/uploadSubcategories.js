const fs = require('fs');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function normalize(str) {
  return str.trim().toLowerCase();
}

async function uploadSubcategories() {
  try {
    const categories = new Map();

    // Fetch all categories from the database to map them by name
    const allCategories = await prisma.category.findMany();
    allCategories.forEach((category) => {
      categories.set(normalize(category.name), category.id);
    });

    // Read and insert subcategories
    await new Promise((resolve, reject) => {
      fs.createReadStream('prisma/seed/subcategories.csv')
        .pipe(csv())
        .on('data', async (row) => {
          const categoryId = categories.get(normalize(row.categoryName));

          if (categoryId) {
            await prisma.subcategory.create({
              data: {
                name: row.name,
                description: row.description,
                categoryId: categoryId,
              },
            });
          } else {
            console.error(
              `Category not found for subcategory: ${row.name}, Category: ${row.categoryName}`
            );
          }
        })
        .on('end', () => {
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  } catch (error) {
    console.error('Error uploading subcategories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Call this function to upload subcategories
uploadSubcategories();
