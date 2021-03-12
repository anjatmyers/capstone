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

    console.log(fileID)

    // try{
  
      const drive = await auth(userID);
  
      const results = await drive.files.get({ 
        fileId: fileID, 
      });

      console.log(results.media)
    // }

  //   catch(err){
  //     res.send('error occurred')
  //   }
  
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

// get list of files from G drive
  router.post('/files', requireAuth, async (req, res) => {
    
    let id = req.user.id
    // try{
  
      const drive = await auth(id);
      
      const results = await drive.files.list({
        pageSize: 20,
        fields: 'nextPageToken, files(id, name)',
      }) 
  
      const files = results.data.files;
     
      let output = '';  //this was const instead of let :) 
      files.forEach(file =>{
        output += `${file.name} (${file.id}) <br />`
    })
  
      res.json({files})
    // }
    // catch(err){
    //   res.send('error occurred')
    // }
  
  })

  // create new file in G drive
  router.post('/createFile/:language', requireAuth, async (req, res) => {


    let id = req.user.id
    let language = req.params.language
    let body = req.body.input

    const drive = await auth(id);

  
    // try{

    let folder = await db.folderIDs.findAll({where: {id: id}}, {raw: true})

    // console.log(folder[0].dataValues.javascript)

    console.log("LINE 185 -------------- " + language)

    switch (language) {
      case "javascript": 
        console.log("inside javascript switch case")
        if (!(folder[0].dataValues.root)){
          console.log("Inside making all folders")
          await functions.createNotesFolder(drive, id)
          console.log('Master folder created!')
        }
        if (!(folder[0].dataValues.javascript)){
          await functions.createJSFolder(drive, id)
          console.log('JS Folder created!')
        }
        await functions.createJSFile(drive, body, id)
        console.log('File created!')
        
        break;
      case "python": 
      // console.log("line 196 " + id)
        if (!(folder[0].dataValues.root)){
          functions.createNotesFolder(drive, id)
          res.send('New Master Notes Folder created.')
        } 
        if (!(folder[0].dataValues.python)){
          functions.createPYFolder(drive, id)
          res.send('New Python Folder created.')
        }
        console.log("===============+++++++++")
        functions.createPYFile(drive, body, id)
        res.send('New file created.')
        break;
      // case "HTMLCSS": 
      //   if (folder[0].dataValues.htmlcss){
      //     functions.createHTMLCSSFile(drive)
      //   } else {
      //     functions.createHTMLCSSFolder(drive)
      //     functions.createHTMLCSSFile(drive)
      //   }
      //   break;
      // case "SQL": 
      //   if (folder[0].dataValues.sql){
      //     functionc.createSQLFile(drive)
      //   } else {
      //     functions.createSQLFolder(drive)
      //     functions.createSQLFile(drive)
      //   }
      //   break;
      // case "Shell": 
      //   if (folder[0].dataValues.shell){
      //     functions.createShellFile(drive)
      //   } else {
      //     functions.createShellFolder(drive)
      //     functions.createShellFile(drive)
      //   }
      //   break;
      default:
        console.log("Error saving the file")

    let file = await drive.files.create({
        requestBody: {
            name: req.body.title,
            mimeType: 'text/plain'
          },
          media: {
            mimeType: 'text/plain',
            body: req.body.input
          }
      })
      res.send('new file created on google drive.')
    }
    catch(err){
        res.send('could not make new file')

    }

    // const drive = await auth(id);
    // let file = await drive.files.create({
    //     requestBody: {
    //         name: 'NEW FILE C',
    //         mimeType: 'text/plain'
    //       },
    //       media: {
    //         mimeType: 'text/plain',
    //         body: req.body.input
    //       }
    //   })
    //   res.send('new file created on google drive.')
    // }
    // catch(err){
    //     res.send('could not make new file')
    // }
})




module.exports = router;


