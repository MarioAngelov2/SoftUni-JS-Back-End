const router = require("express").Router();

const cubeController = require("./controllers/cubeController");
const homeController = require("./controllers/homeController");

router.get("/", homeController.homeController);

router.get("/about", homeController.aboutController);

router.get("/create", cubeController.getCreateCube);

router.post("/create", cubeController.postCreateCube);

module.exports = router;
