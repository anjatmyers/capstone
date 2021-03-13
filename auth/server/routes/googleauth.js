const express = require('express');
const router = express.Router();
const { google } = require("googleapis");
const credentials = require('../credentials.json');
const functions = require('../util/googleDrive');
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
const auth = require('../util/drive');
const { createFile, createJSFolder } = require('../util/googleDrive');

const oAuth2Client = new google.auth.OAuth2(
  keys.client_id, keys.client_secret, keys.redirect_uris[0]);

  // wasn't working with requireAuth
router.post('/delete', async (req, res) => {
    
    let fileID = req.body.id
    let userID = req.body.userID

    try{
  
      const drive = await auth(userID);
  
      const results = await drive.files.update({ 
        fileId: fileID, 
        requestBody: { trashed: true } 
      });
      console.log("File deleted successfully")
    }
    catch(err){
      res.send('error occurred')
    }
  })


router.post('/update', async (req, res) => {
    
    let fileID = req.body.id
    let userID = req.body.userID

    try{
  
      const drive = await auth(userID);
  
      const results = await drive.files.get({ 
        fileId: fileID, 
        mimeType: 'text/plain'
      });


      console.log(results.media)
    }

    catch(err){
      res.send('error occurred')
    }
  
  })


router.post('/getURL',  async (req, res) => {
    
    //req.user.id
    let id = req.body.userID;
  
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });

    try{
      let folderIDs = await db.folderIDs.create({
        id: id,
      })
    } 
    
    catch(error){
      console.log(error)
    }

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


  router.post('/files', requireAuth, async (req, res) => {
    
    let id = req.user.id

    try{
  
      const drive = await auth(id);

      const results = await drive.files.list({
        pageSize: 20,
        fields: 'nextPageToken, files(id, name)',
      }) 
  
      const files = results.data.files;
     
      let output = ''; 
      files.forEach(file =>{
        output += `${file.name} (${file.id}) <br />`
    })
  
      res.json({files})
    }
    catch(err){
      res.send('error occurred')
    }
  })

  
  // create new file in G drive
  router.post('/createFile/:language', requireAuth, async (req, res) => {

    let id = req.user.id
    let language = req.params.language
    let body = req.body.input
    let name = req.body.title

    const drive = await auth(id);


    try{

      let folder = await db.folderIDs.findAll({where: {id: id}}, {raw: true})

      switch (language) {
        case "javascript": 
          if (!(folder[0].dataValues.root)){
            await functions.createNotesFolder(drive, id)
          }
          if(!(folder[0].dataValues.javascript)){
            await functions.createJSFolder(drive, id)
          }
          await functions.createJSFile(drive, body, id, name)
          break;
        case "python": 
          if (!(folder[0].dataValues.root)){
            await functions.createNotesFolder(drive, id)
          }
          if(!(folder[0].dataValues.python)){
            await functions.createPYFolder(drive, id)
          }
          await functions.createPYFile(drive, body, id, name)
          break;
        case "htmlcss": 
          if (!(folder[0].dataValues.root)){
            await functions.createNotesFolder(drive, id)
          }
          if(!(folder[0].dataValues.htmlcss)){
            await functions.createHTMLCSSFolder(drive, id)
          }
          await functions.createHTMLCSSFile(drive, body, id, name)
          break;
        case "sql": 
          if (!(folder[0].dataValues.root)){
            await functions.createNotesFolder(drive, id)
          }
          if(!(folder[0].dataValues.sql)){
            await functions.createSQLFolder(drive, id)
          }
          await functions.createSQLFile(drive, body, id, name)
          break;
        case "shell": 
          if (!(folder[0].dataValues.root)){
            await functions.createNotesFolder(drive, id)
          }
          if(!(folder[0].dataValues.shell)){
            await functions.createShellFolder(drive, id)
          }
          await functions.createShellFile(drive, body, id, name)
          break;
        default:
          console.log("Error saving the file")

    }}
    catch(err){
        res.send('could not make new file')
    }

})

module.exports = router;


