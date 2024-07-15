import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
	BadRequestError,
	UnAuthorizeError,
	NotFoundError,
} from "../utility/error.js";
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

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(account.password, salt);

		const data = {
			profile,
			account: { ...account, password: hashedPassword },
		};

		const user = await createUserService(data);

		res.status(201).json({
			message: `Create user success`,
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

export const updateUser = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const { account = {}, ...editUser } = req.body;
		const { password, ...accountFields } = account;

		const user = await getUserByIdService(userId);

		if (!user) {
			throw new NotFoundError(`User with id ${userId} is not found`);
		}

		const updateData = {};

		if (password) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			updateData["account.password"] = hashedPassword;
		}

		const buildUpdateData = (data, prefix = "") => {
			for (const key in data) {
				if (
					typeof data[key] === "object" &&
					data[key] !== null &&
					!Array.isArray(data[key])
				) {
					buildUpdateData(data[key], `${prefix}${key}.`);
				} else {
					updateData[`${prefix}${key}`] = data[key];
				}
			}
		};
		buildUpdateData(accountFields, "account.");

		buildUpdateData(editUser);

		await updateUserService(userId, updateData);

		res.status(200).json({
			message: `update user with id ${userId} success`,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const user = await getUserByIdService(userId);

		if (!user) {
			throw new NotFoundError(`User with id ${userId} is not found`);
		}

		await deleteUserService(userId);

		res.status(200).json({
			message: `delete id ${userId} success`,
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

export const userLogin = async (req, res, next) => {
	try {
		const { username, password } = req.body.account;

		const user = await loginService(username);
		// user / password ผิด

		if (!user) {
			throw new UnAuthorizeError(`User ${username} is not found`);
		}
		const isPasswordValid = await bcrypt.compare(
			password,
			user.account.password
		);
		if (!isPasswordValid) {
			throw new UnAuthorizeError(
				`Password for user ${username} dose not match`
			);
		}
		const payload = { id: user._id, username: user.account.username };

		const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "36000m",
		});
		res.status(200).json({
			message: `login user ${user.account.username} success`,
			data: user.account,
			accessToken,
		});
	} catch (error) {
		next(error);
	}
};
