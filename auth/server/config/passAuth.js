// register the user, encrypt the password and send back a token 
// when signing in, confirm sign in info is correct verify it with passport then send back a token 

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// ^all comes from passport documentation
const bcrypt = require('bcryptjs');
// un-encrypt
const db = require('../models');
// gives access to user models to check email and pw
const config = require('../secrets') 
// gives access to jwt secret

// validating users credentials with 
// email and password  => local strategy, checks our db using models 
// or jwt if they already have a token


// 1 Local strategy: email and pw validation
let options = {
    usernameField: 'email'
}
// pass in a function that is expecting username and password BUT we have email instead so we have to override it 
let localLogin = new LocalStrategy(options, async (email, password, done) => {
    try{
    // check to see if email is in db

    let records = await db.user.findAll({where: {email: email}}); //array of objects

    if(records != null){
        // encrypt password and compare to password in db 

        bcrypt.compare(password, records[0].password, (err, isMatch) => {
            // check if err object exists in bcrypt software itself
            if(err){
                return done(err);
            }
            // check if the passwords don't match 
            if(!isMatch){
                return done(null, false)
            }

            // valid user 
            return done(null, records[0]);

        });
    }
    else{
        // no email found, exit with error
        return done(null, false)
    }
    }
    catch(error){
        // something failed in db retrieval
        return done(error)
    }
});



// 2 jwt strategy: validates jwt token
let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    // ^ places a header on the request, thats where we put the jwt token
    secretOrKey: config.secret
}

let jwtLogin = new JwtStrategy(jwtOptions, async(payload, done) => {
    // this scrapes token off of header and puts it in the payload
    try{
        let user = await db.user.findByPk(payload.sub);
        if(user){
            // success
            done(null,user);
        }
        else{
            done(null, false)
        }
    
    }
    catch(error){
        return done(error)
    }

});



// passing our two different strategies into the passport middleware
passport.use(localLogin);
passport.use(jwtLogin);