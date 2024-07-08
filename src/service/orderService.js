import order from "../model/orderModel.js";

const orderService = {
	async getAllOder() {
		return order.find();
	},
};

export default orderService;
