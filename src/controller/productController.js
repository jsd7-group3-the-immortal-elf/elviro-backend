import { Error } from "mongoose";
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
