import Joi from "joi";

//-----check ว่าต้อง validate อะไรเพิ่ม
//orderModel
const orderSchema = Joi.object({
	orderDate: Joi.date().default(() => new Date(), "current date"),
	orderDetail: Joi.array().items(
		Joi.object({
			productId: Joi.object({
				type: Joi.string(),
			}),
			quantity: Joi.number().required(),
		})
	),
	totalPrice: Joi.number().required(),
	customer: Joi.object({
		customerId,
	}),
});

//productModel
const productSchema = Joi.object({
	productName: Joi.string().required(),
	productImage: Joi.string().required(),
	rooms: Joi.array()
		.items(Joi.string().valid("Bedroom", "Living Room", "Kitchen"))
		.required(),
	category: Joi.string().valid("Bed", "Storage", "Table", "Seat").required(),
	price: Joi.number().min(0).required(),
	cost: Joi.number().min(0).required(),
	stock: Joi.number().min(0).required(),
	color: Joi.string().required(),
	dimension: Joi.object({
		width: Joi.number().min(0).required(),
		depth: Joi.number().min(0).required(),
		depthExtend: Joi.number().default(0),
		height: Joi.number().min(0).required(),
	}).required(),
	warranty: Joi.number().min(0).required(),
	description: Joi.string().required(),
	isPublish: Joi.boolean().default(true),
	createOn: Joi.date().default(() => new Date(), "current date"),
	deleteOn: Joi.date().default(null),
});

//userModel
const userSchema = Joi.object({
	profile: Joi.object({
		firstName: Joi.string().required,
		lastName: Joi.string().required,
		image: Joi.string(),
		email: Joi.string().required,
		phone: Joi.string(),
	}),
	address: Joi.array().items(
		Joi.object({
			firstNameAdr: Joi.string().required,
			lastNameAdr: Joi.string().required,
			phoneAdr: Joi.string().required,
			address: Joi.string().required,
			province: Joi.string().required,
			district: Joi.string().required,
			subDistrict: Joi.string().required,
			postalCode: Joi.string().required,
			default: Joi.boolean().default(false),
		})
	),
	account: Joi.object({
		username: Joi.string(),
		password: Joi.string().required,
	}),
	cardInfo: Joi.object({
		cardNumber: Joi.string(),
		cardName: Joi.string(),
		expiryDate: Joi.string(),
		cvv: Joi.string().min(3).max(3),
	}),
	cart: Joi.array().items(
		Joi.object({
			productId: Joi.string().required,
			quantity: Joi.number().min(0),
			isChecked: Joi.boolean.default(false),
		})
	),
	createOn: Joi.object({
		type: Joi.date(),
		default: Joi.date()
			.timestamp()
			.default(() => Date.now(), "current timestamp"), //เช็คอีกที
	}),
	deleteOn: Joi.object({
		type: Joi.date(),
		default: Joi.date().allow(null).default(null),
	}),
	isAdmin: Joi.object({
		type: Joi.boolean().default(false),
	}),
});

//----validate---//

//รอ orderModel
const validateOrder = async (date) => {
	return orderSchema.validate(data);
};
const validateProduct = async (date) => {
	return productSchema.validate(data);
};
const validateUser = async (date) => {
	return userSchema.validate(data);
};

export { validateOrder, validateProduct, validateUser };
