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
        fs.writeFile(filePath, JSON.stringify(data, null, 2));
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

async function getAll(query) {
    const data = await read();
    let cars = Object.entries(data).map(([id, v]) =>
        Object.assign({}, { id }, v)
    );

    if (query.search) {
        cars = cars.filter((c) =>
            c.name.toLowerCase().includes(query.search.toLowerCase())
        );
    }
    if (query.from) {
        cars = cars.filter((c) => c.price >= Number(query.from));
    }
    if (query.to) {
        cars = cars.filter((c) => c.price <= Number(query.to));
    }

    return cars;
}

async function createCar(car) {
    const cars = await read();

    let id;

    do {
        id = generateId();
    } while (cars.hasOwnProperty(id));

    cars[id] = car;

    await write(cars);
}

function generateId() {
    return "xxxxxxxx-xxxx".replace(/x/g, () =>
        ((Math.random() * 16) | 0).toString(16)
    );
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createCar,
    };
    next();
};
