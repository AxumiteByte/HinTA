import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

export const seedAdmin = async () => {
  try {
    const { INITIAL_ADMIN_EMAIL, INITIAL_ADMIN_PASSWORD, INITIAL_ADMIN_USER } = process.env;

    if (!INITIAL_ADMIN_EMAIL || !INITIAL_ADMIN_PASSWORD || !INITIAL_ADMIN_USER) {
      console.error("Set INITIAL_ADMIN_EMAIL, INITIAL_ADMIN_PASSWORD, and INITIAL_ADMIN_USER in .env");
      return;
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: INITIAL_ADMIN_EMAIL });
    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin.user);
      return;
    }

    const hashedPassword = await bcrypt.hash(INITIAL_ADMIN_PASSWORD, 10);

    const admin = await User.create({
      user: INITIAL_ADMIN_USER,
      email: INITIAL_ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    });

    console.log("Initial admin created:", admin.user);
  } catch (err) {
    console.error("Error seeding admin:", err);
  }
};
