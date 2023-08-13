const { PORT } = require("./constants");
const { bindSwagger } = require("./helpers/swagger");
const { guardMiddleware } = require("./middlewares/guard-middleware");
const Fastify = require("fastify");

// init fastify app
const fastify = Fastify({
	logger: true,
});

// swagger: http://localhost:5000/documentation
bindSwagger(fastify);

// routers
fastify.register(require("./routes/items-routes"));

// cors
fastify.register(require("@fastify/cors"), (instance) => {
	return (req, callback) => {
		const corsOptions = {
			// This is NOT recommended for production as it enables reflection exploits
			origin: true,
		};
		// do not include CORS headers for requests from localhost
		if (/^localhost$/m.test(req.headers.origin)) {
			corsOptions.origin = false;
		}
		// callback expects two parameters: error and options
		callback(null, corsOptions);
	};
});

// middlewares
// fastify.addHook("onRequest", guardMiddleware);

// hooks
// https://fastify.dev/docs/latest/Reference/Hooks
fastify.addHook("preHandler", function (req, reply, done) {
	req.user = "Roy Test";
	done();
});
fastify.addHook("onResponse", function (req, reply, done) {
	console.log(">>> onResponse: ", reply.statusCode);
	done();
});

fastify.setErrorHandler(function (error, req, reply) {
	/**
	 * FST_ERR_BAD_STATUS_CODE:
	 * reply.code("bad status code");
	 *
	 * Custom error:
	 * throw new Error("dummy error");
	 */
	if (error instanceof Fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
		// Log error
		this.log.error(error);
		// Send error response
		reply.status(502).send({ ok: false });
	} else {
		// fastify will use parent error handler to handle this
		reply.send(error);
	}
});

// run the app
const start = async () => {
	try {
		await fastify.listen({ port: PORT });
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
};
start();

// for jest
module.exports = fastify;
