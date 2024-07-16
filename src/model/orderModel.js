import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
	createOn: {
		type: Date,
		default: new Date().getTime(),
	},
	orderDetail: [
		{
			productId: {
				type: mongoose.Schema.Types.ObjectID,
				ref: "products",
				request: true,
			},
			quantity: {
				type: Number,
				request: true,
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
		},
	],
	totalPrice: {
		type: Number,
		request: true,
	},
	payment: {
		type: String,
		request: true,
	},
	customer: {
		customerId: {
			type: mongoose.Schema.Types.ObjectID,
			ref: "users",
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

export default mongoose.model("orders", orderSchema);
