import express from "express";
import {
	getCartByUser,
	browseCartByUser,
	createCart,
	updateCart,
	deleteProductsByCart,
} from "../controller/cartController.js";

const router = express.Router();

//API - 1 Get each user's cart
router.get("/:userId", getCartByUser);

//API - 2 Create a new cart
router.post("/:userId", createCart, updateCart);

//API - 3 Add new products into a cart
router.patch("/:userId", updateCart);

//API - 4 Delete one product from cart
router.delete("/:userId", deleteProductsByCart);

export default router;
