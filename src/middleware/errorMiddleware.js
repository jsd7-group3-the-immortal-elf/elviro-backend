export default errorMiddleware = (err, _req, res, _next) => {
	res.status(err.status || 500).json({
		status: "error",
		message: err.message,
		field: err.field,
	});
};
