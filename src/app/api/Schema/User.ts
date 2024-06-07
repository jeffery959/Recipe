import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    FirstName:{type:String,require:true},
    LastName:{type:String,require:true},
    Email:{type:String,unique:true,require:true},
    userImg:{type:String,require:false},
    Password:{type:String,require:false},
    Color:{type:String}
 

})


const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User
