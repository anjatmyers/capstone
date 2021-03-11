const express = require('express');
const router = express.Router();
const { google } = require("googleapis");
const credentials = require('../credentials.json');
const drive = require('../util/googleDrive');
// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const keys = require('../util/config');
const passport = require('passport');
let requireAuth = passport.authenticate('jwt', {session: false});
require('../config2/passAuth');
const db = require('../models');
const auth = require('../util/drive')

const oAuth2Client = new google.auth.OAuth2(
    keys.client_id, keys.client_secret, keys.redirect_uris[0]);


router.post('/files', requireAuth, async (req, res) => {
    
    let id = req.user.id
    try{
  
      const drive = await auth(id);
      
      const results = await drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
      }) 
  
      const files = results.data.files;
     
      let output = '';  //this was const instead of let :) 
      files.forEach(file =>{
        output += `${file.name} (${file.id}) <br />`
    })
  
      res.json({files})
    }
    catch(err){
      res.send('error occurred')
    }
  
  })


router.post('/getURL',  (req, res) => {
  
    //req.user.id
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
  
    res.json(authUrl)
    
  })

  router.get('/googleAuth', (req, res) => {
  
    //req.user.id
      let code = req.query.code;
      
      console.log('code inside of callback', code);
  
    
      res.redirect(`http://localhost:3000/completeCallback/${encodeURIComponent(code)}`)
  
  })


router.post('/completeAuth', requireAuth,(req, res) => {
  
    let code = decodeURIComponent(req.body.code);
    
    console.log("user id from jwt: ", req.user.id);
    console.log(`auth code ${code}`);
    try{
            
      oAuth2Client.getToken(code, async (err, token) => {
  
          if (err) return console.error("Error retrieving access token", err);
            oAuth2Client.setCredentials(JSON.stringify(token));
            // Store the token to disk for later program executions
  
            //console.log(JSON.stringify(token))
  
            //console.log(token);
            let expiry_date = token.expiry_date.toString();
  
            let results = await db.auth.create({
              token: token.access_token,
              userID: req.user.id,
              refresh_token: token.refresh_token,
              scope: token.scope,
              token_type: token.token_type,
              expiry_date : expiry_date
            })
          
          // res.json(token);
          console.log("successfully stored token in db")
          res.send('successful')
      });
  
      
    }
    catch(error){
        console.log('error while trying to get user token', error)
        res.send('error')
    }
  })






module.exports = router;



// const express = require('express');
// const router = express.Router();
// const fs = require("fs");
// const readline = require("readline");
// const { google } = require("googleapis");
// const credentials = require('../credentials.json');
// const drive = require('../util/googleDrive');
// const auth = require('../util/drive');
// const keys = require('../util/config')
// // If modifying these scopes, delete token.json.
// const SCOPES = ["https://www.googleapis.com/auth/drive"];
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = "token.json";
// const db = require('../models')
// let oAuth2Client = {}

// router.get('/googleAuth', (req, res) => {
//     // res.send(req.query.code)
//     let code = req.query.code;
   
    
//     try{

//         const rl = readline.createInterface({
//             input: process.stdin,
//             output: process.stdout,
//           });
          
//           oAuth2Client.getToken(code, async (err, token) => {
//               if (err) return console.error("Error retrieving access token", err);
//               oAuth2Client.setCredentials(token);

//               // console.log("token: 32",token)
//               // Store the token to disk for later program executions
//               // console.log(token.access_token, token.refresh_token, token.scope, token.token_type)
//               // console.log("stringified token: 35", JSON.stringify(token))
//               // console.log('Oauth2Client: 36',oAuth2Client)
        
//             //   let storedToken = await db.googleTokens.create({
//             //       id: 1,
//             //       token: JSON.stringify(token),
//             //   })

//             // let userToken = await db.googleTokens.findAll({where: {id: 1}}, {raw: true})
//             // console.log(userToken)
//             // console.log(userToken[0].dataValues.token)

//             // console.log(drive.listFiles(userToken[0].dataValues.token));
//             // drive.listFiles(oAuth2Client);
//             // console.log(drive.createFile(oAuth2Client));
            
//             // res.json(token)
//             // res.redirect("http://localhost:3000/home")
//             });

    
        
//     }
//     catch(error){
//         console.log('error while trying to get user token')
//     }
              

// })


// router.post('/getURL', (req, res) => {
    

//     try{
//         fs.readFile("credentials.json", (err, content) => {
//             if (err) return console.log("Error loading client secret file:", err);
//             // Authorize a client with credentials, then call the Google Docs API.
//             authorize(JSON.parse(content));
//           });
         
//           function authorize(credentials, callback) {
//             const { client_secret, client_id, redirect_uris } = credentials.web;
//             oAuth2Client = new google.auth.OAuth2(
//               client_id,
//               client_secret,
//               redirect_uris[0]
//             );
//             console.log("oAuth2Client: 82",oAuth2Client)
//             // Check if we have previously stored a token.
//             fs.readFile(TOKEN_PATH, (err, token) => {
//               if (err) return getNewToken(oAuth2Client, callback);
//               oAuth2Client.setCredentials(JSON.parse(token));
              
//               callback(oAuth2Client);
//             });
            
//           }

          

//           function getNewToken(oAuth2Client, callback) {
            

//             const authUrl = oAuth2Client.generateAuthUrl({
//                 access_type: "offline",
//                 scope: SCOPES,
//               });
    
//               console.log("Authorize this app by visiting this url:", authUrl);

//               res.json(authUrl)
              
//             // res.redirect(authUrl)

            
            
//           }


//     }
//     catch(error){
//         console.log('unable to make URL')
//     }

// })




// module.exports = router;