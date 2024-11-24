const express = require("express");
const path = require("path");
const router = express.Router();
const mysql = require("mysql2");
const Person = require("../database/models/Person");
const Employee = require("../database/models/Employee");
// router.get("/", (req, res) => {
//   res.sendFile(path.join(process.cwd(), "pages", "login.html"));
// });

 // this loginPerson must inside session object
router.post("/", async (req, res) => {
  const formData = req.body;
  const email = formData.email;
  const password = formData.password;

  try {
    const loginPerson = await Person.findOne({
      // raw:true,// convert result into array of objects
      where: { email: email, password: password },
    });

    req.session.loginPerson=loginPerson
    req.session.isLogin=true
    
 
    res.status(200).json(loginPerson)
  } catch (err) {
    console.log("Database query error:", err);
    res.status(500);
    res.send("Internal Server Error");
  }
});


router.get("/",async(req,res)=>
{
  const resultAllData = await Person.findAll();
  // const name=req.get("cookie")
 
  // console.log(name)
  if (resultAllData.length >0) {
    res.status(200).json(resultAllData)
  
  } else {
    res.status(500).json({error:"Error in fetching data"})
  }
})


router.get("/forienKeyFetch", async (req, res) => {
 
// one to one
// one to many
// many to one 
// many to many

  try {
  //  const personAndEmp = await Person.findAll({
  //   attributes:['id','name','age','email'],
  //   order:['age'],
  //   where:{age:23},
   
  // });

  //  console.log(personAndEmp)

  //  res.status(200).json(personAndEmp)

  const personAndEmp = await Employee.findAll({
    
    include:[{model:Person,attributes:['id','name','age','email'],
      order:['age'],
      where:{age:23}}]
       });

   console.log(personAndEmp)

   res.status(200).json(personAndEmp)
   
  } catch (err) {
    console.log("Database query error:", err);
    res.status(500);
    res.send("Internal Server Error");
  }
});

router.get("/update/:id", async (req, res) => {
  const id = req.params.id;
  console.log("Update id: " + id);
 
  try {
    const persons = await Person.findByPk(id);
    console.log(persons);
    res.render("UpdatePerson", {
      person: persons,
    });
  } catch (err) {
    console.log("Database query error:", err);
    res.status(500);
    res.send("Internal Server Error");
  }
});

router.post("/update", async (req, res) => {
  const person = req.body;

  console.log(person);
  const { id } = person;

  try {
   const p= await Person.update(person, { where: { id } });

   res.status(200).json(p)
   
  } catch (err) {
    console.log("Database query error:", err);
    res.status(500);
    res.send("Internal Server Error");
  }

  // try {
  //   let sql = `SELECT * from person where id='${id}'`;
  //   const persons = await getData(db, sql);

  // } catch (err) {
  //   console.log("Database query error:", err);
  //   res.status(500);
  //   res.send("Internal Server Error");
  // }
});

router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const person = await Person.findByPk(id);
    const emp = await Employee.findOne({where:{personId:id}});
    console.log(person);
    if (!person) {
      res.status(404).json({ error: "person not found" });
    }
    if (emp) {
      const e=await emp.destroy()
    }
    
    const p=await person.destroy();
    res.status(200).json(p)
   
  } catch (err) {
    console.log("Database query error:", err);
    res.status(500);
    res.send("Internal Server Error");
  }
});

module.exports = router;
