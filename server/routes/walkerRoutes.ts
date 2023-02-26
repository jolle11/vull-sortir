import {
	getWalkerProfile,
	loginWalker,
	registerWalker,
} from "../controllers/walkerController";
import verifyToken from "../middleware/verifyToken";
import express from "express";

const router = express.Router();

router.post("/register", registerWalker);
router.post("/login", loginWalker);
router.get("/profile", verifyToken, getWalkerProfile);

// TODO: ADD PUT/PATCH TO UPDATE OR ADD INFO
// TODO: ADD DELETE

export default router;
