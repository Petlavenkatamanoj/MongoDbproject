const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const product = require("./Models/product");
const methodOverride=require("method-override");

mongoose.connect("mongodb://localhost:27017/farmStand")
  .then(() => console.log("Database is connected"))
  .catch(err => console.log("Database connection error:", err));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  res.send("!Oops");
});
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.post("/product",asyncHandler(async (req,res)=>{
    const newproduct=new product(req.body);
    newproduct.save();
    res.redirect(`/product/${newproduct.id}`);
}))

app.get("/product", asyncHandler(async (req, res) => {
  const prod = await product.find({});
  res.render("product/index",{prod});
}));

app.get("/product/new", (req, res) => {
  res.render("product/new");
});

app.get("/product/:id/edit", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const prod = await product.findById(id);
  res.render("product/edit", { prod }); 
}));

app.get("/product/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const prod = await product.findById(id);
  res.render("product/show", { prod });
}));
app.put("/product/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const prod = await product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true, 
  });
  res.redirect(`/product/${prod._id}`);
}));
app.delete("/product/:id",asyncHandler(async (req,res)=>{
  const { id }=req.params;
  await product.findByIdAndDelete(id);
  res.redirect("/product");
}))

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
