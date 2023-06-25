const fs = require("fs/promises");

const filePath = "./services/data.json";

async function read() {
    try {
        const file = await fs.readFile(filePath);
        return JSON.parse(file);
    } catch (error) {
        console.error("Database read error");
        console.error(error);
        process.exit(1);
    }
}

async function write(data) {
    try {
        fs.writeFile(filePath, JSON.stringify(data));
    } catch (error) {
        console.error("Database write error");
        console.error(error);
        process.exit(1);
    }
}

async function getById(id) {
    const data = await read();
    const car = data[id];

    if (car) {
        return Object.assign({}, { id }, car);
    } else {
        undefined;
    }
}

async function getAll() {
    const data = await read();
    return Object.entries(data).map(([id, v]) => Object.assign({}, { id }, v));
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
    };
    next();
};
