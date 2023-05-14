const Cube = require("../models/Cube");

exports.getCreateCube = (req, res) => {
  res.render("create");
};

exports.postCreateCube = (req, res) => {
  let cube = new Cube(req.body);

  //save data
  Cube.save(cube);

  //redirect
  res.redirect("/");
};
