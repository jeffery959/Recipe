import mongoose from "mongoose";


const RecipeSchema = new mongoose.Schema({
  
   UserInfo:{type:Object,require:true},
   ImageUrl:{type:String,require:true},
   timeStamp:{type:Date,require:true},
   Color:{type:Object},
   OwnerId:{type:String},
   Saved:{type:Object},
   PostedBy:{type:Object}
 

})



const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);

export default Recipe