const express = require("express");
const hbs = require("express-handlebars");

const initDb = require("./models/index");

const carsService = require("./services/cars");

const { home } = require("./controllers/home");
const { about } = require("./controllers/about");
const create = require("./controllers/create");
const { notFound } = require("./controllers/notFound");
const { details } = require("./controllers/details");

start();

async function start() {
    await initDb();

    const app = express();

    app.engine(
        "hbs",
        hbs.create({
            extname: ".hbs",
        }).engine
    );
    app.set("view engine", "hbs");

    app.use(express.urlencoded({ extended: true }));
    app.use("/static", express.static("static"));
    app.use(carsService());

    app.get("/", home);
    app.get("/about", about);
    app.get("/details/:id", details);
    app.route("/create").get(create.get).post(create.post);

    app.all("*", notFound);

    app.listen(3000, () => console.log("Server started on port 3000..."));
}
