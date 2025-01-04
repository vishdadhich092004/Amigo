import express from "express";
import userRoutes from "./userRoutes";
import searchRoutes from "./searchRoutes";
import friendRequestRoutes from "./friendRequestRoutes";
const routes = express();

routes.use("/users", userRoutes);
routes.use("/search", searchRoutes);
routes.use("/friend-requests", friendRequestRoutes);

export default routes;
