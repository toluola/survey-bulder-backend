import { Router } from "express";
import {
  createUser,
  loginUser,
  viewUser,
  logoutUser,
  logoutAllUser
} from "../controllers/users";
import auth from "../middlewares/auth";

const router = Router();

router.post("/user", createUser);
router.post("/user/login", loginUser);
router.get("/user", auth, viewUser);
router.get("/user/logout", auth, logoutUser);
router.get("/user/logoutAll", auth, logoutAllUser);

export default router;
