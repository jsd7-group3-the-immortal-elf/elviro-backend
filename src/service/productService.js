import productModel from "../model/productModel.js";

const productService = {
	async getAllProduct(skip, limit) {
		return productModel.find({ deleteOn: null }).skip(skip).limit(limit);
	},

	async getProductById(productId) {
		return productModel.findById(productId);
	},

	async browseProduct(query, skip, limit) {
		return productModel.find(query).skip(skip).limit(limit);
	},

	async createProduct(data) {
		const product = new productModel(data);
		await product.save();
		return product;
	},

	async updateProduct(productId, editProduct) {
		return productModel.findByIdAndUpdate(productId, editProduct);
	},

	async deleteProduct(productId) {
		return productModel.findByIdAndUpdate(productId, {
			deleteOn: new Date().getTime(),
		});
	},
};

export default productService;
