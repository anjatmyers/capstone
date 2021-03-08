const { google } = require("googleapis");
const express = require('express');
const router = express.Router();


function listFiles(auth) {
    const drive = google.drive({version: 'v3', auth});
    drive.files.list({pageSize: 10, fields: 'nextPageToken, files(id, name)'})
    .then(res =>{
        const files = res.data.files;
        if (files.length) {
            console.log('Files:');
            files.map((file) => {
            console.log(`${file.name} (${file.id})`);
            });
        } else {
            console.log('No files found.');
        }
    })
    .catch(err =>{
        console.log('The API returned an error: ' + err)
    })}


function createFile(auth){
    const drive = google.drive({version: 'v3', auth});
    drive.files.create({
        requestBody: {
            name: 'Test',
            mimeType: 'text/plain'
          },
          media: {
            mimeType: 'text/plain',
            body: 'Hello World. Creating a file from the terminal.'
          }
      })
      .then(res =>{
        console.log(res.data);
      })
      .catch(err =>{
        console.log(err);
      })
}


const drive = {
    listFiles,
    createFile
}

module.exports = drive;