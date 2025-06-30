const mongoose = require("mongoose");
const product = require("./Models/product");

mongoose.connect("mongodb://localhost:27017/farmStand", { useNewUrlParser: true })
    .then(() => console.log("database is connected"))
    .catch(err => {
        console.log("something went wrong", err);
    });

 const productseeds=[{
    name:'Fairy EggPlant',
    price:1.00,
    category:'vegetable'
 },{
    name:'Organic Goddess Melon',
    price:4.99,
    category:'fruit'
 },{
    name:"Organic Celery",
    price:1.5,
    category:'vegetable'
 }];

 product.insertMany(productseeds).then(res=>{
    console.log(res);
 }).catch(err=>{
    console.log(err);
 });

 module.exports=product;

