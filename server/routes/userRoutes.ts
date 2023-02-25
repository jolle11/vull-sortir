import {
	getUserProfile,
	loginUser,
	registerUser,
} from "../controllers/userController";
import verifyToken from "../middleware/verifyToken";
import express from "express";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getUserProfile);

export default router;
