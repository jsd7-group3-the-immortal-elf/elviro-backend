import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	productName: {
		type: String,
		required: true,
	},
	productImage: {
		type: String,
		required: true,
	},
	rooms: {
		type: [String],
		enum: ["Bedroom", "Living Room", "Kitchen"],
		require: true,
	},
	catagory: {
		type: String,
		enum: ["Bed", "Storage", "Table", "Seat"],
		required: true,
	},
	price: {
		type: Number,
		min: 0,
		required: true,
	},
	cost: {
		type: Number,
		min: 0,
		required: true,
	},
	stock: {
		type: Number,
		min: 0,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
	dimension: {
		width: {
			type: Number,
			min: 0,
			required: true,
		},
		depth: {
			type: Number,
			min: 0,
			required: true,
		},
		depthExtend: {
			type: Number,
			default: 0,
		},
		height: {
			type: Number,
			min: 0,
			required: true,
		},
	},
	warranty: {
		type: Number,
		min: 0,
		require: true,
	},
	description: {
		type: String,
		required: true,
	},
	isPublish: {
		type: Boolean,
		default: true,
	},
	createOn: {
		type: Date,
		default: new Date().getTime(),
	},
	deleteOn: {
		type: Date,
		default: null,
	},
});

export default mongoose.model("Product", productSchema);
