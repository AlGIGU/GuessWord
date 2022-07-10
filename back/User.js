import mongoose from "mongoose";

//валидация и структуризация перед сохранением в Mongo
const User = new mongoose.Schema({
    name: {type: String, required : true, minlength:2},
    mail: {type: String, required : true},
    password: {type: String, required : true},
    coins: {type: String, required : true},
    privilege : {type: String, default:"User"}
});

export default mongoose.model('User', User);