import productService from "../service/productService.js";
import {
	BadRequestError,
	UnAuthorizeError,
	NotFoundError,
} from "../utility/error.js";
import productModel from "../model/productModel.js";

export const getAllProduct = async (_req, res, next) => {
	try {
		const limit = 24;
		const page = 1;
		const skip = (page - 1) * limit;

		// const allProduct = await productService.getAllProduct(skip, limit);
		const allProduct = await productModel
			.find({ deleteOn: null })
			.skip(skip)
			.limit(limit);

		const count = allProduct.length;
		const totalPage = Math.ceil(count / limit);

		res.status(200).json({
			message: "get all product success",
			count: count,
			totalPage: totalPage,
			data: allProduct,
		});
	} catch (error) {
		next(error);
	}
};

export const getProductById = async (req, res, next) => {
	try {
		const { productId } = req.params;
		// const product = await productService.getProductById(productId);
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

		// search
		if (query.search) {
			query["productName"] = { $regex: new RegExp(query.search, "i") };
			delete query.search;
		}

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

		query.deleteOn = null;

		// pagination
		const limit = query.limit || 24;
		const page = query.page || 1;
		const skip = (page - 1) * limit;

		if (query.page && query.limit) {
			delete query.limit;
			delete query.page;
		}

		// const queryProduct = await productService.browseProduct(query, skip, limit);
		const queryProduct = await productModel.find(query).skip(skip).limit(limit);

		const count = queryProduct.length;
		const totalPage = Math.ceil(count / limit);

		res.status(200).json({
			message: "get product success",
			count: count,
			totalPage: totalPage,
			data: queryProduct,
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

		const data = {
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
		};

		// const product = await productService.createProduct(data);
		const product = new productModel(data);
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

		// await productService.updateProduct(productId, editProduct);
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

		// await productService.deleteProduct(productId);
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
