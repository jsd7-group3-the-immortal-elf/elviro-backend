import express from "express";
import {
	getAllOrder,
	browseOrder,
	getOrderById,
	getAllOrderByUserId,
	getOneOrderByUserId,
	createOrder,
} from "../controller/orderController.js";

const router = express.Router();

// adminAuthMiddleware
router.get("/", getAllOrder);

// adminAuthMiddleware
router.get("/:orderId", getOrderById);

// userAuthMiddleware
router.get("/:userId", getAllOrderByUserId);

// userAuthMiddleware
router.get("/:userId/:orderId", getOneOrderByUserId);

// userAuthMiddleware
router.post("/", createOrder);

// userAuthMiddleware
router.patch("/:orderId");

export default router;
