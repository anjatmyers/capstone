const express = require('express'); 
const app = express();
const passport = require('passport');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
//   ^ this middleware will allow access for all CORS


app.use(require('./routes/authentications'));

app.use(passport.initialize());
require('./authenticate');
app.get("/google", passport.authenticate('google', {scope: ['profile', 'email']}));

app.get('/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), (req, res) =>{
  // res.redirect('/');
  res.send('Logged in!');
})


app.listen(3001, () => {
    console.log('listening on port 3001');
})


// OAuth gives you a token so you don't need your own JWT 


// EXAMPLE OF HOW TO USE JWT
// const jwt = require('jwt-simple');
// // creates jwt token 

// // user information

// let userInfo = {
//     id: '12345',
//     userName: 'Andrea',
//     email: 'andrea@gmail.com'
// }

// // create a function that passes in user infomation and returns a jwt token

// const token = (user) => {
    
//     let timestamp = new Date().getTime();
//     // gives current time 

//     return jwt.encode({sub: user.id, name: user.userName, iat: timestamp},  "moqpxotuenvbfhaod");
//     // encode creates json web token
// }

// // call function and pass to it our user

// let jwtToken = token(userInfo);

// console.log(jwtToken)