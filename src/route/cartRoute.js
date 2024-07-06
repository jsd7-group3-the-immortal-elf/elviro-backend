import express from "express";

//------import ค่าจาก controller
import {
	getProductsByCart,
	createCart,
	updateCart,
	deleteProductsByCart,
	deleteOrdered,
} from "../controller/cartController.js";

//------importตัว authenticate User
import userAuthMiddleware from "../middleware/userAuthMiddleware.js";

const router = express.Router();

//API - 1 Get each user's cart
router.get("/:cartId", userAuthMiddleware, getProductsByCart);

//API - 2 Create a new cart
router.post("/", userAuthMiddleware, createCart);

//API - 3 Add new products into a cart
router.patch("/:cartId", userAuthMiddleware, updateCart);

//API - 4 Delete products from cart
router.delete("/:cartId", userAuthMiddleware, deleteProductsByCart);

// รอถามผู้รู้ confirm อีกทีว่าควรแยกไหม ****
//API - 5 Delete products from cart
router.delete("/:cartId/order", userAuthMiddleware, deleteOrdered);

export default router;
