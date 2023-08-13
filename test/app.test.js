const request = require("supertest");
const { build }  = require("../helpers")

const app = build()

test("GET /items -> array items", async () => {
    const response = await app.inject({
        url: "/items",
    });
    const json = await response.json()
    expect(json).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(String),
                name:  expect.any(String),
            })
        ])
    );
})

// it("GET /items -> validate response body", () => {
    
// })

test("GET /items/:id -> specific item by id", async () => {
    const response = await app.inject({
        url: "/items/123",
    });
    expect(response.statusCode).toEqual(404)
})

// it("GET /items/:id -> 404 not found", () => {

// })

// it("POST /items/:id -> create item", () => {

// })