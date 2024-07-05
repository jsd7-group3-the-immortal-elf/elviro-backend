export class BadRequestError extends Error {
	constructor(message) {
		super(message);
		this.name = "BadRequestError";
		this.status = 400;
	}
}

export class UnAuthorizeError extends Error {
	constructor(message) {
		super(message);
		this.name = "UnAuthorizeError";
		this.status = 401;
	}
}

export class NotFoundError extends Error {
	constructor(message) {
		super(message);
		this.name = "NotFound";
		this.status = 404;
	}
}
