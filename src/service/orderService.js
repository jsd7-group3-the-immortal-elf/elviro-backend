import mongoose from "mongoose";
import orderModel from "../model/orderModel.js";

const orderService = {
	async getAllOrderService() {
		return await orderModel.aggregate([
			{
				$lookup: {
					from: "products",
					localField: "orderDetail.productId",
					foreignField: "_id",
					as: "orderDetail.productInfo",
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "customer.customerId",
					foreignField: "_id",
					as: "customer.customerInfo",
				},
			},
			{
				$unwind: "$orderDetail",
			},
			// {
			// 	$unwind: "$productInfo",
			// },
			// {
			// 	$unwind: "$orderDetail.productInfo",
			// },
			{
				$group: {
					_id: "$_id",
					totalPrice: { $sum: "$orderDetail.productInfo.price" },
					totalCost: { $sum: "$orderDetail.productInfo.cost" },
					createOn: { $first: "$createOn" },
					status: { $first: "$status" },
					customer: { $first: "$customer" },
				},
			},
			{
				$unwind: "$customer.customerInfo",
			},
			{
				$project: {
					createOn: 1,
					status: 1,
					totalPrice: 1,
					totalCost: 1,
					userId: "$customer.customerInfo._id",
					firstName: "$customer.customerInfo.profile.firstName",
					lastName: "$customer.customerInfo.profile.lastName",
				},
			},
			{ $sort: { createOn: -1 } },
		]);
	},

	async getOrderByIdService(orderId) {
		return await orderModel.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(`${orderId}`),
				},
			},
			{
				$lookup: {
					from: "products",
					localField: "orderDetail.productId",
					foreignField: "_id",
					as: "productInfo",
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "customer.customerId",
					foreignField: "_id",
					as: "customerInfo",
				},
			},
			{
				$unwind: "$productInfo",
			},
			{
				$group: {
					_id: "$_id",
					totalPrice: { $sum: "$productInfo.price" },
					totalCost: { $sum: "$productInfo.cost" },
					orderDetail: { $first: "$orderDetail" },
					productInfo: { $push: "$productInfo" },
					createOn: { $first: "$createOn" },
					status: { $first: "$status" },
					customer: { $first: "$customer" },
					customerInfo: { $first: "$customerInfo" },
				},
			},
			{
				$unwind: "$customerInfo",
			},
			{
				$project: {
					createOn: 1,
					status: 1,
					totalPrice: 1,
					totalCost: 1,
					orderDetail: 1,
					productInfo: 1,
					profile: "$customerInfo.profile",
					address: {
						$arrayElemAt: ["$customerInfo.address", 0],
					},
				},
			},
		]);
	},

	async browseOrderService(query) {
		return await orderModel.aggregate([
			{ $match: query },
			{
				$lookup: {
					from: "products",
					localField: "orderDetail.productId",
					foreignField: "_id",
					as: "orderDetail.productInfo",
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "customer.customerId",
					foreignField: "_id",
					as: "customer.customerInfo",
				},
			},
			{
				$unwind: "$orderDetail",
			},
			{
				$unwind: "$orderDetail.productInfo",
			},
			{
				$group: {
					_id: "$_id",
					totalPrice: { $sum: "$orderDetail.productInfo.price" },
					totalCost: { $sum: "$orderDetail.productInfo.cost" },
					createOn: { $first: "$createOn" },
					status: { $first: "$status" },
					customer: { $first: "$customer" },
				},
			},
			{
				$unwind: "$customer.customerInfo",
			},
			{
				$project: {
					createOn: 1,
					status: 1,
					totalPrice: 1,
					totalCost: 1,
					userId: "$customer.customerInfo._id",
					firstName: "$customer.customerInfo.profile.firstName",
					lastName: "$customer.customerInfo.profile.lastName",
				},
			},
			{ $sort: { createOn: -1 } },
		]);
	},

	async dataGetUserId(data) {
		return orderModel.find({ "customer.customerId": data });
	},

	async dataGetUserOderId(userId, orderId) {
		// const inputUserId = `ObjectId('${userId}')`;
		// const OrderId = new mongoose.Types.ObjectId(orderId);
		const order = orderModel.find({
			"customer.customerId": userId,
			_id: orderId,
		});
		const aggregate = orderModel.aggregate([
			{ $match: { "customer.customerId": userId } },
			{
				$lookup: {
					from: "User",
					localField: "customer.customerId",
					foreignField: "_id",
					as: "customer",
				},
			},
			{
				$project: {
					address: 1,
				},
			},
		]);
		return { order, aggregate };
		// .populate("customer");
	},

	async dataCreateOrderData(data) {
		// const order = new orderModel(data);
		// await order.save();
		// return order;
		return orderModel.insertMany(data);
	},

	async updateOrderService(orderId, status) {
		return orderModel.findByIdAndUpdate(orderId, { status: status });
	},
};
export default orderService;
