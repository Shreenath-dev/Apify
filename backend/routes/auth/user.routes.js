import express from "express";
import * as controller from "@/controllers";
import * as validation from "@/validations";
import { limiter } from "@/security/limiter";

const router = express.Router();

export default router;
