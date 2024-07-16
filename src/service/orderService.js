// import mongoose from "mongoose";
import orderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";

const orderService = {
	async dataGetAllOrder() {
		return orderModel.find();
	},

	async dataGetUserId(data) {
		return orderModel.find({ "customer.customerId": data });
	},

	async dataGetUserOderId(userId, orderId) {
		// const inputUserId = `ObjectId('${userId}')`;
		// const OrderId = new mongoose.Types.ObjectId(orderId);
		const outAggregate = orderModel
			.find({
				"customer.customerId": userId,
				_id: orderId,
			})
			.populate("customer.customerId");
		// const user = await userModel.findById(userId).select("address");
		// const address = user.address;
		// const outAggregate = await orderModel.aggregate([
		// 	{
		// 		$match: {
		// 			"customer.customerId": new mongoose.Types.ObjectId(userId),
		// 			_id: new mongoose.Types.ObjectId(orderId),
		// 			// "customer.customerId": userId,
		// 			// _id: orderId,
		// 		},
		// 	},
		// 	{
		// 		$lookup: {
		// 			from: "users",
		// 			localField: "customer.customerId",
		// 			foreignField: "_id",
		// 			as: "customer",
		// 		},
		// 		// $project: {
		// 		// 	address: 1,
		// 		// },
		// 	},
		// ]);
		// ------------------------
		// .aggregate([
		// 	{
		// 		$match: {
		// 			"customer.customerId": ObjectId('668b6edc85daeb3a4220771a'),
		// 			_id: ObjectId('6690aba06e27230744df5fbd'),
		// 		},
		// 	},
		// 	{
		// 		$lookup: {
		// 			from: "users",
		// 			localField: "customer.customerId",
		// 			foreignField: "_id",
		// 			as: "customer.customerDetails",
		// 		}},{
		//     $project: {
		//         orderDate: 1,
		//         totalPrice: 1,
		//         status: 1,
		// 						createOn:1,
		//         "customer.customerId": 1,
		// 						"customer.customerDetails.address":1,

		//     }
		// 	},])

		// orders.aggregate([
		// 	{
		// 		$match: {
		// 			"customer.customerId": ObjectId("668b6edc85daeb3a4220771a"),
		// 			_id: ObjectId("6690aba06e27230744df5fbd"),
		// 		},
		// 	},
		// 	{
		// 		$lookup: {
		// 			from: "users",
		// 			localField: "customer.customerId",
		// 			foreignField: "_id",
		// 			as: "customer.customerDetails",
		// 		},
		// 	},
		// 	{
		// 		$project: {
		// 			orderDate: 1,
		// 			totalPrice: 1,
		// 			status: 1,
		// 			createOn: 1,
		// 			"customer.customerId": 1,
		// 			"customer.customerDetails.address": 1,
		// 		},
		// 	},
		// ]);
		return outAggregate;
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
