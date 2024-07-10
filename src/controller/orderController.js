import orderService from "../service/orderService.js";
import {
	BadRequestError,
	UnAuthorizeError,
	NotFoundError,
} from "../utility/error.js";

export const getAllOrder = async (req, res, next) => {
	try {
		const listOrder = await orderService.getAllOrder();
		res.status(200).json({ message: "Get All Order", data: listOrder });
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
