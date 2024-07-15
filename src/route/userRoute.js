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

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:userId", getUserById);

// router.get("/browse", async (req, res, next) => {});

router.post("/login", userLogin);

// // adminAuthMiddleware
router.post("/create-account", createUser);

// // adminAuthMiddleware
router.patch("/:userId", updateUser);

// // adminAuthMiddleware
router.patch("/:userId", deleteUser);

export default router;
