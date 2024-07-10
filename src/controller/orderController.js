import orderService from "../service/orderService.js";
import {
	BadRequestError,
	UnAuthorizeError,
	NotFoundError,
} from "../utility/error.js";

export const getAllOrder = async (req, res, next) => {
	try {
		const listOrder = await orderService.getAllOrder();
		return res.status(200).json({ message: "Get All Order", data: listOrder });
	} catch (error) {
		next(error);
	}
};

export const getUserId = async (req, res, next) => {
	try {
		const { userId } = req.params;
		// const objectId = await objectId(userId);
		// console.log("objectId is :  " + objectId);
		const inputObjectId = `ObjectId('${userId}')`;
		// console.log("Object : " + inputObjectId);
		const user = await orderService.getUserId(inputObjectId);
		// console.log("ID User : ", user);
		return res.status(200).json({ message: "Get User Order Test", data: user });
	} catch (error) {
		next(error);
	}
};

export const createOrder = async (req, res, next) => {
	try {
		const { orderDetail, totalPrice, customer } = req.body;
		const data = { orderDetail, totalPrice, customer };
		const orderCreate = await orderService.createOrderData(data);
		res
			.status(201)
			.json({ message: "Create Order complete", data: orderCreate });
	} catch (error) {
		next(error);
	}
};
