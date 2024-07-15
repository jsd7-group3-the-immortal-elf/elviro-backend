import express from "express";
import {
	getAllOrder,
	browseOrder,
	getOrderById,
	getAllOrderByUserId,
	getOneOrderByUserId,
	createOrder,
	updateOrder,
} from "../controller/orderController.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";
import userAuthMiddleware from "../middleware/userAuthMiddleware.js";

const router = express.Router();

router.get(
	"/",
	userAuthMiddleware,
	getAllOrderByUserId,
	browseOrder,
	getAllOrder
);

router.get("/:orderId", adminAuthMiddleware, getOrderById);

// router.get("/:userId", getAllOrderByUserId);

router.get("/:userId/:orderId", userAuthMiddleware, getOneOrderByUserId);

router.post("/", userAuthMiddleware, createOrder);

router.patch("/:orderId", userAuthMiddleware, updateOrder);

export default router;
