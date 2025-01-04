import express from "express";
import userRoutes from "./userRoutes";
import searchRoutes from "./searchRoutes";
const routes = express();

routes.use("/users", userRoutes);
routes.use("/search", searchRoutes);

export default routes;
