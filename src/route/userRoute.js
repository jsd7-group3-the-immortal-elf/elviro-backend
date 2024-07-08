import express from "express";
// import {
// 	getAllUsers,
// 	getUserById,
// 	createUser,
// 	updateUser,
// 	deleteUser,
// } from "../controller/userController.js";

import getAllUsers from "../controller/userController.js";


// import adminAuthMiddleware from "../middleware/adminAuthMiddleware";

const router = express.Router();

router.get("/", getAllUsers);

// router.get("/:userId", getUserById);

// router.get("/browse", async (req, res, next) => {});

// // adminAuthMiddleware
// router.post("/", createUser);

// // adminAuthMiddleware
// router.patch("/:userId", updateUser);

// // adminAuthMiddleware
// router.delete("/:UserId", deleteUser);

export default router;
