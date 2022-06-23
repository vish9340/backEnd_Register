const mongoose = require("mongoose");

const AddSchema = new mongoose.Schema({
    title : {type: String, require: true},
    product_name : {type : String, require: false},
    product_id : {type : String, require: true},
    work : {type : String},
    address : {type : String}
})

module.exports = mongoose.model("AddData", AddSchema);