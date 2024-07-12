import express from "express";
import {
	getAllOrder,
	PostCreateOrder,
	getUserId,
	getUserOderId,
} from "../controller/orderController.js";

const router = express.Router();

// get All Order All user
router.get("/", getAllOrder);
// get All Order in user
router.get("/:userId", getUserId);
// get one Order in user
router.get("/:userId/:orderId", getUserOderId);
// post create order
router.post("/", PostCreateOrder);
export default router;
