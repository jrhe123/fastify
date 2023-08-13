const request = require("supertest");
const fastify = require("../server");

afterAll(() => fastify.close());

test("GET `/` items", async () => {
	await fastify.ready();

	const response = await request(fastify.server)
		.get("/items/1")
		.expect(200)
		.expect("Content-Type", "application/json; charset=utf-8");

	expect(response.body).toEqual({ id: "1", name: "Item 1" });
});
