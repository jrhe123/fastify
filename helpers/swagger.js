const swg = {
	bindSwagger: (fastify) => {
		fastify.register(
			require("@fastify/swagger", {
				swagger: {
					info: {
						title: "Test swagger",
						description: "Testing the Fastify swagger API",
						version: "0.1.0",
					},
					externalDocs: {
						url: "https://swagger.io",
						description: "Find more info here",
					},
					host: "localhost",
					schemes: ["http"],
					consumes: ["application/json"],
					produces: ["application/json"],
					tags: [
						{ name: "user", description: "User related end-points" },
						{ name: "code", description: "Code related end-points" },
					],
					definitions: {
						User: {
							type: "object",
							required: ["id", "email"],
							properties: {
								id: { type: "string", format: "uuid" },
								firstName: { type: "string" },
								lastName: { type: "string" },
								email: { type: "string", format: "email" },
							},
						},
					},
					securityDefinitions: {
						apiKey: {
							type: "apiKey",
							name: "apiKey",
							in: "header",
						},
					},
				},
			})
		);
		fastify.register(require("@fastify/swagger-ui"), {
			routePrefix: "/documentation",
			uiConfig: {
				docExpansion: "full",
				deepLinking: false,
			},
			uiHooks: {
				onRequest: function (request, reply, next) {
					next();
				},
				preHandler: function (request, reply, next) {
					next();
				},
			},
			staticCSP: true,
			transformStaticCSP: (header) => header,
			transformSpecification: (swaggerObject, request, reply) => {
				return swaggerObject;
			},
			transformSpecificationClone: true,
		});
	},
};

module.exports = swg;
