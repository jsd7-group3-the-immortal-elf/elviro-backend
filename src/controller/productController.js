import productModel from "../model/productModel.js";

export const getAllProduct = async (req, res) => {
	try {
		const allProduct = await productModel.find();
		res.status(200).json({
			message: "get product success",
			data: allProduct,
		});
	} catch (error) {
		res.status(404).json({
			message: "get product failed",
		});
	}
};

export const getProductById = async (req, res) => {
	try {
		const { productId } = req.params;
		const product = await productModel.findById(productId);
		res.status(200).json({
			message: "get product success",
			data: product,
		});
	} catch (error) {
		res.status(404).json({
			message: "get product failed",
		});
	}
};
