const guardMiddleware = (req, reply, done) => {
	const msg = "apiKey is required to access the endpoint";
	if (!req.headers["apikey"] || req.headers["apikey"] !== "123456") {
		reply.code(401).send(msg);
	} else {
		done();
	}
};

module.exports = { guardMiddleware };
