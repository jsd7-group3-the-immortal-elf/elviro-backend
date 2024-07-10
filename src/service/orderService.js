import order from "../model/orderModel.js";

const orderService = {
	async getAllOder() {
		return order.find();
	},

	async createOrderData(data) {
		return order.insertOne(data);
	},
};

export default orderService;
