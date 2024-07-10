import orderService from "../service/orderService.js";

export const getAllOder = async (req, res, next) => {
	const listOder = await orderService.getAllOder;
	res.status(200).json({ message: "Get All Oder", data: listOder });
};

export const createOrder = async (req, res, next) => {
	const { orderDat, orderDetail, totalPrice, customer, status } = req.body;
	const data = { orderDat, orderDetail, totalPrice, customer, status };
	const orderCreate = await orderService.createOrderData(data);
	res.status(200).json({ message: "Create oder complete", data: orderCreate });
};
