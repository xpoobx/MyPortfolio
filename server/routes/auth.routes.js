import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/signin", loginUser);
router.get("/signout", logoutUser);

export default router;
