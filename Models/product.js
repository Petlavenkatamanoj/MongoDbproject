const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:String,
        
    }
});

const product=mongoose.model('product',productSchema);

module.exports=product;