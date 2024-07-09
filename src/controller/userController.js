import userModel from "../model/userModel.js";

export const getAllUsers = async (req, res) => {
	try {
		const allUsers = await userModel.find();
		res.status(200).json({
			message: "get all users success",
			data: allUsers,
		});
	} catch (error) {
		res.status(404).json({
			message: "get all user failed",
		});
	}
};

export const getUserById = async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await userModel.findById(userId);

		res.status(200).json({
			message: `get user id ${userId} success`,
			data: user,
		});
	} catch (error) {
		res.status(404).json({
			message: "get user failed",
		});
	}
};

export const deleteUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await userModel.findById(userId);

		if (!user) {
			res.status(404).json({ message: `User {$userId} not found!` });
		}
		await userModel.findByIdAndUpdate(userId, {
			deleteOn: new Date().getTime(),
		});

		res.status(200).json({
			message: `delete id ${userId} success`,
			data: user,
		});
	} catch (error) {
		res.status(404).json({
			message: "delete user failed",
			error: error.message,
		});
	}
};
