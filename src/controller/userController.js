import userModel from "../model/userModel.js";

const getAllUsers = async (req, res) => {
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

export default getAllUsers;