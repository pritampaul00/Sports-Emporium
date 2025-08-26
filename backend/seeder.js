// seeder.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/userModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error("Admin email or password not set in .env");
    }

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const adminUser = new User({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created");
    process.exit();
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
