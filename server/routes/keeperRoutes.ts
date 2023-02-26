import {
	getKeeperProfile,
	loginKeeper,
	registerKeeper,
} from "../controllers/keeperController";
import verifyToken from "../middleware/verifyToken";
import express from "express";

const router = express.Router();

router.post("/register", registerKeeper);
router.post("/login", loginKeeper);
router.get("/profile", verifyToken, getKeeperProfile);

// TODO: ADD PUT/PATCH TO UPDATE OR ADD INFO
// TODO: ADD DELETE

export default router;
