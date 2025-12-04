import express from "express";
import { signin, signout, registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/signin", signin);
router.get("/signout", signout);

export default router;
