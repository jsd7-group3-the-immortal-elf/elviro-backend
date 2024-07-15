import express from "express";
import {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
	userLogin,
} from "../controller/userController.js";

// import adminAuthMiddleware from "../middleware/adminAuthMiddleware";
import userAuthMiddleware from "../middleware/userAuthMiddleware.js";

const router = express.Router();

router.get("/", getAllUsers);

// userAuthMiddleware
router.get("/:userId", getUserById);

router.post("/create-account", createUser);

router.post("/login", userLogin);

router.patch("/:userId", userAuthMiddleware, updateUser);

// userAuthMiddleware
router.delete("/:userId", deleteUser);

export default router;
