import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";

dotenv.config();

const hashOldPasswords = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const users = await User.find();

    for (const user of users) {

      // Skip already hashed passwords
      if (user.password.startsWith("$2")) {
        continue;
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      user.password = hashedPassword;

      await user.save();

      console.log(`Updated password for: ${user.email}`);
    }

    console.log("All old passwords hashed successfully");

    process.exit();

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

hashOldPasswords();