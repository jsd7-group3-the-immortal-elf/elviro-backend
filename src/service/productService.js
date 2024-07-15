import productModel from "../model/productModel.js";

export async function getAllProductService(skip, limit) {
	return productModel.find({ deleteOn: null }).skip(skip).limit(limit);
}

export async function getProductByIdService(productId) {
	return productModel.findById(productId);
}

export async function browseProductService(query, skip, limit) {
	if (limit) {
		return productModel.find(query).skip(skip).limit(limit);
	}
	return productModel.find(query);
}

export async function createProductService(data) {
	const product = new productModel(data);
	await product.save();
	return product;
}

export async function updateProductService(productId, editProduct) {
	return productModel.findByIdAndUpdate(productId, editProduct);
}

export async function deleteProductService(productId) {
	return productModel.findByIdAndUpdate(productId, {
		deleteOn: new Date().getTime(),
	});
}
