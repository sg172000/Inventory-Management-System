const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
//mongoose.connect("mongodb+srv://admin-shivam:Shivam123@@cluster0.livud.mongodb.net/sleepDB",{useNewUrlParser:true, useUnifiedTopology: true,useFindAndModify:false });
mongoose.connect("mongodb+srv://admin-shivam:Shivam123@@cluster0.livud.mongodb.net/Inventory", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

//customer

const CustomerSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  dob: String,
  age: String
});

const Customer = mongoose.model("Customer", CustomerSchema)

app.get("/", (req, res) => {
  Customer.find({},(err,founditem)=>
{
  var customer=founditem.length;
  Product.find({},(err,founditem)=>
{
  var product=founditem.length;
  res.render("home",{customer:customer,product:product});
})
})
})
app.get("/customer", (req, res) => {
  Customer.find({}, function(err, founditem) {
    res.render("customer", {
      customer: founditem
    });
  });
});
app.post("/add", (req, res) => {
  const Customer1 = new Customer({
    name: req.body.customer,
    phone: req.body.phone,
    dob: req.body.dob,
    age: req.body.age
  });
  Customer1.save(function(err,result){
    if (err)
    console.log(err);
    else
    {
      res.redirect("/customer");

    }
});
});

app.post("/delete", (req, res) => {
  console.log(req.body.del_id);
  console.log(req.body.del_btn);
  if (req.body.del_btn === "delete it") {
    Customer.findByIdAndRemove(req.body.del_id, function(err) {
      if (!err) {
        //console.log("successfully deleted");
      }
    });
  }
  res.redirect("/customer");
});
//


//Product
const ProductSchema = new mongoose.Schema({
  category: String,
  brand: String,
  product: String,
  quantity: Number,
  price: String,
  purchase:String
});

const Product = mongoose.model("Product", ProductSchema);

app.get("/product", (req, res) => {
  Product.find({}, function(err, founditem) {
    res.render("product", {
      product: founditem
    });
  });
});

app.post("/product", (req, res) => {
  const Product1 = new Product({
    category: req.body.category,
    brand: req.body.brand,
    product: req.body.product,
    quantity: req.body.quantity,
    price: req.body.price,
    purchase:req.body.purchasedate
  });
  Product1.save(function(err,result){
    if (err){
        console.log(err);
    }
    else{
      res.redirect("/product");
    }
  });
});

app.post("/edit", (req, res) => {
  Product.findByIdAndUpdate({
    _id: req.body.id
  }, {
    category: req.body.update_category,
    brand: req.body.update_brand,
    product: req.body.update_product,
    quantity: req.body.update_quantity,
    price: req.body.update_price,
    purchase:req.body.update_purchase
  }, function(err, foundList) {
    if (!err) {
      res.redirect("/product");
    } else {
      console.log(err);
    }
  });
});

app.post("/deleteproduct",(req,res)=>
{
  Product.findByIdAndRemove(req.body.deleteproductid, function(err) {
    if (!err) {
      //console.log("successfully deleted");
    }
    res.redirect("/product");
  });});

  //product end

///////////////////
app.get("/brand",(req,res)=>
{
  Product.find({}, function(err, founditem) {
    res.render("brand", {
      brand: founditem
    });
  });
})
///////////////////

const SupplierSchema = new mongoose.Schema({
  SupplierName: String,
  state: String,
  address: String,
  Contact1: Number,
  Contact2: Number
});

const Supplier = mongoose.model("Supplier",SupplierSchema);

app.get("/supplier", (req, res) => {
  Supplier.find({}, function(err, founditem) {
    res.render("supplier", {
      supplier: founditem
    });
  });
});

app.post("/supplier", (req, res) => {
  const Supplier1 = new Supplier({
    SupplierName: req.body.SupplierName,
    state: req.body.state,
    address: req.body.Address,
    Contact1: req.body.CustomerContact1,
    Contact2: req.body.CustomerContact2
  });
  Supplier1.save(function(err,result){
    if (err){
        console.log(err);
    }
    else{
      res.redirect("/supplier");
    }
  });
});

app.post("/deletesupplier",(req,res)=>
{
  Supplier.findByIdAndRemove(req.body.deletesupplierid, function(err) {
    if (!err) {
      //console.log("successfully deleted");
    }
    res.redirect("/supplier");
  });
});
app.listen(process.env.PORT||3000, () => console.log("server started at port 3000"));

//https://sleepy-gorge-24550.herokuapp.com
//https://salty-spire-47876.herokuapp.com
