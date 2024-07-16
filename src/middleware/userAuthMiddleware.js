import { verify } from "../utility/token.js";
import { UnAuthorizeError } from "../utility/error.js";
import { getUserByIdService } from "../service/userService.js";

const authenticateMiddleware = async (req, res, next) => {
	try {
		const token = req.cookies.access_token;
		console.log("user_token", token);
		if (!token) throw new UnAuthorizeError("Unauthenticated");

		const decoded = verify(token);
		console.log("user_decoded", decoded);
		const user = await getUserByIdService(decoded.id);
		console.log("user_user", user);
		if (!user) throw new UnAuthorizeError("Unauthenticated");

		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};

export default authenticateMiddleware;
