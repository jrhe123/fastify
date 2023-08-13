const app = require("../server")

function build() {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(() => app.close());

    return app;
}

module.exports = {
    build
}