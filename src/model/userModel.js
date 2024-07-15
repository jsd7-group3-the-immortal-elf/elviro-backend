import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	profile: {
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		image: { type: String },
		email: { type: String, required: true },
		phone: { type: String },
	},
	address: [
		{
			firstNameAdr: { type: String },
			lastNameAdr: { type: String },
			phoneAdr: { type: String },
			address: { type: String },
			province: { type: String },
			district: { type: String },
			subDistrict: { type: String },
			postalCode: { type: String },
			default: { type: Boolean, default: false },
		},
	],
	account: {
		username: { type: String },
		password: { type: String, required: true },
	},
	cardInfo: {
		cardNumber: { type: String },
		cardName: { type: String },
		expiryDate: { type: String },
		cvv: { type: String, minLength: 3, maxLength: 3 },
	},
	cart: [
		{
			productId: { type: String },
			quantity: { type: Number, min: 0 },
			isChecked: { type: Boolean, default: false },
		},
	],
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

export default mongoose.model("User", userSchema);
