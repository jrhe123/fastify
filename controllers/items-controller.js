const { v4: uuidv4 } = require("uuid");
let items = require("../dummy_data/Items");

const getItems = (req, reply) => {
	// console.log("req.user: ", req.user);
	reply.send(items);
};

const getItem = (req, reply) => {
	const { id } = req.params;
	const item = items.find((item) => item.id === id);
	if (!item) {
		reply.code(404).send()
		return
	}
	reply.send(item);
};

const addItem = (req, reply) => {
	const { name } = req.body;
	const item = {
		id: uuidv4(),
		name,
	};
	items = [...items, item];
	reply.code(201).send(item);
};

const deleteItem = (req, reply) => {
	const { id } = req.params;
	items = items.filter((item) => item.id !== id);
	reply.send({
		message: `Item ${id} has been deleted`,
	});
};

const updateItem = (req, reply) => {
	const { id } = req.params;
	const { name } = req.body;

	const index = items.findIndex((item) => item.id === id);
	if (index === -1) {
		reply.status(403).send({ msg: "not found" });
	}

	items = items.map((item) => (item.id === id ? { id, name } : item));

	const item = items.find((item) => item.id === id);
	reply.send(item);
};

module.exports = {
	getItems,
	getItem,
	addItem,
	deleteItem,
	updateItem,
};
