import orderService from "../service/orderService.js";
import {
	BadRequestError,
	UnAuthorizeError,
	NotFoundError,
} from "../utility/error.js";
import mongoose from "mongoose";

export const getAllOrder = async (req, res, next) => {
	try {
		const allOrder = await orderService.getAllOrderService();

		if (allOrder.length == 0) throw new NotFoundError("can't found order");

		res.status(200).json({
			message: "get all order success",
			data: allOrder,
		});
	} catch (error) {
		next(error);
	}
};

export const getOrderById = async (req, res, next) => {
	try {
		// !admin > use userId
		let { orderId } = req.params;

		const order = await orderService.getOrderByIdService(orderId);

		if (order.length == 0) throw new NotFoundError("can't found order");

		res.status(200).json({
			message: `get order with id ${orderId} success`,
			data: order[0],
		});
	} catch (error) {
		next(error);
	}
};

export const browseOrder = async (req, res, next) => {
	try {
		const { query } = req;
		if (Object.keys(query).length === 0) {
			return next();
		}

		if (query.search) {
			query["_id"] = new mongoose.Types.ObjectId(`${query.search}`);
			delete query.status;
		}
		delete query.search;

		const queryOrder = await orderService.browseOrderService(query);

		// if (queryOrder.length == 0) throw new NotFoundError("can't found order");

		res.status(200).json({
			message: "get query order success",
			data: queryOrder,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllOrderByUserId = async (req, res, next) => {
	try {
		const { userId } = req.params;
		// const inputObjectId = `ObjectId('${userId}')`;
		// console.log("Object : " + inputObjectId);
		const user = await orderService.dataGetUserId(userId);
		// console.log("ID User : ", user);

		return res.status(200).json({
			message: `get order with user id ${userId} success`,
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

export const getOneOrderByUserId = async (req, res, next) => {
	try {
		const { userId, orderId } = req.params;
		// const inputUserId = `ObjectId('${userId}')`;
		// console.log("inputUserId  : " + inputUserId);
		// console.log("userId : " + userId);
		// console.log("---------------");
		// console.log("orderId :" + orderId);
		const user = await orderService.dataGetUserOderId(userId, orderId);

		return res.status(200).json({
			message: `get order id ${orderId} with user id ${userId} success`,
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

export const createOrder = async (req, res, next) => {
	try {
		const { orderDetail, totalPrice, customer, payment } = req.body;
		const data = { orderDetail, totalPrice, customer, payment };
		const orderCreate = await orderService.dataCreateOrderData(data);

		res.status(201).json({
			message: "create order success",
			data: orderCreate,
		});
	} catch (error) {
		next(error);
	}
};

export const updateOrder = async (req, res, next) => {
	try {
		const { orderId } = req.params;
		const { status } = req.body;
		console.log(status);

		if (!orderId || !status) {
			throw new BadRequestError("Order ID and status are required");
		}

		const order = await orderService.updateOrderService(orderId, status);

		if (!order) {
			throw new NotFoundError("Order not found.");
		}

		res.status(200).json({
			message: "Order cancelled successfully.",
			data: order,
		});
	} catch (error) {
		next(error);
	}
};
