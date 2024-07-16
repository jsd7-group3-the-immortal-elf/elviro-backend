import jwt from "jsonwebtoken";

export function sign(payload) {
	// console.log("Sign Token", process.env.JWT_SECRET);
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2 days" });
}

export function verify(token) {
	// console.log("Verify Token", process.env.JWT_SECRET);
	return jwt.verify(token, process.env.JWT_SECRET);
}
