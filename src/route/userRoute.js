import express from "express";
import {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
	userLogin,
} from "../controller/userController.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";
import userAuthMiddleware from "../middleware/userAuthMiddleware.js";

const router = express.Router();

router.get("/", adminAuthMiddleware, getAllUsers);

router.get("/:userId", userAuthMiddleware, getUserById);

router.post("/create-account", createUser);

router.post("/login", userLogin);

router.patch("/:userId", userAuthMiddleware, updateUser);

router.delete("/:userId", userAuthMiddleware, deleteUser);

export default router;
