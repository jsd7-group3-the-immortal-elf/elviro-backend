// import cartService from "../service/cartService.js";
import userModel from "../model/userModel.js";
import {
	BadRequestError,
	UnAuthorizeError,
	NotFoundError,
} from "../utility/error.js";

//---ถ้าไม่สร้างค่อยลบออก ไว้ดัก error
// import NotFoundError from '../error/NotFoundError.js';
// import BadRequestError from '../error/BadRequestError.js';

//API - 1 Get all products in each user's cart
export const getCartByUser = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const user = await userModel.findById(userId); //function หลัก
		const { cart } = user;
		return res.status(200).json({
			message: "Get the cart successful.",
			data: cart,
		});
	} catch (error) {
		res.status(404).json({ message: "Cart not found." });
		next(error);
	}
};

//API - 2 Create a new cart
export const createCart = async (req, res, next) => {
	try {
		//---ประกาศค่า---
		const { userId } = req.params;
		const { productId, quantity } = req.body;

		//Check ว่าใส่ค่าหมด
		if (!productId || !quantity) {
			throw new BadRequestError("ProductID and quantity are required.");
		}

		//ดึงค่า user โดยใช้ findById
		const user = await userModel.findById(userId);
		if (!user) {
			throw new NotFoundError("User not found");
		}

		//กำหนด cart---> คือ user.cart
		const { cart } = user;

		cart.forEach((item) => {
			if (item.productId === productId) {
				next();
			}
		});

		//ยัดค่าใหม่ใส่เข้าไปใน cart ของ user โดยไม่ต้องใส่ field อื่นนอกจาก cart
		const updatedUser = await userModel.findByIdAndUpdate(
			userId,
			{ $push: { cart: { productId: productId, quantity: quantity } } },
			{ new: true, runValidators: true } //new คือ return ค่าที่ update โดยตามกฎ validator
		);

		return res.status(201).json({
			message: "Create Cart Success",
			data: updatedUser,
		});
	} catch (error) {
		next(error);
	}
};

//API - 3 Add new products into a cart
export const updateCart = async (req, res, next) => {
	try {
		//---ประกาศค่า---
		const { userId } = req.params;

		const { productId, quantity } = req.body;

		//Check ว่าใส่ค่าหมด
		if (!productId || !quantity) {
			throw new BadRequestError("ProductID and quantity are required.");
		}

		//ดึงค่า user โดยใช้ findById
		const user = await userModel.findById(userId);
		if (!user) {
			throw new NotFoundError("User not found");
		}

		const { cart } = user;
		// user.cart.quantity = quantity
		//ไล่ดู object แต่ละตัวใน array ของ cart ว่า--ตัวไหนมี product id ตรงกัน--ให้แทน quantity อันใหม่เข้าไป
		cart.forEach((item) => {
			if (item.productId == productId) {
				item.quantity = quantity;
			}
		});

		console.log(user);
		await user.save();

		res.status(200).json({
			message: "Update Cart Success",
			data: cart,
		});
	} catch (error) {
		next(error);
	}
};

//API - 4 Delete products from cart
export const deleteProductsByCart = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const { productIdArray } = req.body; //ส่ง productId มาเป็น array
		console.log(productIdArray);
		//update โดยการลบออกและ save ในตัว
		const user = await userModel.findById(userId);
		if (!user) {
			throw new NotFoundError("User not found");
		}
		if (!user) {
			throw new NotFoundError("User not found");
		}

		const updatedUser = await userModel.findByIdAndUpdate(
			userId,
			{
				$pull: {
					cart: { productId: { $in: productIdArray } },
				},
			},
			{ new: true } // Return the updated document
		);

		return res.status(200).json({
			message: "Update Cart Success: an item deleted",
			data: user.cart,
		});
	} catch (error) {
		next(error);
	}
};
