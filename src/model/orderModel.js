import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
	orderDat: { type: Date, default: new Date().getTime() },
	orderDetail: {
		productId: { type: Number, request: true },
		quantity: { type: Number, request: true },
	},
	totalPrice: { type: Number, request: true },
	customer: {
		customerId: { type: Number, request: true },
		addressIndex: { type: Number, request: true },
	},
	status: {
		type: String,
		enum: [
			"Pending",
			"Cancelled",
			"Processing",
			"picked",
			"Shipped",
			"ComPlete",
		],
		default: "Pending",
	},
});

module.exports = mongoose.model("order", orderSchema);
