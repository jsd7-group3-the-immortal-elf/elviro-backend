import productModel from "../model/productModel.js";
import {
	BadRequestError,
	UnAuthorizeError,
	NotFoundError,
} from "../utility/error.js";

export const getAllProduct = async (_req, res, next) => {
	try {
		const allProduct = await productModel.find({ deleteOn: null });
		res.status(200).json({
			message: "get all product success",
			data: allProduct,
		});
	} catch (error) {
		next(error);
	}
};

export const getProductById = async (req, res, next) => {
	try {
		const { productId } = req.params;
		const product = await productModel.findById(String(productId));

		if (!product) {
			throw new NotFoundError(`Product with id ${productId} is not found`);
		}

		res.status(200).json({
			message: `get product id ${productId} success`,
			data: product,
		});
	} catch (error) {
		next(error);
	}
};

export const createProduct = async (req, res, next) => {
	try {
		const {
			productName,
			productImage,
			rooms,
			catagory,
			price,
			cost,
			stock,
			color,
			dimension,
			warranty,
			description,
		} = req.body;

		if (
			!productName ||
			!productImage ||
			!rooms ||
			!catagory ||
			!price ||
			!cost ||
			!stock ||
			!color ||
			!dimension ||
			!warranty ||
			!description
		) {
			throw new BadRequestError("All feild is require");
		}

		const product = new productModel({
			productName,
			productImage,
			rooms,
			catagory,
			price,
			cost,
			stock,
			color,
			dimension,
			warranty,
			description,
		});

		await product.save();

		res.status(201).json({
			message: `Create product success`,
			data: product,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteProduct = async (req, res, next) => {
	try {
		const { productId } = req.params;
		const product = await productModel.findById(String(productId));
		if (!product) {
			throw new NotFoundError(`Product with id ${productId} is not found`);
		}

		await productModel.findByIdAndUpdate(productId, {
			deleteOn: new Date().getTime(),
		});
		res.status(200).json({
			message: `delete product id ${productId} success`,
		});
	} catch (error) {
		next(error);
	}
};
