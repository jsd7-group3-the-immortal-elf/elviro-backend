import express from "express";
import { getAllOrder, createOrder } from "../controller/orderController.js";
import orderService from "../service/orderService.js";

const router = express.Router();

// get All Order All user
router.get("/", getAllOrder);
// post create order
router.post("/", createOrder);
export default router;
