import mongoose from "mongoose";

//валидация и структуризация перед сохранением в Mongo
const User = new mongoose.Schema({
    name: {type: String, required : true, minlength:2},
    mail: {type: String, required : true},
    password: {type: String, required : true,  minlength:6, maxlength:10},
    coins: {type: String, required : true},
    avatar : {type: String}
});

export default mongoose.model('User', User);