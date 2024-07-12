import express from "express";
import {
	getAllOrder,
	browseOrder,
	getOrderByUserId,
	getOrderById,
	createOrder,
} from "../controller/orderController.js";

const router = express.Router();

// adminAuthMiddleware
router.get("/", browseOrder, getAllOrder);

// userAuthMiddleware
router.get("/:userId", getOrderByUserId);

// userAuthMiddleware
router.get("/:userId/:orderId", getOrderById);

// userAuthMiddleware
router.post("/", createOrder);

// userAuthMiddleware
router.patch("/:orderId");

export default router;
