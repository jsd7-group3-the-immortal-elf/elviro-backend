import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
	orderDate: { type: Date, default: new Date().getTime() },
	orderDetail: [
		{
			productId: { type: String, request: true },
			quantity: { type: Number, request: true },
		},
	],
	totalPrice: { type: Number, request: true },
	customer: {
		customerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			request: true,
		},
		addressIndex: { type: Number, request: true },
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

export default mongoose.model("order", orderSchema);
