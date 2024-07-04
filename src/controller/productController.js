import productModel from "../model/productModel.js";

const getAllProduct = async (req, res) => {
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

export default getAllProduct;
