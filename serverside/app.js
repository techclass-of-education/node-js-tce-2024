const express = require("express");
const session = require('express-session');
const path = require("path");
const cors = require("cors");
const csrf=require("csurf")
const bodyParser = require("body-parser");
// const cookieParser=require("cookie-parser")
const regsiterRouter = require("./routers/registerRouter");
const loginRouter = require("./routers/loginRouter");


const app = express();
// app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

//hello  3
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // for HTTP
}));
app.use(csrf({cookie:true}));
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// const seq = require("./database/config");
// const Person = require("./database/models/Person");
// const Employee = require("./database/models/Employee");
app.use("/reg", regsiterRouter);
app.use("/login", loginRouter);


// app.use(express.static("static-files")); // to use middlewares
// Configure CORS

app.get("/csrftoken",(req,res)=>
  {
    res.json({csrfToken:req.csrfToken(),s:req.session.csrfSecret})
  })

  app.post("/save", async (req, res) => {   // http://localhost:8000/reg/save
    console.log("hello")
    console.log(req)
      // const formData = req.body;
      // console.log(formData);
      // const person = await Person.create(formData);
      // console.log(person.dataValues);
      res.send("helloo")
    
      // res.render("succssReg", { formData: person.dataValues });
    
    });

app.get("/", (req, res) => {
  // req.csrfToken()
  // seq.sync({ force: false }).then(() => {
  //   console.log("Models are synchronized successfully");
  // });
  res.send("server connected successfully")
});



app.listen(8000,"127.0.0.1", () => {
  console.log("server started on http://localhost:8000");
});
