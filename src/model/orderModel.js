import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
	createOn: {
		type: Date,
		default: new Date().getTime(),
	},
	orderDetail: [
		{
			productId: {
				type: String,
				request: true,
			},
			quantity: {
				type: Number,
				request: true,
			},
		},
	],
	totalPrice: {
		type: Number,
		request: true,
	},
	customer: {
		customerId: {
			type: String,
			request: true,
		},
		addressIndex: {
			type: Number,
			request: true,
		},
	},
	status: {
		type: String,
		enum: [
			"Pending",
			"Confirmed",
			"Processing",
			"Picked",
			"Shipped",
			"Delivered",
			"Cancelled",
		],
		default: "Pending",
	},
});

export default mongoose.model("Order", orderSchema);
