import express from "express";
import * as orderController from "../controller/orderController.js";
import orderService from "../service/orderService.js";

const router = express.Router();

// get All Order All user
router.get("/", orderController.getAllOder);
export default router;
