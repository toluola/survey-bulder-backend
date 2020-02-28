import { Router } from "express";
import { createUser, loginUser } from "../controllers/users";

const router = Router();

router.post("/user", createUser);
router.post("/user/login", loginUser);

export default router;
