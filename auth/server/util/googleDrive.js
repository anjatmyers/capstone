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

function createNotesFolder(auth){
    const drive = google.drive({version: 'v3', auth});

    let fileMetadataParent = {
        'name': 'Bootcamp Survival Guide',
        'mimeType': 'application/vnd.google-apps.folder'
    };

    drive.files.create({
        resource: fileMetadataParent,
        fields: 'id'
        }, async function (err, file) {
        if (err) {
          // Handle error
            console.error(err);
        } else {
            parentID = file.data.id
            console.log("File Name: ", file.config.data.name, " File ID: ", file.data.id);

            // let storedNotesFolder = await db.folderIDs.create({
            //     id: 1,
            //     folderID: file.data.id,
            //     folderName: file.config.data.name
            // })
        }
    });

}

function createJSFolder(auth){
    const drive = google.drive({version: 'v3', auth});
    let fileMetadata = {
        'name': 'JavaScript',
        'mimeType': 'application/vnd.google-apps.folder',
        parents: ['10ZSdhU1iA3H99MusuczcVMnspAakuRUz']
    };

    drive.files.create({
        resource: fileMetadata,
        fields: 'id'
        }, async function (err, file) {
        if (err) {
          // Handle error
            console.error(err);
        } else {
            console.log("File Name: ", file.config.data.name, " File ID: ", file.data.id);

            // let storedJSFolder = await db.userFolders.create({
            //     userID: 1,
            //     folderID: file.data.id,
            //     folderName: file.config.data.name
            // })
        }
    });

}

function createPYFolder(auth){
    const drive = google.drive({version: 'v3', auth});
    let fileMetadata = {
        'name': 'Python',
        'mimeType': 'application/vnd.google-apps.folder',
        parents: ['10ZSdhU1iA3H99MusuczcVMnspAakuRUz']
    };

    drive.files.create({
        resource: fileMetadata,
        fields: 'id'
        }, async function (err, file) {
        if (err) {
          // Handle error
            console.error(err);
        } else {
            console.log("File Name: ", file.config.data.name, " File ID: ", file.data.id);

            // let storedJSFolder = await db.userFolders.create({
            //     userID: 1,
            //     folderID: file.data.id,
            //     folderName: file.config.data.name
            // })
        }
    });

}

function createHTMLCSSFolder(auth){
    const drive = google.drive({version: 'v3', auth});
    let fileMetadata = {
        'name': 'HTML/CSS',
        'mimeType': 'application/vnd.google-apps.folder',
        parents: ['10ZSdhU1iA3H99MusuczcVMnspAakuRUz']
    };

    drive.files.create({
        resource: fileMetadata,
        fields: 'id'
        }, async function (err, file) {
        if (err) {
          // Handle error
            console.error(err);
        } else {
            console.log("File Name: ", file.config.data.name, " File ID: ", file.data.id);

            // let storedJSFolder = await db.userFolders.create({
            //     userID: 1,
            //     folderID: file.data.id,
            //     folderName: file.config.data.name
            // })
        }
    });

}

function createSQLFolder(auth){
    const drive = google.drive({version: 'v3', auth});
    let fileMetadata = {
        'name': 'SQL',
        'mimeType': 'application/vnd.google-apps.folder',
        parents: ['10ZSdhU1iA3H99MusuczcVMnspAakuRUz']
    };

    drive.files.create({
        resource: fileMetadata,
        fields: 'id'
        }, async function (err, file) {
        if (err) {
          // Handle error
            console.error(err);
        } else {
            console.log("File Name: ", file.config.data.name, " File ID: ", file.data.id);

            // let storedJSFolder = await db.userFolders.create({
            //     userID: 1,
            //     folderID: file.data.id,
            //     folderName: file.config.data.name
            // })
        }
    });

}

function trashFile(fileId) {

    const drive = google.drive({version: 'v3', auth});

    let request = drive.files.trash({
      'fileId': fileId
    });
    request.execute(function(resp) { });
    console.log("File moved to trash: ", fileId )
  }


const drive = {
    listFiles,
    createFile,
    createNotesFolder,
    createJSFolder,
    createPYFolder,
    createHTMLCSSFolder,
    createSQLFolder,
    trashFile
}

module.exports = drive;