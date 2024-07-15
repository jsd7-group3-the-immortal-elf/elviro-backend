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

const router = express.Router();

// userAuthMiddleware
router.get("/", browseOrder, getAllOrder);

// adminAuthMiddleware
router.get("/:orderId", getOrderById);

// userAuthMiddleware
// router.get("/:userId", getAllOrderByUserId);

// userAuthMiddleware
router.get("/:userId/:orderId", getOneOrderByUserId);

// userAuthMiddleware
router.post("/", createOrder);

// userAuthMiddleware
router.patch("/:orderId", updateOrder);

export default router;
