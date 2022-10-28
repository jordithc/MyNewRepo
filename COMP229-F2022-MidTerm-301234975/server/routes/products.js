// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const products = require("../models/products");

// define the product model
let product = require("../models/products");

/* GET products List page. READ */
router.get("/", (req, res, next) => {
  // find all products in the products collection
  product.find((err, products) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("products/index", {
        title: "Products",
        products: products,
      });
    }
  });
});

//  GET the Product Details page in order to add a new Product
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  res.render('products/details', {title: "Add", page: 'details', products:''});
});

// POST process the Product Details page and create a new Product - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let products = product({
    "Productid": req.body.Productid,
    "Productname": req.body.Productname,
    "Description": req.body.Description,
    "Price": req.body.Price
  });

  product.create(products, (err,product)=>{
    if(err){
      console.log(err);
      res.end(err);
    }
    res.redirect('/products')
  });

});


// GET the Product Details page in order to edit an existing Product
router.get("/edit/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   product.findById(res.params.id,(err,product) => {
    if (err){
      return console.error(err);
    } else{
      res.render('products/details',{ title:'Edit', page:'details', products: product});
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/edit/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = res.params.id;

  let updateProduct = {
    "_id":id,
    "Productid": req.body.Productid,
    "Productname": req.body.Productname,
    "Description": req.body.Description,
    "Price": req.body.Price
  };  

  product.updateOne({_id:id}, updateProduct, (err) =>{
    if(err){
      console.log(err);
      res.end(err);
    }else{
      res.redirect('/products');
    }
  })
});

// GET - process the delete
router.get("/delete/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;
  product.remove({ _id: id}, (err)=>{
    if(err) {
      console.log(err);
      res.end(err);
    }
    res.redirect('/products');
  });
});

module.exports = router;
