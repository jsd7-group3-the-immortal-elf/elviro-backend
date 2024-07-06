import express from "express";

//------import ค่าจาก controller
import {
	getCartByUser,
	createCart,
	updateCart,
	deleteProductsByCart,
	deleteOrdered,
} from "../controller/cartController.js";

const router = express.Router();

//API - 1 Get each user's cart

router.get("/:userId", getCartByUser);

//API - 2 Create a new cart
router.post("/:userId", createCart);

//API - 3 Add new products into a cart
router.patch("/:userId/:cartId", updateCart);

//API - 4 Delete products from cart
router.delete("/:userId/:cartId", deleteProductsByCart);

// รอถามผู้รู้ confirm อีกทีว่าควรแยกไหม ****
//API - 5 Delete products from cart
router.delete("/:userId/:cartId/order", deleteOrdered);

export default router;
