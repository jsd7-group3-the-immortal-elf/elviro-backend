import productModel from "../model/productModel.js";

export const getAllProduct = async (req, res) => {
	try {
		const allProduct = await productModel.find({ deleteOn: null });
		res.status(200).json({
			message: "get all product success",
			data: allProduct,
		});
	} catch (error) {
		res.status(404).json({
			message: "get all product failed",
		});
	}
};

export const getProductById = async (req, res) => {
	try {
		const { productId } = req.params;
		const product = await productModel.findById(productId);
		res.status(200).json({
			message: `get product id ${productId} success`,
			data: product,
		});
	} catch (error) {
		res.status(404).json({
			message: `get product id ${productId} failed`,
		});
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const { productId } = req.params;
		const product = await productModel.findByIdAndUpdate(productId, {
			deleteOn: new Date().getTime,
		});
		res.status(200).json({
			message: `delete product id ${productId} success`,
			data: product,
		});
	} catch (error) {
		res.status(404).json({
			message: `detete product id ${productId} failed`,
		});
	}
};
