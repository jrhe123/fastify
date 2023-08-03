const fs = require("fs");
const path = require("path");

const cmn = {
	isPathExist: (filePath) => {
		return fs.existsSync(path.resolve(__dirname, filePath));
	},
};
module.exports = cmn;
