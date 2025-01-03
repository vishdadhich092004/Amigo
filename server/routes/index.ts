import express from "express";
import userRoutes from "../routes/userRoutes";
const routes = express();

routes.use("/users", userRoutes);

export default routes;
