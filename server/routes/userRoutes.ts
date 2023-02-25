import { createUser, getUserById } from "../controllers/userController";
import { Router } from "express";

const router = Router();

router.post("/", createUser);
router.get("/:id", getUserById);

export default router;
