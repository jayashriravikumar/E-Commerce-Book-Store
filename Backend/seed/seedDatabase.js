import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import mongoose from "mongoose";

import { connectDB } from "../config/db.js";
import Product from "../models/productModel.js";

import User from "../models/userModel.js";
import Order from "../models/orderModel.js";


import {
  getProductName,
  getProductImage,
  getProductPrice,
  getProductStock,
  getProductId,
} from "../helper/productHelper.js";

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    connectDB();

    // Wait for the connection to establish
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Fetch all products
    const products = await Product.find();
    const users = await User.find({
  email: {
    $in: [
      "john@example.com",
      "alice@example.com",
      "david@example.com",
      "emma@example.com",
      "michael@example.com",
    ],
  },
});

console.log(`👤 Users Found: ${users.length}`);
console.log(`📚 Products Found: ${products.length}`);

// Prevent duplicate orders if the seeder is run again
const existingOrders = await Order.countDocuments();

if (existingOrders > 0) {
  console.log(`⚠️ ${existingOrders} orders already exist. Skipping order seeding.`);
} else {
  const orderStatuses = [
    "Processing",
    "Shipped",
    "Delivered",
  ];

  for (let i = 0; i < 10; i++) {
    const orderDates = [
  0,   // Today
  2,   // 2 days ago
  5,   // 5 days ago
  8,   // 8 days ago
  12,  // 12 days ago
  18,  // 18 days ago
  25,  // 25 days ago
  32,  // 32 days ago
  45,  // 45 days ago
  60,  // 60 days ago
];
    // Random customer
    const user = users[Math.floor(Math.random() * users.length)];

    // Random product
    const product = products[Math.floor(Math.random() * products.length)];

    const quantity = Math.floor(Math.random() * 3) + 1;

    const itemPrice = product.price * quantity;
    const taxPrice = Math.round(itemPrice * 0.05);
    const shippingPrice = 50;
    const totalPrice = itemPrice + taxPrice + shippingPrice;

    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - orderDates[i]);

    await Order.create({
      user: user._id,

      orderItems: [
        {
          name: getProductName(product.toObject()),
          price: product.price,
          quantity,
          image: getProductImage(product.toObject()),
          product: product._id,
        },
      ],

      shippingAddress: {
        address: "123 Dummy Street",
        city: "Coimbatore",
        state: "Tamil Nadu",
        country: "India",
        pinCode: "641001",
        phoneNo: "9876543210",
      },

      paymentInfo: {
        id: `PAY${Date.now()}${i}`,
        status: "Paid",
      },

      paidAt: randomDate,

      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,

      orderStatus:
        orderStatuses[
          Math.floor(Math.random() * orderStatuses.length)
        ],
    createdAt: randomDate,
    });

    console.log(
      `📦 Order ${i + 1} created for ${user.name}`
    );
  }

  console.log("\n🎉 10 Dummy Orders Created Successfully!");
}

    const dummyUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
  },
  {
    name: "Alice Smith",
    email: "alice@example.com",
  },
  {
    name: "David Wilson",
    email: "david@example.com",
  },
  {
    name: "Emma Johnson",
    email: "emma@example.com",
  },
  {
    name: "Michael Brown",
    email: "michael@example.com",
  },
];

for (const user of dummyUsers) {
  const existingUser = await User.findOne({ email: user.email });

  if (existingUser) {
    console.log(`⚠️ ${user.email} already exists.`);
    continue;
  }


  await User.create({
    name: user.name,
    email: user.email,
    password: "Password123",
    role: "user",
    isVerified: true,

    avatar: {
      public_id: "dummy-avatar",
      url: "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name),
    },
  });

  console.log(`✅ Created ${user.name}`);
}

    console.log(`\n📚 Products Found: ${products.length}\n`);

   products.forEach((product, index) => {
  const obj = product.toObject();

  console.log(`========== Product ${index + 1} ==========`);

  console.log("Name  :", getProductName(obj));
  console.log("Price :", `₹${getProductPrice(obj)}`);
  console.log("Stock :", getProductStock(obj));
  console.log("Image :", getProductImage(obj));
  console.log("ID    :", getProductId(obj));

  console.log("");
});

    // Close MongoDB connection
    await mongoose.connection.close();

    console.log("✅ Database connection closed.");
  } catch (error) {
    console.error("❌ Seeder Error:", error);
    process.exit(1);
  }
};

seedDatabase();