import orderService from "../service/orderService.js";
import orderModel from "../model/orderModel.js";

import {
	BadRequestError,
	UnAuthorizeError,
	NotFoundError,
} from "../utility/error.js";

export const getAllOrder = async (req, res, next) => {
	try {
		const allOrder = await orderService.dataGetAllOrder();

		if (allOrder.length == 0) throw new NotFoundError("can't found order");

		res.status(200).json({
			message: "get all order success",
			data: allOrder,
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

		const allOrder = await orderService.dataBrowseOrder();

		if (allOrder.length == 0) throw new NotFoundError("can't found order");

		res.status(200).json({
			message: "get all order success",
			data: allOrder,
		});
	} catch (error) {
		next(error);
	}
};

export const getOrderByUserId = async (req, res, next) => {
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

export const getOrderById = async (req, res, next) => {
	try {
		const { userId, orderId } = req.params;
		// const inputUserId = `ObjectId('${userId}')`;
		// console.log("inputUserId  : " + inputUserId);
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
		const { orderDetail, totalPrice, customer } = req.body;
		const data = { orderDetail, totalPrice, customer };
		const orderCreate = await orderService.dataCreateOrderData(data);

		res.status(201).json({
			message: "create order success",
			data: orderCreate,
		});
	} catch (error) {
		next(error);
	}
};
