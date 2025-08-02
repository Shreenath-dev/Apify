import express from "express";
import * as controller from "@/controllers";
import * as validation from "@/validations";
import { limiter } from "@/security/limiter";

const router = express.Router();
router.route("/actor-list").get(limiter, controller.v1.users.getActorList);
router.route("/actor/:actorId").get(limiter, controller.v1.users.getActor);
router.route("/actor-run/:actorId").post(limiter, controller.v1.users.defaultActor);


export default router;
