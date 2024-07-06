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
		{
			firstNameAdr: { type: String, required: true },
			lastNameAdr: { type: String, required: true },
			phoneAdr: { type: String, default: phone },
			address: { type: String, required: true },
			province: { type: String, required: true },
			district: { type: String, required: true },
			subDistrict: { type: String, required: true },
			postalCode: { type: String, required: true },
			default: { type: Boolean, default: false },
		},
	],
	account: {
		username: { type: String, required: true },
		password: { type: String, required: true },
	},
	cardInfo: {
		cardNumber: { type: String },
		cardName: { type: String },
		expiryDate: { type: String, required: true },
		cvv: { type: String, minLength: 3, maxLength: 3, required: true },
	},
	cart: {
		productId: { type: String, required: true },
		quantity: { type: Number, min: 0, required: true },
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

export default mongoose.model("User", userSchema);
