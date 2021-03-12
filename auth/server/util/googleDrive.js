const { google } = require("googleapis");
const express = require('express');
const router = express.Router();
const db = require('../models');


async function createNotesFolder(auth, id){

    let fileMetadata = {
        'name': 'Bootcamp Survival Guide',
        'mimeType': 'application/vnd.google-apps.folder',
        // parents: ['10ZSdhU1iA3H99MusuczcVMnspAakuRUz']
    };

    let masterFolder = await auth.files.create({
        resource: fileMetadata,
        fields: 'id'
        }, async function (err, file) {
        if (err) {
          // Handle error
            console.error(err);
        } else {
            console.log("File Name: ", file.config.data.name, " File ID: ", file.data.id);

            let storedMasterFolder = await db.folderIDs.update({
                        root: file.data.id
                    },
                    {where: {
                        id: id,
                    }})
            }
    });

}



async function createPYFolder(auth, id){

    let parentFolder = await db.folderIDs.findAll({where: {id: id}}, {raw: true})
    console.log(parentFolder[0].dataValues.root)
    let parentID = parentFolder[0].dataValues.root

    let fileMetadata = {
        'name': 'Python',
        'mimeType': 'application/vnd.google-apps.folder',
        parents: [parentID]
    };

    let pythonFolder = await auth.files.create({
        resource: fileMetadata,
        fields: 'id'
        }, async function (err, file) {
        if (err) {
          // Handle error
            console.error(err);
        } else {
            console.log("File Name: ", file.config.data.name, " File ID: ", file.data.id);

            let storedPYFolder = await db.folderIDs.update({
                        python: file.data.id
                    },
                    {where: {
                        id: id,
                    }})
            }
    });

}

async function createJSFolder(auth, id){

    let parentFolder = await db.folderIDs.findAll({where: {id: id}}, {raw: true})
    console.log("Inside create js folder function " + parentFolder[0].dataValues.root)
    let parentID = parentFolder[0].dataValues.root

    let fileMetadata = {
        'name': 'Javascript',
        'mimeType': 'application/vnd.google-apps.folder',
        parents: [parentID]
    };

    let jsFolder = await auth.files.create({
        resource: fileMetadata,
        fields: 'id'
        }, async function (err, file) {
        if (err) {
          // Handle error
            console.error("Making js folder error " + err);
        } else {
            console.log("File Name: ", file.config.data.name, " File ID: ", file.data.id);

            let storedJSFolder = await db.folderIDs.update({
                        javascript: file.data.id
                    },
                    {where: {
                        id: id,
                    }})
            }
    });

}

async function createPYFile(auth, body, id){

    let parentFolder = await db.folderIDs.findAll({where: {id: id}}, {raw: true})
    console.log(parentFolder[0].dataValues.python)
    let parentID = parentFolder[0].dataValues.python
    let date = new Date()

    // let fileMetadataParent = {
    //     'name': "Python",
    //     'mimeType': 'application/vnd.google-apps.folder'
    // };

    console.log(parentID)

    let file = await auth.files.create({
        requestBody: {
            name: date,
            mimeType: 'text/plain',
            parents: [parentID]
          },
          media: {
            mimeType: 'text/plain',
            body: body
          }
      })

}

async function createJSFile(auth, body, id){

    let parentFolder = await db.folderIDs.findAll({where: {id: id}}, {raw: true})
    console.log(parentFolder)
    console.log("Inside JS FIle function line 135 " + parentFolder[0].dataValues.javascript)
    let parentID = parentFolder[0].dataValues.javascript
    let date = new Date()

    // let fileMetadataParent = {
    //     'name': "Python",
    //     'mimeType': 'application/vnd.google-apps.folder'
    // };

    console.log(parentID)

    let file = await auth.files.create({
        requestBody: {
            name: date,
            mimeType: 'text/plain',
            parents: [parentID]
          },
          media: {
            mimeType: 'text/plain',
            body: body
          }
      })
    //   res.send('new file created on google drive.')

}






const drive = {
    createNotesFolder,
    createPYFolder,
    createPYFile,
    createJSFolder,
    createJSFile,
}

module.exports = drive;