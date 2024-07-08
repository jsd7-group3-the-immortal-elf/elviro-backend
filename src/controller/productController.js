import { v2 as cloudinary } from "cloudinary";
import productModel from "../model/productModel.js";
import {
	BadRequestError,
	UnAuthorizeError,
	NotFoundError,
} from "../utility/error.js";

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

export const getAllProduct = async (_req, res, next) => {
	try {
		const allProduct = await productModel.find({ deleteOn: null });
		res.status(200).json({
			message: "get all product success",
			count: allProduct.length,
			data: allProduct,
		});
	} catch (error) {
		next(error);
	}
};

export const getProductById = async (req, res, next) => {
	try {
		const { productId } = req.params;
		const product = await productModel.findById(productId);

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

export const browseProduct = async (req, res, next) => {
	try {
		const { query } = req;
		if (Object.keys(query).length === 0) {
			next();
		}

		/*
		search
		page >> limit, skip
		rooms arr > $all
		category
		price $gte, $lte
		cost $gte, $lte
		color
		width $gte, $lte
		depth $gte, $lte
		height $gte, $lte
		isPublish
		*/

		// width: {$gte : 100, $lte : 200}
		// dimension: {
		// 		width: {$gte : 100, $lte : 200}
		// }

		console.log(query);
		// search

		// filter
		if (query.rooms) {
			query.rooms = { $all: query.rooms.split("&") };
		}

		if (query.price) {
			const price = query.price.split(" ");
			query.price = { $gte: price[0], $lte: price[1] };
		}
		if (query.cost) {
			const cost = query.cost.split(" ");
			query.cost = { $gte: cost[0], $lte: cost[1] };
		}

		if (query.width) {
			const width = query.width.split(" ");
			query["dimension.width"] = { $gte: width[0], $lte: width[1] };
			delete query.width;
		}
		if (query.depth) {
			const depth = query.depth.split(" ");
			query["dimension.depth"] = { $gte: depth[0], $lte: depth[1] };
			delete query.depth;
		}
		if (query.height) {
			const height = query.height.split(" ");
			query["dimension.height"] = { $gte: height[0], $lte: height[1] };
			delete query.height;
		}
		console.log(query);

		// pagination
		if (query.page && query.limit) {
			const limit = query.limit;
			const offset = (query.page - 1) * limit;

			delete query.limit;
			delete query.page;

			const queryProduct = await productModel
				.find(query)
				.skip(offset)
				.limit(limit);

			res.status(200).json({
				message: "get product success",
				count: queryProduct.length,
				data: queryProduct,
			});
		} else {
			const queryProduct = await productModel.find(query);

			res.status(200).json({
				message: "get product success",
				count: queryProduct.length,
				data: queryProduct,
			});
		}
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
			category,
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
			!category ||
			!price ||
			!cost ||
			!stock ||
			!color ||
			!dimension ||
			!warranty ||
			!description
		) {
			throw new BadRequestError("All field is require");
		}

		const product = new productModel({
			productName,
			productImage,
			rooms,
			category,
			price,
			cost,
			stock,
			color,
			dimension,
			warranty,
			description,
		});

		const uploadResult = await cloudinary.uploader.upload(productImage, {
			public_id: product._id,
			folder: "Elviro",
		});

		product.productImage = uploadResult.url;

		await product.save();

		res.status(201).json({
			message: `Create product success`,
			data: product,
		});
	} catch (error) {
		next(error);
	}
};

export const updateProduct = async (req, res, next) => {
	try {
		const { productId } = req.params;
		const { ...editProduct } = req.body;

		const product = await productModel.findById(productId);
		if (!product) {
			throw new NotFoundError(`Product with id ${productId} is not found`);
		}

		await productModel.findByIdAndUpdate(productId, editProduct);

		res.status(200).json({
			message: `update product with id ${productId} success`,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteProduct = async (req, res, next) => {
	try {
		const { productId } = req.params;
		const product = await productModel.findById(productId);
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
