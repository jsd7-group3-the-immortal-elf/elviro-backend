import userModel from "../model/userModel.js";

export async function getAllUserService() {
	return await userModel.find();
}

export async function getUserByIdService(userId) {
	return await userModel.findById(userId);
}

export async function createUserService(data) {
	const user = new userModel(data);
	await user.save();

	return user;
}

export async function updateUserService(userId, updateData) {
	return userModel.findByIdAndUpdate(userId, { $set: updateData });
}

export async function deleteUserService(userId) {
	return userModel.findByIdAndUpdate(userId, {
		deleteOn: new Date().getTime(),
	});
}

export async function loginService(username) {
	const userUsername = await userModel.findOne({
		"account.username": username,
	});

	if (userUsername) {
		return userUsername;
	}
	return userModel.findOne({ "profile.email": username });
}
