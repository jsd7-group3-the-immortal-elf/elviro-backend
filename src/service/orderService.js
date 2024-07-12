import mongoose from "mongoose";
import orderModel from "../model/orderModel.js";

const orderService = {
	async dataGetAllOrder() {
		return orderModel.find();
	},

	async dataGetUserId(data) {
		return orderModel.find({ "customer.customerId": data });
	},

	async dataGetUserOderId(userId) {
		// const inputUserId = `ObjectId('${userId}')`;
		// const OrderId = new mongoose.Types.ObjectId(orderId);
		return orderModel.findById(userId);
		// .populate("customer");
	},

	async dataCreateOrderData(data) {
		// const order = new orderModel(data);
		// await order.save();
		// return order;
		return orderModel.insertMany(data);
	},
};
export default orderService;
