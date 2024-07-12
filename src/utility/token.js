import jwt from "jsonwebtoken";

export const sign = (payload) => {
	console.log("Sign Token", process.env.JWT_SECRET);
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2 days" });
};

export const verify = (token) => {
	console.log("Verify Token", process.env.JWT_SECRET);
	return jwt.verify(token, process.env.JWT_SECRET);
};
