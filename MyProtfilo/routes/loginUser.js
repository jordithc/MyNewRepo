let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//connect to our login user model
let loginUser = require('../models/book');

/* GET login user List page. READ */
router.get("/", (req, res, next) => {

    loginUser.find((err, userList) => {
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

module.exports = router;
