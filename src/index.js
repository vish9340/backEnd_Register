const express = require("express");
const cookieParser = require("cookie-parser");



const app = express();
app.use(express.json());
app.use(cookieParser());

const { register, login } = require("./controllers/auth.controller");
const { Authenticate } = require("./middlewares/auth.mid");
app.get("/", (req, res)=>{return res.status(200).send("Hello")});
const AddController = require("./controllers/Add.controller");
const UserCOntroller = require("./controllers/user.controller");
app.use("/data", AddController);
app.use("/users", UserCOntroller);
app.post("/register", register);
app.post("/login", login);

module.exports = app;
