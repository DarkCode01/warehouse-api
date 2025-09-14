import { PrismaClient } from 'generated/prisma';
import { WarehouseSeeder } from './seeders/warehouse-seeder';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  try {
    // Limpiar datos existentes (opcional)
    console.log('🧹 Limpiando base de datos...');
    await prisma.binActivity.deleteMany({});
    await prisma.bin.deleteMany({});
    await prisma.rack.deleteMany({});
    await prisma.aisle.deleteMany({});
    await prisma.warehouse.deleteMany({});
    console.log('✅ Base de datos limpiada');

    // Ejecutar seeder
    const seeder = new WarehouseSeeder(prisma);
    await seeder.seed();

    console.log('🎉 Seed completado exitosamente!');
  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    throw error;
  }
}

main()
  .catch((error) => {
    console.error('❌ Error durante el seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
