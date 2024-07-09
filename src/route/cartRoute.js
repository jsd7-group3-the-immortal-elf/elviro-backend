import express from "express";

//------import ค่าจาก controller
import {
	getCartByUser,
	createCart,
	updateCart,
	deleteProductsByCart,
} from "../controller/cartController.js";

import userModel from "../model/userModel.js";

const router = express.Router();

//API - 1 Get each user's cart
router.post("/", (req, res) => {
	const user = new userModel(req.body);

	user.save();

	res.json(user);
});

router.get("/:userId", getCartByUser);

//API - 2 Create a new cart
router.post("/:userId", createCart, updateCart);

//API - 3 Add new products into a cart
router.patch("/:userId", updateCart);

//API - 4 Delete one product from cart
router.delete("/:userId", deleteProductsByCart);

export default router;
