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
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
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
		required: true,
	},
	payment: {
		type: String,
		required: true,
	},
	customer: {
		customerId: {
			type: mongoose.Schema.Types.ObjectID,
			ref: "users",
			required: true,
		},
		addressIndex: {
			type: Number,
			required: true,
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
