import mongoose from "mongoose";
import orderModel from "../model/orderModel.js";

const orderService = {
	async getAllOrder() {
		return orderModel.find();
	},

	async getUserId(data) {
		return orderModel.findOne({ "customer.customerId": data });
	},

	async createOrderData(data) {
		// const order = new orderModel(data);
		// await order.save();
		// return order;
		return orderModel.insertMany(data);
	},
};
export default orderService;
