import userModel from "../model/userModel.js";
import {
	getCartByUserService,
	browseCartByUserService,
	createCartService,
} from "../service/cartService.js";
import { BadRequestError, NotFoundError } from "../utility/error.js";

export const getCartByUser = async (req, res, next) => {
	try {
		const userId = req.user._id;

		const cart = await getCartByUserService(userId);

		return res.status(200).json({
			message: "Get the cart successful.",
			data: cart,
		});
	} catch (error) {
		res.status(404).json({ message: "Cart not found." });
		next(error);
	}
};

export const browseCartByUser = async (req, res, next) => {
	try {
		const { query } = req;
		if (Object.keys(query).length === 0) {
			return next();
		}

		const userId = req.user._id;
		const cart = await browseCartByUserService(userId);

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
		const user = await getCartByUserService(userId);
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
		const updatedUser = createCartService(data);

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
