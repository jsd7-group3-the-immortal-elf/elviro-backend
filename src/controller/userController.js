import { hashPassword, comparePassword } from "../utility/hash.js";
import { sign } from "../utility/token.js";
import { BadRequestError, NotFoundError } from "../utility/error.js";
import {
	getAllUserService,
	getUserByIdService,
	createUserService,
	updateUserService,
	deleteUserService,
	loginService,
} from "../service/userService.js";

export const getAllUsers = async (req, res, next) => {
	try {
		const allUsers = await getAllUserService();

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
		const user = await getUserByIdService(userId);

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

export const createUser = async (req, res, next) => {
	try {
		const { profile, account } = req.body;

		if (!profile || !account) {
			throw new BadRequestError("All field is require");
		}

		const hashedPassword = await hashPassword(account.password);

		console.log(hashedPassword);

		const data = {
			profile,
			account: { ...account, password: hashedPassword },
		};

		await createUserService(data);

		res.status(201).json({
			message: `Create user success`,
		});
	} catch (error) {
		next(error);
	}
};

export const userLogin = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await loginService(email);
		if (!user) {
			throw new BadRequestError(`username/email or password is invalid`);
		}

		const isPasswordValid = await comparePassword(
			password,
			user.account.password
		);
		if (!isPasswordValid) {
			throw new BadRequestError(`username/email or password is invalid`);
		}

		const payload = {
			id: user._id,
			isAdmin: user.isAdmin,
		};
		const token = sign(payload);

		res
			// .cookie("access_token", token)
			.cookie("access_token", token, { httpOnly: true })
			.status(200)
			.json({
				message: `login success`,
				access_token: token,
			});
	} catch (error) {
		next(error);
	}
};

export const updateUser = async (req, res, next) => {
	try {
		// cookie > token > verify > id > findbyid > canedit
		// user edit token?
		const { user } = req;
		const { ...editUser } = req.body;

		// const { account = {}, ...editUser } = req.body;
		// const { password, ...accountFields } = account;

		// const updateData = {};

		if (editUser.account.password) {
			editUser.account.password = await hashPassword(editUser.account.password);
		}

		// const buildUpdateData = (data, prefix = "") => {
		// 	for (const key in data) {
		// 		if (
		// 			typeof data[key] === "object" &&
		// 			data[key] !== null &&
		// 			!Array.isArray(data[key])
		// 		) {
		// 			buildUpdateData(data[key], `${prefix}${key}.`);
		// 		} else {
		// 			updateData[`${prefix}${key}`] = data[key];
		// 		}
		// 	}
		// };
		// buildUpdateData(accountFields, "account.");
		// buildUpdateData(editUser);

		await updateUserService(user._id, editUser);

		res.status(200).json({
			message: `update user success`,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (req, res, next) => {
	try {
		const { user } = req;

		await deleteUserService(user._id);

		res.status(200).json({
			message: `delete user success`,
		});
	} catch (error) {
		next(error);
	}
};
