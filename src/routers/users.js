import { Router } from "express";
import {
  createUser,
  loginUser,
  viewUser,
  logoutUser,
  logoutAllUser
} from "../controllers/users";
import auth from "../middlewares/auth";
import { createValidationFor, checkValidationResult } from "../utils/validator";

const router = Router();

router.post(
  "/user",
  createValidationFor("signup"),
  checkValidationResult,
  createUser
);
router.post("/user/login", loginUser);
router.get("/user", auth, viewUser);
router.get("/user/logout", auth, logoutUser);
router.get("/user/logoutAll", auth, logoutAllUser);

export default router;
