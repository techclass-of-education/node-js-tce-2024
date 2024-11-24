const express = require("express");
const path = require("path");
const router = express.Router();

const Person = require("../database/models/Person");


router.get("/", (req, res) => {
  res.send("register.html");
});
router.post("/save", async (req, res) => {   // http://localhost:8000/reg/save
console.log(req)
  // const formData = req.body;
  // console.log(formData);
  // const person = await Person.create(formData);
  // console.log(person.dataValues);
  res.send("helloo")

  // res.render("succssReg", { formData: person.dataValues });

});
module.exports = router;
