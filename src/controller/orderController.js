import orderService from "../service/orderService.js";
import mongoose from "mongoose";

import {
	BadRequestError,
	UnAuthorizeError,
	NotFoundError,
} from "../utility/error.js";

export const getAllOrder = async (req, res, next) => {
	try {
		const listOrder = await orderService.dataGetAllOrder();
		return res.status(200).json({ message: "Get All Order", data: listOrder });
	} catch (error) {
		next(error);
	}
};

export const getUserId = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const inputObjectId = `ObjectId('${userId}')`;
		// console.log("Object : " + inputObjectId);
		const user = await orderService.dataGetUserId(inputObjectId);
		// console.log("ID User : ", user);
		return res
			.status(200)
			.json({ message: "Get all order in user", data: user });
	} catch (error) {
		next(error);
	}
};

export const getUserOderId = async (req, res, next) => {
	try {
		const { userId, orderId } = req.params;
		// const inputUserId = `ObjectId('${userId}')`;
		// console.log("inputUserId  : " + inputUserId);
		const user = await orderService.dataGetUserOderId(userId, orderId);
		return res
			.status(200)
			.json({ message: "Get One order in user", data: user });
	} catch (error) {
		next(error);
	}
};

export const createOrder = async (req, res, next) => {
	try {
		const { orderDetail, totalPrice, customer } = req.body;
		const data = { orderDetail, totalPrice, customer };
		const orderCreate = await orderService.dataCreateOrderData(data);
		res
			.status(201)
			.json({ message: "Create Order complete", data: orderCreate });
	} catch (error) {
		next(error);
	}
};
