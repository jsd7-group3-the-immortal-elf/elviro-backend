import express from "express";
import {
	getAllOrder,
	createOrder,
	getUserId,
} from "../controller/orderController.js";

const router = express.Router();

// get All Order All user
router.get("/", getAllOrder);
// get Order user
router.get("/:userId", getUserId);
// post create order
router.post("/", createOrder);
export default router;
