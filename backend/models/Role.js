import mongoose from "mongoose";

const roleSchema=mongoose.Schema({
    title:String,
    level:String
},{timestamps:true});

const Role=mongoose.model('Role',roleSchema);

export default Role;