import orderService from "../service/orderService.js";

export const getAllOder = async (req, res, next) => {
	const listOder = await orderService.getAllOder;
	res.status(200).json({ message: "Get All Oder", data: listOder });
};
