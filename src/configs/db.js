
const mongoose = require("mongoose");

const connect = ()=>{
    mongoose.connect("mongodb+srv://vishesh:89824249@cluster1.5hmzk.mongodb.net/AddData")
}

module.exports = connect;