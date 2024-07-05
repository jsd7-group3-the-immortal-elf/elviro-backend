import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	profile: {
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		image: { type: String },
		email: { type: String, required: true },
		phone: { type: String, required: true },
	},
	address: [
		{ firstNameAdr: { type: String, default: firstName } },
		{ lastNameAdr: { type: String, default: lastName } },
		{ phoneAdr: { type: String, default: phone } },
		{ street: { type: String, required: true } },
		{ province: { type: String, required: true } },
		{ district: { type: String, required: true } },
		{ subDistrict: { type: String, required: true } },
		{ postalCode: { type: String, required: true } },
		{ default: { type: Boolean, default: true } },
	],
	account: {
		username: { type: String, required: true },
		password: { type: String, required: true },
	},
	cardInfo: {
		cardNumber: { type: String },
		cardName: { type: String },
		expiryDate: { type: Dat, default: new Date().getTime() },
		cvv: { type: String, min: 0, max: 0, required: true },
	},
	cart: {
		productId: { type: String, required: true },
		quantity: { type: Number, required: true },
		isChecked: { type: Boolean, default: false },
	},
	createOn: {
		type: Date,
		default: new Date().getTime(),
	},
	deleteOn: {
		type: Date,
		default: null,
	},
	isAdmin: { type: Boolean, default: false },
});

export default mongoose.model("Product", productSchema);
