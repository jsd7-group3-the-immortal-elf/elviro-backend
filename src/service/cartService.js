import mongoose from "mongoose";
import userModel from "../model/userModel.js";

export async function getCartByUserService(userId) {
	return await userModel.aggregate([
		{
			$match: {
				_id: new mongoose.Types.ObjectId(`${userId}`),
			},
		},
		{
			$unwind: "$cart",
		},
		{
			$lookup: {
				from: "products",
				localField: "cart.productId",
				foreignField: "_id",
				as: "productDetail",
			},
		},
		{
			$project: {
				cart: 1,
				productDetail: 1,
			},
		},
		{ $sort: { "cart.createOn": -1 } },
	]);
}

export async function browseCartByUserService(userId) {
	return await userModel.aggregate([
		{
			$unwind: "$cart",
		},
		{
			$match: {
				_id: new mongoose.Types.ObjectId(`${userId}`),
				"cart.isChecked": true,
			},
		},
		{
			$lookup: {
				from: "products",
				localField: "cart.productId",
				foreignField: "_id",
				as: "productDetail",
			},
		},
		{
			$project: {
				cart: 1,
				productDetail: 1,
			},
		},
		{ $sort: { "cart.createOn": -1 } },
	]);
}

export async function createCartService(userId, productId, quantity) {
	return userModel.findByIdAndUpdate(
		userId,
		{
			$push: {
				cart: {
					productId: new mongoose.Types.ObjectId(`${productId}`),
					quantity: quantity,
				},
			},
		},
		{ new: true, runValidators: true } //new คือ return ค่าที่ update โดยตามกฎ validator
	);
}

export async function updateCart(id, data) {}

export async function deleteProductsByCart(id) {}
