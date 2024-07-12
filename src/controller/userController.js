import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

export const createUser = async (req, res, next) => {
	try {
		const { profile, account } = req.body;

		if (!profile || !account) {
			throw new BadRequestError("All field is require");
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(account.password, salt);

		const user = new userModel({
			profile,
			account: { ...account, password: hashedPassword },
		});

		await user.save();

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
		const { password, ...accountFileds } = account;
		console.log(req.body);

		const user = await userModel.findById(userId);
		console.log(userId);

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
		buildUpdateData(accountFileds, "account.");

		buildUpdateData(editUser);
		console.log("Update Data:", updateData);

		const updatedUser = await userModel.findByIdAndUpdate(
			userId,
			{ $set: updateData },
			{ new: true, runValidators: true }
		);

		res.status(200).json({
			message: `update user with id ${userId} success`,
			user: updatedUser,
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
			throw new NotFoundError(`User with id ${userId} is not found`);
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

export const userLogin = async (req, res, next) => {
	try {
		const { username, password } = req.body.account;
		// console.log('boyd',req.body);
		// console.log("send", username, password);
		const user = await userModel.findOne({ "account.username": username });
		// console.log('password', user.account.password)
		if (!user) {
			throw new UnAuthorizeError(`Ueser ${username} is not found`);
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
