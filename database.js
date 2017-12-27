var index = require('./index');





/* Last file inserted */
function getNewestFile(dir, regexp) {
    var fs = require("fs"),
     path = require('path'),
    newest = null,
    files = fs.readdirSync(dir),
    one_matched = 0,
    i

    for (i = 0; i < files.length; i++) {

        if (regexp.test(files[i]) == false)
            continue
        else if (one_matched == 0) {
            newest = files[i];
            one_matched = 1;
            continue
        }
		/*check if it's the last file inserted using getTime();*/
        f1_time = fs.statSync(path.join(dir, files[i])).mtime.getTime()
        f2_time = fs.statSync(path.join(dir, newest)).mtime.getTime()
        if (f1_time > f2_time)
            newest[i] = files[i]  
    }

    if (newest != null)
        return (path.join(dir, newest))
    return null
}



var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'shop',
  multipleStatements:true
});



connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn");    
}
});


/*
req is an object containing information about the HTTP request that raised the event. 
In response to req, you use res to send back the desired HTTP response.
*/
app.get("/category/get-all",function(req,res){
//Use connection to execute query and use rows from values
connection.query('SELECT * from category', function(err, rows, fields) {

  if (!err)
  {
  console.log(rows);
    res.json({type: true, data: JSON.stringify(rows)});
	
  }else
  {
    console.log('Error while performing Query.');
  }
  });
});

app.get("/color/get-all",function(req,res){
//Use connection to execute query and use rows from values
connection.query('SELECT * from color', function(err, rows, fields) {
  if (!err)
  {
  console.log(rows);
    res.json({type: true, data: JSON.stringify(rows)});
	
  }else
  {
    console.log('Error while performing Query.');
  }
  });
});

app.get("/products/get-all",function(req,res){
//Use connection to execute query and use rows from values
connection.query('SELECT * from product limit 3', function(err, rows, fields) {

  if (!err)
  {
	
	
	
	res.json({type: true, data: JSON.stringify(rows)});
	console.log('The solution is: ', rows);
  }else
  {
  
    console.log('Error while performing Query.');
  }
  });
});


app.get('/search',function(req,res){
//req.query is for Get form 
	var name = req.query.name;
	
	var QuerySelect = "SELECT * from house where house.name = '"+name+"'";
	console.log(QuerySelect);
connection.query(QuerySelect,function(err, rows, fields) {
 connection.end();
if (err) console.log(err);
var data=[];

var value = rows.length;

	console.log("values of rows " + value);
	if(value > 0 )
	{
		for(i=0;i<value;i++)
		{
//Insert in array rows with name, description, localization and price
			data.push(rows[i].name);
			data.push(rows[i].description);
			data.push(rows[i].localization);
			data.push(rows[i].price);
		}
		res.end(JSON.stringify(data));
		console.log('Send value of search');
	}else{
			res.send('Dont find nothing with that search');
		}
});
});




/*
app.get('/login', function(req, res){

	var email = req.query.email; // Get['email'];
	var password = req.query.password; // Get['password'];
	

	var queryStringLogin = "Select * from person where person.email='"+email+"'"+"and person.password='"+password+"'";
	console.log(queryStringLogin);
	connection.query(queryStringLogin, function(err, rows, fields){
	var value = rows.length;
	
	console.log(value + "Number of rows");
	
	
	
	if(err)
	{
		res.send('Error in login'+err);
		console.log(err);
	}else{
		
		if(value > 0)
		{
		
		for(i=0;i<value;i++)
		{
//Insert in array rows with name, description, localization and price
			
			var id = rows[i].id;
		
			
		}
		
		req.session.userId = id;
		connection.end();
		console.log(id);
		
		//return res.send('<p> User Homepage : <a href="/homePage">View here</a>');
		//res.send('You are redirected for homePage');
		//
		//Redirect with id
		return res.redirect("/homepage/");
		
		
		}else{
		//Send message for client side
			return res.send('error in login');
			
		}
	}
	
	});

});*/

//Get session of the email user ;;;;;
app.get('/main', function(req, res){
	
	res.send(req.session.userId);

});
 


//// Insert products in Cart

/// Working fine, receive values from house/id  int id;
app.get('/add-to-cart/:id', function(req, res) {
	var id = req.params.id;
	
	//req.session.id = id;
	//var datetime = moment().format('DD-MM-YYYY');;
		
	var QuerySelect = "Insert into orders_item (Orders_id, Product_id, quantity) values('1','"+id+"','1') ";
	console.log(QuerySelect);
connection.query(QuerySelect,function(err, rows, fields) {
 
		//
		if(!err)
		{
		console.log("Add product to cart");
			return res.redirect("/")
		}else{
		
		res.send('Dont inserted the products');
		}
		});
		
	
});

// Show all products from cart
app.get('/cart', function(req, res)
{
var QuerySelect = "SELECT distinct p.name as name, p.price as price, oi.id as id from orders_item as oi, product as p where oi.Orders_id = '1' and p.id=oi.Product_id";
	console.log(QuerySelect);
connection.query(QuerySelect,function(err, rows, fields) {

if (err) console.log(err);
var data=[];

var value = rows.length;

	console.log("values of rows " + value);
	if(value > 0 )
	{
		
		console.log('Send value of search');
		
		res.json({type: true, data: JSON.stringify(rows)});
	}else{
			res.send('Dont find nothing with that search');
		}
		});

});

  
var control = 0;	

app.post('/insert', function(req,res){
    
  //req.body is for POST form 
  var username = req.body.first_name;
  var sobrename = req.body.last_name;
  var email = req.body.email;
  var pais = req.body.city;
  var phone = req.body.phone_number;
  var password = req.body.password;
  

  var execute = 0;
  
 
  
		var CheckIfExist = "Select * from user where email ='"+email+"'";
	   connection.query(CheckIfExist,function(err, rows, fields){
	   
	   if(rows.length > 0)
	   {
	   
		res.redirect("/login")
		}else{
			console.log("Não existe conta com esse email associado");
				Create_Account();
				
				
			}
	   
	   });
  
		
  
  
       
      function Create_Account()
	  {
		 var queryString = "insert into user(name,sobrename,email, morada, telefone, password) values('"+username+"','"+sobrename+"','"+email+"','"+pais+"','"+phone+"','"+password+"')";
        console.log(queryString);
	   
       connection.query(queryString,function(error,results){
	  
           if(error)
               {
                   console.log('Error while performing Query FOR INSERT.');
				 
				   
               }
           else 
               {
			   
			  control = results.insertId;
			    console.log("Last id inserted" + control);
				  var QueryUpdate = "Update orders set user_id='"+control+"' where user_id=1";
	   connection.query(QueryUpdate,function(control, error,results){
	   console.log(QueryUpdate);
	   
	  
	   });
				 return res.redirect("http://localhost:3001/checkout?="+control);
				
               }
           
       });
	  }
	  
	  
/*function Update_orders() {
            var QueryUpdate = "Update orders set user_id='"+global.control+"' where user_id=1";
	   connection.query(QueryUpdate,function(error,results){
	   console.log(QueryUpdate);
	   
	  
	   });
}*/

	   
	   
       
  
    
    
});





//* Insert Image *//

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './images/')
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})

/* Last id inserted */

var lastId;


app.post('/insert/product', function(req,res){
    
  //req.body is for POST form 
  var name = req.body.name;
  var price = req.body.price;
  var quantity = req.body.quantity;
  var description = req.body.description;
  var category = req.body.myselect;
  var color = req.body.mycolor;
  var datetime = moment().format('DD-MM-YYYY');;

 
 
	
  
      var queryString = "insert into product(name,price,quantity,description, category_id, Color_id, date_inserted, loves, state)"
	  +"values('"+name+"','"+price+"','"+quantity+"','"+description+"','"+category+"','"+color+"'"+",'"+datetime+"','0','0')";
        console.log(queryString);
	   
       connection.query(queryString,function(error,results){
	  
           if(error)
               {
                   console.log('Error while performing Query FOR INSERT.');
				   connection.end();
				   
               }
           else 
               {
			  
			 lastId = results.insertId;
			 console.log(lastId);
			   
					return res.redirect("/admin/insert_product")
                
               }
           
       });
       
  
    
    
});

app.post('/insert/photos', function(req,res){
    
 
  var upload = multer({
		storage: storage,
		fileFilter: function(req, file, callback) {
			var ext = path.extname(file.originalname)
			console.log(ext);
			
			if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
				return callback(res.end('Only images are allowed'), null)
			}
			callback(null, true)
		}
	}).single('file');
	upload(req, res, function(err) {
	//	res.send('File is uploaded')
	})
	
	var f = getNewestFile("./images/", new RegExp('.*\.jpg'));
	console.log(f);
	
  
      var queryString = "insert into image(file_name, product_id)"
	  +"values('"+f+"','"+lastId+"')";
        console.log(queryString);
	   
       connection.query(queryString,function(error,results){
	  
           if(error)
               {
                   console.log(error);
				   
               }
           else 
               {
			   
					
              return res.redirect("http://localhost:3001/admin/product")
               }
           
       });
       
  
    
    
});

/// Working fine, receive values from house/id  int id;
app.get('/product/:id', function(req, res) {
	
	var id = req.params.id;

		
	var QuerySelect = "SELECT * from product where product.id = '"+id+"'";
	console.log(QuerySelect);
connection.query(QuerySelect,function(err, rows, fields) {
 
if (err) console.log(err);
var data=[];

var value = rows.length;

	console.log("values of rows " + value);
	if(value > 0 )
	{
			res.json({type: true, data: JSON.stringify(rows)});
	
	}else{
			connection.end();
			res.send('Dont find nothing with that search');
		}
		});
		
	
});


app.get('/cart/delete/:id', function(req, res){

	//parameters
	var id = req.params.id;
	
	
	
  
   var sqlRemoveProductCart = "Delete from orders_item where id='"+id+"'";
   
   

   

   
	 connection.query(sqlRemoveProductCart, function(err, rows, fields) {
    if(err)
{	console.log(err);
	}else{
	
	return res.redirect("http://localhost:3001");
}
   
});

});	






