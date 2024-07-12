import orderService from "../service/orderService.js";
import orderModel from "../model/orderModel.js";

import {
	BadRequestError,
	UnAuthorizeError,
	NotFoundError,
} from "../utility/error.js";

export const getAllOrder = async (req, res, next) => {
	try {
		// customerName
		// profit = sum(each product price - each product cost)
		// aggregate

		// const allOrder = await orderService.dataGetAllOrder();

		const allOrder = await orderModel.aggregate([
			{
				$lookup: {
					from: "products",
					localField: "orderDetail.productId",
					foreignField: "_id",
					as: "orderDetail.productInfo",
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "customer.customerId",
					foreignField: "_id",
					as: "customer.customerInfo",
				},
			},
			{
				$unwind: "$orderDetail.productInfo",
			},
			{
				$unwind: "$customer.customerInfo",
			},
			{
				$project: {
					createOn: 1,
					"orderDetail.quantity": 1,
					"orderDetail.price": 1,
					"orderDetail.productInfo.name": 1,
					"orderDetail.productInfo.price": 1,
					"customer.customerInfo.name": 1,
					"customer.customerInfo.email": 1,
				},
			},
		]);

		console.log(allOrder);

		// const newArr = allOrder.map((order) => ({ ...order, profit: 1000 }));
		// const newArr = allOrder.forEach((order) => ({ ...order, profit: 1000 }));

		res.status(200).json({
			message: "get all order success",
			data: allOrder,
		});
	} catch (error) {
		next(error);
	}
};

export const getUserId = async (req, res, next) => {
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

export const getUserOderId = async (req, res, next) => {
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

export const PostCreateOrder = async (req, res, next) => {
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
