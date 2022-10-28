const express = require("express");
const cookieParser = require("cookie-parser");
var jsonParser = bodyParser.json()



const app = express();
app.use(express.json());
app.use(cookieParser());

const { register, login } = require("./controllers/auth.controller");
const { Authenticate } = require("./middlewares/auth.mid");
app.get("/", (req, res)=>{return res.status(200).send("Hello")});
const AddController = require("./controllers/Add.controller");
const UserCOntroller = require("./controllers/user.controller");
app.use("/data",jsonParser, AddController);
app.use("/users",jsonParser, UserCOntroller);
app.post("/register",jsonParser, register);
app.post("/login",jsonParser, login);

module.exports = app;
