import {
	getAllProductService,
	getProductByIdService,
	getAdminProductByIdService,
	browseProductService,
	createProductService,
	updateProductService,
	deleteProductService,
} from "../service/productService.js";
import { getUserByIdService } from "../service/userService.js";
import { verify } from "../utility/token.js";
import { BadRequestError, NotFoundError } from "../utility/error.js";

export const getAllProduct = async (_req, res, next) => {
	try {
		const limit = 1000;
		const page = 1;
		const skip = (page - 1) * limit;

		const allProduct = await getAllProductService(skip, limit);

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
		const product = await getProductByIdService(productId);

		if (!product) {
			throw new NotFoundError(`Product with id ${productId} is not found`);
		}

		if (req.cookies.access_token) {
			const token = req.cookies.access_token;
			const decoded = verify(token);
			const user = await getUserByIdService(decoded.id);
			if (user.isAdmin) {
				const product = await getAdminProductByIdService(productId);
				return res.status(200).json({
					message: `get product id ${productId} success`,
					data: product[0],
				});
			}
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
			return next();
		}

		// search
		if (query.search) {
			query["productName"] = { $regex: new RegExp(query.search, "i") };
			delete query.search;
		}

		// filter
		if (query.rooms) {
			query.rooms = { $in: query.rooms };
		}
		if (query.price) {
			// const price = query.price.split(" ");
			query.price = {
				$gte: Number(query.price[0]),
				$lte: Number(query.price[1]),
			};
		}
		if (query.cost) {
			// const cost = query.cost.split(" ");
			query.cost = {
				$gte: Number(query.cost[0]),
				$lte: Number(query.cost[1]),
			};
		}
		if (query.width) {
			// const width = query.width.split(" ");
			query["dimension.width"] = {
				$gte: Number(query.width[0]),
				$lte: Number(query.width[1]),
			};
			delete query.width;
		}
		if (query.depth) {
			// const depth = query.depth.split(" ");
			query["dimension.depth"] = {
				$gte: Number(query.depth[0]),
				$lte: Number(query.depth[1]),
			};
			delete query.depth;
		}
		if (query.depthExtend) {
			// const depth = query.depth.split(" ");
			query["dimension.depthExtend"] = {
				$gte: Number(query.depthExtend[0]),
				$lte: Number(query.depthExtend[1]),
			};
			delete query.depthExtend;
		}
		if (query.height) {
			// const height = query.height.split(" ");
			query["dimension.height"] = {
				$gte: Number(query.height[0]),
				$lte: Number(query.height[1]),
			};
			delete query.height;
		}

		query.deleteOn = null;

		// pagination
		const limit = query.limit || 24;
		const page = query.page || 1;
		const skip = (page - 1) * limit;

		if (query.page || query.limit) {
			delete query.limit;
			delete query.page;
		}

		console.log(query);

		const queryProduct = await browseProductService(query);
		const limitProduct = await browseProductService(query, skip, limit);

		const totalProduct = queryProduct.length;
		const totalPage = Math.ceil(totalProduct / limit);

		console.log(totalProduct);

		res.status(200).json({
			message: "get query product success",
			totalProduct: totalProduct,
			totalPage: totalPage,
			data: limitProduct,
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

		const product = await createProductService(data);

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
		const product = await getProductByIdService(productId);
		if (!product) {
			throw new NotFoundError(`Product with id ${productId} is not found`);
		}

		await updateProductService(productId, editProduct);

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
		const product = await getProductByIdService(productId);
		if (!product) {
			throw new NotFoundError(`Product with id ${productId} is not found`);
		}

		await deleteProductService(productId);

		res.status(200).json({
			message: `delete product id ${productId} success`,
		});
	} catch (error) {
		next(error);
	}
};
