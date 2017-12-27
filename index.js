var express = require("express");
app = express();
var router = express.Router();
var path = __dirname + '/view/';
var port = process.env.PORT || 3000;
var fs = require("fs");


var express    = require("express");
mysql      = require('mysql');
/*Date*/
var moment      = require('moment');
//var async = require('async');

var session = require('express-session');

app.set('views', __dirname + '/view');
app.set('view engine', 'ejs'); //extension of views
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

/*var - local variable*/


app.use(session({secret: "Shh, its a secret!"}));

/*Insert images */
multer = require('multer');

var path = require('path');

var fs = require("fs");

/* AUTHENTICATION MODULES*/

var flash             = require('connect-flash');

var crypto            = require('crypto');

var passport          = require('passport');

var LocalStrategy     = require('passport-local').Strategy;

var BetterMemoryStore = require('session-memory-store')(session);



/*		END AUTHENTICATION				*/

/* Stores */

 var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });

 app.use(session({

    name: 'JSESSION',

    secret: 'MYSECRETISVERYSECRET',

    store:  store,

    resave: true,

    saveUninitialized: true

}))
/*
*/

var expressHbs = require('express-handlebars');
var validator = require('express-validator');


app.use(flash());

app.use(passport.initialize());

app.use(passport.session());


module.exports = app;


app.use(session({secret: "Shh, its a secret!"}));



var otherFile = require('./database.js') // the .js is optional


router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
   res.sendFile("index.hbs", {"root": __dirname + "/view/"});
});

router.get("/admin/index",function(req,res){

 res.sendFile("/admin/index.html", {"root": __dirname + "/view/"});
  
});

router.get("/admin/insert_product",function(req,res){

res.sendFile("/admin/insert_product.html", {"root": __dirname + "/view/"});
 
});
router.get("/admin/edit_product",function(req,res){

  res.sendFile("/admin/edit_product.html", {"root": __dirname + "/view/"});

});


router.get("/admin/product",function(req,res){

 
    res.sendFile("/admin/product.html", {"root": __dirname + "/view/"});

});

router.get("/about",function(req,res){
	 res.sendFile("about.html", {"root": __dirname + "/view/"});
 
});




router.get("/contact",function(req,res){
	res.sendFile("contact.html", {"root": __dirname + "/view/"});
  
});

//Define rout for login

app.get("/login", function (req, res) {
  
  	res.sendFile("login.hbs", {"root": __dirname + "/view/"});

});

app.get("/register", function (req, res) {
  	res.sendFile("register.hbs", {"root": __dirname + "/view/"});

});

router.get("/homepage",function(req,res){
  	res.sendFile("homepage.html", {"root": __dirname + "/view/"});

});

app.get("/product", function (req, res) {
 
  	res.sendFile("product.html", {"root": __dirname + "/view/"});

});

router.get("/checkout",function(req,res){

  	res.sendFile("checkout.html", {"root": __dirname + "/view/"});

});

router.get("/cart",function(req,res){
  	res.sendFile("cart.html", {"root": __dirname + "/view/"});

});



app.use("/",router);



app.use("*",function(req,res){
  	res.sendFile("404.html", {"root": __dirname + "/view/"});

});



app.use("/favicon.icon",function(req,res){
  res.sendFile(path + "404.html");
});



app.listen(port,function(){
  console.log("Live at Port 3000");
});

