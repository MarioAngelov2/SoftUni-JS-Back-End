const fs = require("fs");
const path = require("path");
const db = require("../db.json");

class Cube {
  constructor(name, description, imageUrl, diffciultyLevel) {
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.diffciultyLevel = diffciultyLevel;
  }

  static save(cube) {
    db.cubes.push(cube);
    const jsonData = JSON.stringify(db, null, 2);
    fs.writeFileSync(path.resolve(__dirname, "../db.json"), jsonData);
  }
}

module.exports = Cube;
