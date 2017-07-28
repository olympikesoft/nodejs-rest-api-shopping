var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/view/';
var port = process.env.PORT || 3001
var fs = require("fs");

var phpExpress = require('php-express')({
    binPath: 'php'
});

var otherFile = require('./database.js') // the .js is optional


router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

app.engine('php', phpExpress.engine);
app.set('view engine', 'php');

app.all(/.+\.php$/, phpExpress.router);


router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/admin/index",function(req,res){

  res.sendFile(path + "/admin/index.html");
});

router.get("/admin/insert_product",function(req,res){

  res.sendFile(path + "/admin/insert_product.html");
});
router.get("/admin/edit_product",function(req,res){

  res.sendFile(path + "/admin/edit_product.html");
});


router.get("/admin/product",function(req,res){

  res.sendFile(path + "/admin/product.html");
});

router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});




router.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
});

//Define rout for login

app.get("/login", function (req, res) {
  res.sendfile(path + "login.html");
});

app.get("/register", function (req, res) {
  res.sendfile(path + "register.html");
});

router.get("/homepage",function(req,res){
  res.sendfile(path + "homepage.html");
});

app.get("/product", function (req, res) {
  res.sendFile(path + "product.html");
});

router.get("/checkout",function(req,res){
  res.sendFile(path + "checkout.html");
});

router.get("/cart",function(req,res){
  res.sendFile(path + "cart.html");
});



app.use("/",router);



app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});






app.listen(port,function(){
  console.log("Live at Port 3001");
});

/*
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});*/
