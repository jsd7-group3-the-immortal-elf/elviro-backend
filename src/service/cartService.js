import userModel from "../model/userModel.js";

//File คำสั่งของ cart

const cartService = {
	//API - 1 Get all products in each user's cart
	async getProductsByCart(userId) {
		return userModel.findById(userId);
	},

	//API - 2 Get all products in each user's cart
	async createCart(data) {},

	//API - 3 Add new products into a cart
	async updateCart(id, data) {},

	//API - 4 Delete products from cart
	async deleteProductsByCart(id) {},
};

export default cartService;
