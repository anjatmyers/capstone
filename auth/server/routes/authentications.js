const express = require('express');
const router = express.Router();


const bcrypt = require('bcryptjs');
const db = require('../models');
// ^allows us to encrypt passwords
const config = require('../secrets');
// ^ our secret file to make jwt

router.use(express.urlencoded({extended: false}));
// ^allows us to scrape the email and pw from the req header
router.use(express.json());

const jwt = require('jwt-simple');
// ^allows us to create a json webtoken 'jwt'

const passport = require('passport');
// this is our node passport middleware
require('../config/passAuth'); //imports all of passport auth stuff

let requireSignIn = passport.authenticate('local', {session: false});
let requireAuth = passport.authenticate('jwt', {session: false});
// have to specify that we're not usin cookie sessions which is the default 

// this function returns json webtoken from user info
const token = (user) => {
    
    let timestamp = new Date().getTime();
    // gives us the current time


    return jwt.encode({sub: user.id, iat: timestamp}, config.secret)
}



router.get('/', requireAuth, (req, res) => {
    res.send('Hello World')
});


// SIGNING IN with credentials: insert passport middleware that will either allow them to have a token or divert them somewhere else 
router.post('/signin', requireSignIn, (req, res) => {
    
    // validate user
    // send back a token 
    
    res.json({token: token(req.user)})
})




// SIGNING UP registering a new user and send back jwt
router.post('/signup', async (req, res) => {
    // register new user in db 

    // have a body parser to scrape information (email and password)
    let email = req.body.email;
    // encrypt: bcrypt to encrypt password
    let password = bcrypt.hashSync(req.body.password, 8);



    // models - we need to store the new info in our db 
    try{
    let records = await db.user.findAll({where: {email: email}})
    // ^checking if the username already exists, if this call brings back data we need to send an error
    if(records.length === 0){
        // add new record
        let user = await db.user.create({email: email, password: password});
        
        let jwtToken = token(user)
        // return jwt, pass it back to client
        return res.json({token: jwtToken})
    }
    else{
        // send back an error to the front end since the email exists

        return res.status(422).send({error: 'Email already exists'})
    }
    } catch(error){
    // send back error that there was a problem accessing database
        return res.status(423).send({error: `Can't access database`});
    }


    // create jwt token and pass back with the response 

    // send back token
})




module.exports = router;





// register the user, encrypt the password and send back a token 
// when signing in, confirm sign in info is correct verify it with passport then send back a token 