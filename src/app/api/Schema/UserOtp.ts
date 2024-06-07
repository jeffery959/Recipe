import mongoose from "mongoose";


const UserOTPVerificationSchema = new mongoose.Schema({
    FirstName:{type:String,require:true},
    LastName:{type:String,require:true},
    Email:{type:String,unique:true,require:true},
    Password:{type:String,require:false}, 
     otp:String,
    


}
)


const UserOtpVerification=mongoose.models.UserOtpVerification|| mongoose.model('UserOtpVerification', UserOTPVerificationSchema);

export default UserOtpVerification;

