import userModel from "../model/userModel.js";

//File คำสั่งของ cart

const cartService = {
	//API - 1 Get all products in each user's cart
	async getProductsByCart(userId) {
		return userModel.findById(userId);
	},

	//API - 2 Get all products in each user's cart
	async createCart(data) {
		return userModel.findByIdAndUpdate(
			userId,
			{ $push: { cart: { productId: productId, quantity: quantity } } },
			{ new: true, runValidators: true } //new คือ return ค่าที่ update โดยตามกฎ validator
		);
	},

	//API - 3 Add new products into a cart
	async updateCart(id, data) {},

	//API - 4 Delete products from cart
	async deleteProductsByCart(id) {},
};

export default cartService;
