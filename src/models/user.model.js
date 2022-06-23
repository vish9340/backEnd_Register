
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name : {type : String, require : true},
    mobile : {type: String, require : true, minlength:[10, "Should be 10 Number"]},
    email : {type: String, require: [true, "Please Enter Email"], unique: [true, "Please Enter valid Email"]},
    password : {type: String, require: true, minlength: [6, "Password must be 6 charecter"]},
},{
    versionKey: false,
    timestamps: false
});

userSchema.pre("save", function(next){
    const hash = bcrypt.hashSync(this.password, 6);
    this.password = hash;
    return next();
})

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
   }


module.exports = mongoose.model("user", userSchema);