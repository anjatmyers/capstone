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
  const TOKENOBJ = {
    token: userToken[0].dataValues.token,
    refresh_token: userToken[0].dataValues.refresh_token,
    scope: userToken[0].dataValues.scope,
    token_type: userToken[0].dataValues.token_type,
    expiry_date: userToken[0].dataValues.expiry_date
  }
const TOKEN = `{"access_token":"${TOKENOBJ.token}","refresh_token":"${TOKENOBJ.refresh_token}","scope":"${TOKENOBJ.scope}","token_type":"${TOKENOBJ.token_type}","expiry_date": 1615420909370}`;
  const oAuth2Client = new google.auth.OAuth2(
    keys.client_id, keys.client_secret, keys.redirect_uris[0]);
  //get access token from database
    oAuth2Client.setCredentials(JSON.parse(TOKEN));
    const drive = google.drive({
        version: 'v3',
        auth: oAuth2Client
    });
   
    return drive;
};
module.exports = getDriveObj;
