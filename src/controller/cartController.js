import cartService from "../service/cartService.js";
import productModel from "../model/productModel.js";

//---ถ้าไม่สร้างค่อยลบออก ไว้ดัก error
// import NotFoundError from '../error/NotFoundError.js';
// import BadRequestError from '../error/BadRequestError.js';

//API - 1 Get all products in each user's cart
const getProductsByCart = async (req, res, next) => {
	try {
		const cart = await productModel.cart.find({}).sort({ productId: 1 });
		return res
			.status(200)
			.json({ message: "Get the cart successful.", data: cart });
	} catch (error) {
		res.status(404).json({ message: "Cart not found." });
		next(error);
	}
};

//API - 2 Create a new cart
const createCart = async (req, res, next) => {
	try {
		const { productId, quantity } = req.body;
		if (!productId) {
			return res
				.status(400)
				.json({ error: true, message: "Product ID is required" });
		}
		if (!quantity) {
			return res
				.status(400)
				.json({ error: true, message: "Product's quantity is required" });
		}

		const data = { productId, quantity };
	} catch (error) {
		next(error);
	}
};

//API - 3 Add new products into a cart
const updateCart = async (req, res, next) => {
	try {
	} catch (error) {}
};

//API - 4 Delete products from cart
const deleteProductsByCart = async (req, res, next) => {
	try {
	} catch (error) {}
};

//API - 5 Delete products from cart
const deleteOrdered = async (req, res, next) => {
	try {
	} catch (error) {}
};

export {
	getProductsByCart,
	createCart,
	updateCart,
	deleteProductsByCart,
	deleteOrdered,
};
