import userModel from "../model/userModel.js";
import {
	BadRequestError,
	UnAuthorizeError,
	NotFoundError,
} from "../utility/error.js";

export const getAllUsers = async (req, res, next) => {
	try {
		const allUsers = await userModel.find();
		res.status(200).json({
			message: "get all users success",
			data: allUsers,
		});
	} catch (error) {
		next(error);
	}
};

export const getUserById = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const user = await userModel.findById(userId);

		if (!user) {
			throw new NotFoundError(`User with id ${userId} is not found`);
		}

		res.status(200).json({
			message: `get user id ${userId} success`,
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const user = await userModel.findById(userId);

		if (!user) {
			throw new NotFoundError(`User with id ${productId} is not found`);
		}
		await userModel.findByIdAndUpdate(userId, {
			deleteOn: new Date().getTime(),
		});

		res.status(200).json({
			message: `delete id ${userId} success`,
			data: user,
		});
	} catch (error) {
		next(error);
	}
};
