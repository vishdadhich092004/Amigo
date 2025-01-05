import mongoose from "mongoose";
import User from "../models/user";
import seedUserData from "../lib/userData";
import bcrypt from "bcrypt";

export const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Connected to the database!");

    // Clear existing users
    await User.deleteMany({});
    console.log("Existing users cleared!");

    // Insert new users
    for (const user of seedUserData) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = new User({
        username: user.username,
        password: hashedPassword,
        name: user.name,
        location: user.location,
        interests: user.interests,
        bio: user.bio,
      });

      if (typeof newUser.setRandomAvatar === "function") {
        newUser.setRandomAvatar();
      }

      await newUser.save();
    }
    console.log("User data seeded successfully!");

    // Close the database connection
    await mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding data:", error);
    await mongoose.connection.close();
  }
};
