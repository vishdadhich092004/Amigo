import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL as string;
export const dbConfig = async () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("Mongo DataBase Connected");
    })
    .catch((e) => {
      console.error(e);
    });
};
