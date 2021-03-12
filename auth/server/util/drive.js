const fs = require('fs');
const { google } = require("googleapis");
const keys = require('./config');
const db = require('../models');
const { stringify } = require('querystring');
const createToken=()=>{
    //create toke and store it
}
const getDriveObj = async (userID) => {
  //use userID to get drive, or to get
  //if token exists 
  const userToken = await db.auth.findAll({where: {userID: userID}, order:[ ['id', 'DESC']]}, {raw: true});
//   const TOKEN = "1//01jY34zsWA5hHCgYIARAAGAESNwF-L9Irgoj7irdMJqno2IX4tVJDvlBEoUbb09l5qZXAlFHhFBe1CPkXPx0tu-2vVTGOoP7H1wc"
  const TOKENOBJ = {
    token: userToken[0].dataValues.token,
    refresh_token: userToken[0].dataValues.refresh_token,
    scope: userToken[0].dataValues.scope,
    token_type: userToken[0].dataValues.token_type,
    expiry_date: userToken[0].dataValues.expiry_date
  }
//   token: string, refresh_token: string, scope: string, token_type: string: expiry_date: integer
//   {"access_token":"ya29.a0AfH6SMDNosA4yH5lZP0CKzs87HPKvZfrERxNexDci0fqpTcKWOlYS0TzGoY_niJR_SkbbCpAdhw7XxyWLmNe8RW2wHegI5FIZtxcqLy80rYU8cAGOQsXOlFwJJUK3piPRsFDd1U9pfrUFjm0p6gL5to2hLQM","refresh_token":"1//01pfP9uZm2ZyYCgYIARAAGAESNwF-L9IrVW46XGfyt3M1JyD53V9_nJhX5w8psPChaMPTKKbOzfgkUluTpr_IIvOAzRpccfpNZMM","scope":"https://www.googleapis.com/auth/drive","token_type":"Bearer","expiry_date":1615420909370}
const TOKEN = `{"access_token":"${TOKENOBJ.token}","refresh_token":"${TOKENOBJ.refresh_token}","scope":"${TOKENOBJ.scope}","token_type":"${TOKENOBJ.token_type}","expiry_date": 1615420909370}`;
// console.log("JSON PARSED TOKEN", JSON.parse(TOKEN))
// const TOKEN = `{"access_token":"ya29.a0AfH6SMDNosA4yH5lZP0CKzs87HPKvZfrERxNexDci0fqpTcKWOlYS0TzGoY_niJR_SkbbCpAdhw7XxyWLmNe8RW2wHegI5FIZtxcqLy80rYU8cAGOQsXOlFwJJUK3piPRsFDd1U9pfrUFjm0p6gL5to2hLQM","refresh_token":"1//01pfP9uZm2ZyYCgYIARAAGAESNwF-L9IrVW46XGfyt3M1JyD53V9_nJhX5w8psPChaMPTKKbOzfgkUluTpr_IIvOAzRpccfpNZMM","scope":"https://www.googleapis.com/auth/drive","token_type":"Bearer","expiry_date":1615420909370}`;
  const oAuth2Client = new google.auth.OAuth2(
    keys.client_id, keys.client_secret, keys.redirect_uris[0]);
  //get access token from database
    console.log('***********************')
    console.log("ACCESS TOKEN: 35 version2", TOKEN);
    oAuth2Client.setCredentials(JSON.parse(TOKEN));
    const drive = google.drive({
        version: 'v3',
        auth: oAuth2Client
    });
    // drive.files.list({
    //     pageSize: 10,
    //     fields: 'nextPageToken, files(id, name)',
    //   }, (err, res) => {
    //     if (err) return console.log('The API returned an error: ' + err);
    //     const files = res.data.files;
    //     if (files.length) {
    //       console.log('Files:');
    //       files.map((file) => {
    //         console.log(`${file.name} (${file.id})`);
    //       });
    //     } else {
    //       console.log('No files found.');
    //     }
    //   });
    return drive;
};
module.exports = getDriveObj;


// const fs = require('fs');
// const { google } = require("googleapis");
// const keys = require('./config');
// const db = require('../');
// const { stringify } = require('querystring');

// const createToken=()=>{
//     //create toke and store it
// }


// const getDriveObj = async (userID) => {

  
//   //use userID to get drive, or to get
//   //if token exists 
//   const userToken = await db.auth.findAll({where: {id: userID}}, {raw: true});
//   console.log("user token here: *********",userToken[0])
// //   const TOKEN = "1//01jY34zsWA5hHCgYIARAAGAESNwF-L9Irgoj7irdMJqno2IX4tVJDvlBEoUbb09l5qZXAlFHhFBe1CPkXPx0tu-2vVTGOoP7H1wc"
//   const TOKENOBJ = {
//     token: userToken[0].dataValues.token,
//     refresh_token: userToken[0].dataValues.refresh_token,
//     scope: userToken[0].dataValues.scope,
//     token_type: userToken[0].dataValues.token_type,
//     expiry_date: userToken[0].dataValues.expiry_date
//   }
// //   token: string, refresh_token: string, scope: string, token_type: string: expiry_date: integer

// //   {"access_token":"ya29.a0AfH6SMDNosA4yH5lZP0CKzs87HPKvZfrERxNexDci0fqpTcKWOlYS0TzGoY_niJR_SkbbCpAdhw7XxyWLmNe8RW2wHegI5FIZtxcqLy80rYU8cAGOQsXOlFwJJUK3piPRsFDd1U9pfrUFjm0p6gL5to2hLQM","refresh_token":"1//01pfP9uZm2ZyYCgYIARAAGAESNwF-L9IrVW46XGfyt3M1JyD53V9_nJhX5w8psPChaMPTKKbOzfgkUluTpr_IIvOAzRpccfpNZMM","scope":"https://www.googleapis.com/auth/drive","token_type":"Bearer","expiry_date":1615420909370}


// const TOKEN = `{"access_token":"${TOKENOBJ.token}","refresh_token":"${TOKENOBJ.refresh_token}","scope":"${TOKENOBJ.scope}","token_type":"${TOKENOBJ.token_type}","expiry_date": 1615420909370}`;
// // console.log("JSON PARSED TOKEN", JSON.parse(TOKEN))

// // const TOKEN = `{"access_token":"ya29.a0AfH6SMDNosA4yH5lZP0CKzs87HPKvZfrERxNexDci0fqpTcKWOlYS0TzGoY_niJR_SkbbCpAdhw7XxyWLmNe8RW2wHegI5FIZtxcqLy80rYU8cAGOQsXOlFwJJUK3piPRsFDd1U9pfrUFjm0p6gL5to2hLQM","refresh_token":"1//01pfP9uZm2ZyYCgYIARAAGAESNwF-L9IrVW46XGfyt3M1JyD53V9_nJhX5w8psPChaMPTKKbOzfgkUluTpr_IIvOAzRpccfpNZMM","scope":"https://www.googleapis.com/auth/drive","token_type":"Bearer","expiry_date":1615420909370}`;

  

//   const oAuth2Client = new google.auth.OAuth2(
//     keys.client_id, keys.client_secret, keys.redirect_uris[0]);

//   //get access token from database
//     console.log('***********************')
//     console.log("ACCESS TOKEN: 35 version2", TOKEN);
//     oAuth2Client.setCredentials(JSON.parse(TOKEN));
       
//     const drive = google.drive({
//         version: 'v3',
//         auth: oAuth2Client
//     });

//     // drive.files.list({
//     //     pageSize: 10,
//     //     fields: 'nextPageToken, files(id, name)',
//     //   }, (err, res) => {
//     //     if (err) return console.log('The API returned an error: ' + err);
//     //     const files = res.data.files;
//     //     if (files.length) {
//     //       console.log('Files:');
//     //       files.map((file) => {
//     //         console.log(`${file.name} (${file.id})`);
//     //       });
//     //     } else {
//     //       console.log('No files found.');
//     //     }
//     //   });
   
    
//     return drive;

// };

// module.exports = getDriveObj;