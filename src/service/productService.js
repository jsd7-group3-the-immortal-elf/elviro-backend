import productModel from "../model/productModel.js";

export async function getAllProduct(skip, limit) {
	return productModel.find({ deleteOn: null }).skip(skip).limit(limit);
}

export async function getProductById(productId) {
	return productModel.findById(productId);
}

export async function browseProduct(query, skip, limit) {
	return productModel.find(query).skip(skip).limit(limit);
}

export async function createProduct(data) {
	const product = new productModel(data);
	await product.save();
	return product;
}

export async function updateProduct(productId, editProduct) {
	return productModel.findByIdAndUpdate(productId, editProduct);
}

export async function deleteProduct(productId) {
	return productModel.findByIdAndUpdate(productId, {
		deleteOn: new Date().getTime(),
	});
}
