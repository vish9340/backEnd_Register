

const express = require("express");
const app = express();
const User = require("../models/user.model");


app.get("", async(req, res)=>{
    try {
        const user = await User.find().lean().exec();
        console.log(req.body.email);
        return res.status(200).send({user});
    } catch (error) {
        return res.status(500).send({msg: error.msg});
    }
})


module.exports= app;