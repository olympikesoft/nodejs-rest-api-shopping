var index = require('./index');


passport.use('local', new LocalStrategy({

  emailField: 'email',

  passwordField: 'password',

  passReqToCallback: true //passback entire req to call back
} , function (req, email, password, done){


      if(!email || !password ) { return done(null, false, req.flash('message','All fields are required.')); }

      var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';

      connection.query("select * from user where email = ?", [email], function(err, rows){

          console.log(err); console.log(rows);

        if (err) return done(req.flash('message',err));

        if(!rows.length){ return done(null, false, req.flash('message','Invalid email or password.')); }

        salt = salt+''+password;

        var encPassword = crypto.createHash('sha1').update(salt).digest('hex');


        var dbPassword  = rows[0].password;

        if(!(dbPassword == encPassword)){

            return done(null, false, req.flash('message','Invalid email or password.'));

         }

        return done(null, rows[0]);

      });

    }

));

/* Save save the data in the session */
passport.serializeUser(function(user, done){

    done(null, user.id);

});
/* use key to get information of the req user */
passport.deserializeUser(function(id, done){

    connection.query("select * from user where id = "+ id, function (err, rows){

        done(err, rows[0]);

    });

});