import express from "express";

import apiRoutes from "./api.routes";
const router = express.Router();

router.use("/actor",apiRoutes );

export default router;
