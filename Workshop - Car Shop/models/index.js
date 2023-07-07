const mongoose = require("mongoose");

const Car = require("./Car");

const connectionString = "mongodb://localhost:27017/carbicle";

async function init() {
    try {
        mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected");

        mongoose.connection.on("error", (err) => {
            console.error("Database error");
            console.log(err);
        });
    } catch (error) {
        console.error("Error connecting to database");
        process.exit(1);
    }
}

module.exports = init;
