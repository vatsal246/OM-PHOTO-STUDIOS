import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database for Om Photo Studio...");

  // 1. Business Settings
  await prisma.businessSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      businessName: "Om Photo Studio",
      ownerName: "Dharmesh Pithwa",
      whatsappNumber: "", // Configured in admin settings by Dharmesh
      phoneNumber: "",
      emailAddress: "",
      googleReviewUrl: "", // Dharmesh to add actual Google review URL
      pricesJson: JSON.stringify({
        passport: "₹100 for 8 prints",
        visa: "₹150 for 4 prints + digital copy",
        portrait: "Starting from ₹350",
        family: "Starting from ₹600",
        print4x6: "₹20 per print",
        printA4: "₹100 per print",
        digitalCopy: "Available on request / ₹50",
      }),
      holidayNotices: "",
      openingHoursJson: JSON.stringify({
        weekday: "10:00 AM – 9:00 PM (Monday–Saturday)",
        sunday: "10:30 AM – 5:00 PM (Sunday)",
      }),
    },
  });

  // Calculate dates in YYYY-MM-DD
  const today = new Date();
  const formatYMD = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const todayStr = formatYMD(today);
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const tomorrowStr = formatYMD(tomorrow);
  const dayAfterTomorrow = new Date(today.getTime() + 48 * 60 * 60 * 1000);
  const dayAfterStr = formatYMD(dayAfterTomorrow);

  // Clear existing demo bookings and items to keep seed idempotent
  await prisma.booking.deleteMany({});
  await prisma.printOrder.deleteMany({});
  await prisma.enquiry.deleteMany({});
  await prisma.galleryItem.deleteMany({});

  // 2. Realistic Seed Bookings
  await prisma.booking.createMany({
    data: [
      {
        reference: "OPS-2026-1001",
        customerName: "Rahul Sharma",
        mobile: "9820012345",
        email: "rahul.sharma@example.com",
        service: "USA Visa Photos",
        countryOrType: "USA (2x2 inch)",
        appointmentDate: todayStr,
        timeSlot: "11:30 AM",
        numberOfPeople: 2,
        notes: "Need digital copy for DS-160 online application and 2 physical prints.",
        status: "CONFIRMED",
      },
      {
        reference: "OPS-2026-1002",
        customerName: "Priya Mehta",
        mobile: "9819954321",
        email: "priya.m@example.com",
        service: "Schengen Visa Photos",
        countryOrType: "Schengen (35x45 mm)",
        appointmentDate: tomorrowStr,
        timeSlot: "2:00 PM",
        numberOfPeople: 1,
        notes: "Light grey background required for German Embassy appointment.",
        status: "PENDING",
      },
      {
        reference: "OPS-2026-1003",
        customerName: "Amitabh Kulkarni",
        mobile: "9769011223",
        email: "amitabh.k@example.com",
        service: "India Passport Photos",
        countryOrType: "India (3.5x4.5 cm)",
        appointmentDate: tomorrowStr,
        timeSlot: "3:30 PM",
        numberOfPeople: 3,
        notes: "Passport renewal for parents and self.",
        status: "CONFIRMED",
      },
      {
        reference: "OPS-2026-1004",
        customerName: "Sneha Patel",
        mobile: "9920199887",
        email: "sneha.patel@example.com",
        service: "Canada Visa Photos",
        countryOrType: "Canada (50x70 mm)",
        appointmentDate: dayAfterStr,
        timeSlot: "12:00 PM",
        numberOfPeople: 1,
        notes: "Need studio stamp and date on back of photo.",
        status: "PENDING",
      },
      {
        reference: "OPS-2026-1005",
        customerName: "Kunal Shah",
        mobile: "9892012399",
        email: "kunal.shah@example.com",
        service: "Studio Portrait",
        countryOrType: "General Studio Session",
        appointmentDate: dayAfterStr,
        timeSlot: "05:00 PM",
        numberOfPeople: 1,
        notes: "Professional LinkedIn headshot.",
        status: "COMPLETED",
      },
    ],
  });

  // 3. Demo Print Orders
  await prisma.printOrder.createMany({
    data: [
      {
        reference: "PRN-2026-2001",
        customerName: "Sunita Joshi",
        mobile: "9867012345",
        printSize: "4x6 inch",
        quantity: 12,
        finish: "Glossy",
        pickupPreference: "Same Day Evening",
        notes: "Family vacation pictures. Please check color brightness.",
        filePaths: JSON.stringify(["/uploads/prints/sample-print-1.jpg"]),
        fileNames: JSON.stringify(["vacation-family.jpg"]),
        status: "READY_FOR_PICKUP",
      },
      {
        reference: "PRN-2026-2002",
        customerName: "Vikram Rane",
        mobile: "9821109876",
        printSize: "A4 (8.3x11.7 inch)",
        quantity: 2,
        finish: "Matte",
        pickupPreference: "Next Day Morning",
        notes: "Framing portrait prints. High resolution photo.",
        filePaths: JSON.stringify(["/uploads/prints/sample-print-2.jpg"]),
        fileNames: JSON.stringify(["portrait-award.jpg"]),
        status: "PROCESSING",
      },
    ],
  });

  // 4. Demo Enquiries
  await prisma.enquiry.createMany({
    data: [
      {
        name: "Deepak Merchant",
        mobile: "9820499112",
        email: "deepak.merchant@example.com",
        service: "Visa Photographs",
        message: "Hello Dharmesh ji, do you take baby visa photos (4 month infant) for US passport? Do we need to book in advance?",
        status: "NEW",
      },
      {
        name: "Anjali Gokhale",
        mobile: "9769334455",
        email: "anjali.g@example.com",
        service: "General Photography",
        message: "Inquiring about small family portrait session in your studio next Sunday. What are the timings?",
        status: "CONTACTED",
      },
    ],
  });

  // 5. Sample Gallery Items (Representational samples with clear labels)
  await prisma.galleryItem.createMany({
    data: [
      {
        title: "Passport Photo Setup",
        category: "passport",
        description: "Even shadowless dual softbox lighting and neutral white backdrop calibrated for Indian and international biometric passports.",
        imageUrl: "/gallery/passport-setup.svg",
        isSample: true,
        displayOrder: 1,
      },
      {
        title: "Visa Photography Alignment",
        category: "visa",
        description: "Precise facial proportion measuring tool ensuring compliance with US (2x2\"), Schengen (35x45mm), and Canada (50x70mm) specs.",
        imageUrl: "/gallery/visa-setup.svg",
        isSample: true,
        displayOrder: 2,
      },
      {
        title: "Professional Studio Portrait",
        category: "portrait",
        description: "Crisp personal branding and corporate headshots with subtle depth-of-field and flattering studio lighting.",
        imageUrl: "/gallery/portrait-setup.svg",
        isSample: true,
        displayOrder: 3,
      },
      {
        title: "Family Photography Session",
        category: "family",
        description: "Comfortable studio atmosphere for multi-generation family pictures, kids, and celebratory milestone portraits.",
        imageUrl: "/gallery/family-setup.svg",
        isSample: true,
        displayOrder: 4,
      },
      {
        title: "High-Definition Photo Printing",
        category: "prints",
        description: "Premium Fuji/Kodak archival photo paper in glossy and luster/matte finishes from 4x6 up to A4 sizes.",
        imageUrl: "/gallery/prints-setup.svg",
        isSample: true,
        displayOrder: 5,
      },
      {
        title: "Digital Delivery & Web Optimization",
        category: "digital",
        description: "Instant high-resolution digital copies delivered via WhatsApp or email, formatted for online DS-160 and portal submissions.",
        imageUrl: "/gallery/digital-setup.svg",
        isSample: true,
        displayOrder: 6,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
