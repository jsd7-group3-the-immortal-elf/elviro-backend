import { verify } from "../utility/token.js";
import { UnAuthorizeError } from "../utility/error.js";
import { getUserByIdService } from "../service/userService.js";

const authenticateMiddleware = async (req, res, next) => {
	try {
		const token = req.cookies.access_token;
		if (!token) throw new UnAuthorizeError("Unauthenticated");

		const decoded = verify(token);
		const user = await getUserByIdService(decoded.id);
		if (!user) throw new UnAuthorizeError("Unauthenticated");
		if (!user.isAdmin) throw new UnAuthorizeError("Unauthenticated");

		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};

export default authenticateMiddleware;
