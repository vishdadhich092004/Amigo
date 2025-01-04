import "dotenv/config";
import express from "express";
import "dotenv/config";
import cors from "cors";
import { dbConfig } from "./db/db.config";
import cookieParser from "cookie-parser";
import routes from "./routes/allRoutes";
const app = express();

// basic setup
app.use(
  cors({
    origin: process.env.FRONTEND_URL as string,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hey from the backend Amigos :!");
});

// all the routes
app.use("/api", routes);

// configure database
const connectMongo = async () => {
  await dbConfig();
};
connectMongo();

const PORT = process.env.PORT || 3000;

// run the server on port
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
