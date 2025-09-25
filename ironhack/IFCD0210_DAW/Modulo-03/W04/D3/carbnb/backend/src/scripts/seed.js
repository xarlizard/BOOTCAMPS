import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const carData = [
  {
    title: "BMW X5 2023",
    description:
      "SUV de lujo con todas las comodidades. Perfecto para familias.",
    tags: ["suv", "luxury", "bmw", "family", "automatic"],
  },
  {
    title: "Tesla Model 3",
    description: "Sedán eléctrico con tecnología avanzada y gran autonomía.",
    tags: ["electric", "sedan", "tesla", "eco-friendly", "automatic"],
  },
  {
    title: "Audi A4 Avant",
    description: "Station wagon elegante con gran capacidad de carga.",
    tags: ["wagon", "audi", "luxury", "spacious", "automatic"],
  },
  {
    title: "Mercedes-Benz C-Class",
    description: "Sedán ejecutivo con acabados premium y gran confort.",
    tags: ["sedan", "mercedes", "luxury", "executive", "automatic"],
  },
  {
    title: "Volkswagen Golf GTI",
    description:
      "Hatchback deportivo con excelente relación precio-rendimiento.",
    tags: ["hatchback", "volkswagen", "sport", "manual", "compact"],
  },
  {
    title: "Ford Mustang GT",
    description: "Muscle car americano con motor V8 y diseño icónico.",
    tags: ["coupe", "ford", "sport", "muscle", "manual", "v8"],
  },
  {
    title: "Toyota Prius",
    description: "Híbrido eficiente ideal para ciudad y carretera.",
    tags: ["hybrid", "toyota", "eco-friendly", "efficient", "automatic"],
  },
  {
    title: "Jeep Wrangler",
    description: "SUV todo terreno para aventuras off-road.",
    tags: ["suv", "jeep", "offroad", "adventure", "manual", "4x4"],
  },
  {
    title: "Porsche 911 Carrera",
    description: "Deportivo de alta gama con rendimiento excepcional.",
    tags: ["coupe", "porsche", "luxury", "sport", "manual", "performance"],
  },
  {
    title: "Honda Civic Type R",
    description: "Hot hatch japonés con motor turbo y suspensión deportiva.",
    tags: ["hatchback", "honda", "sport", "turbo", "manual", "performance"],
  },
  {
    title: "Range Rover Evoque",
    description: "SUV compacto de lujo con diseño moderno.",
    tags: ["suv", "range-rover", "luxury", "compact", "automatic"],
  },
  {
    title: "Mini Cooper S",
    description: "City car divertido de conducir con estilo británico.",
    tags: ["hatchback", "mini", "city", "fun", "manual", "compact"],
  },
  {
    title: "Alfa Romeo Giulia",
    description: "Sedán deportivo italiano con alma racing.",
    tags: ["sedan", "alfa-romeo", "sport", "italian", "automatic"],
  },
  {
    title: "Volvo XC90",
    description: "SUV de 7 plazas con los más altos estándares de seguridad.",
    tags: ["suv", "volvo", "family", "safety", "7-seater", "automatic"],
  },
  {
    title: "Nissan Leaf",
    description: "Compacto eléctrico perfecto para uso urbano diario.",
    tags: [
      "electric",
      "nissan",
      "compact",
      "eco-friendly",
      "city",
      "automatic",
    ],
  },
  {
    title: "Subaru Outback",
    description:
      "Station wagon con tracción integral ideal para cualquier terreno.",
    tags: ["wagon", "subaru", "awd", "adventure", "family", "automatic"],
  },
  {
    title: "Mazda MX-5 Miata",
    description:
      "Roadster ligero y divertido para los amantes de la conducción.",
    tags: ["roadster", "mazda", "sport", "convertible", "manual", "fun"],
  },
  {
    title: "Hyundai Tucson",
    description:
      "SUV familiar con garantía extendida y buena relación calidad-precio.",
    tags: ["suv", "hyundai", "family", "value", "automatic", "warranty"],
  },
  {
    title: "Lexus ES",
    description: "Sedán de lujo japonés con alta fiabilidad y confort.",
    tags: ["sedan", "lexus", "luxury", "reliable", "automatic", "comfort"],
  },
  {
    title: "Chevrolet Camaro SS",
    description: "Muscle car americano con motor V8 y sonido espectacular.",
    tags: ["coupe", "chevrolet", "muscle", "v8", "automatic", "american"],
  },
];

async function main() {
  console.log("🌱 Starting database seeding...");

  try {
    // Clear existing data
    await prisma.item.deleteMany();
    console.log("🧹 Cleared existing items");

    // Insert seed data
    for (const car of carData) {
      await prisma.item.create({
        data: {
          title: car.title,
          description: car.description,
          tags: JSON.stringify(car.tags),
        },
      });
    }

    console.log(`✅ Successfully seeded ${carData.length} items`);
    console.log("🏁 Database seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
