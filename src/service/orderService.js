import orderModel from "../model/orderModel.js";

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
};
export default orderService;
