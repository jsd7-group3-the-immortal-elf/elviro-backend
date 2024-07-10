import mongoose from "mongoose";
import orderModel from "../model/orderModel.js";

const orderService = {
	async dataGetAllOrder() {
		return orderModel.find();
	},

	async dataGetUserId(data) {
		return orderModel.find({ "customer.customerId": data });
	},

	async dataGetUserOderId(inputObjectId, OderId) {
		return orderModel.find({ "customer.customerId": data });
	},

	async dataCreateOrderData(data) {
		// const order = new orderModel(data);
		// await order.save();
		// return order;
		return orderModel.insertMany(data);
	},
};
export default orderService;
