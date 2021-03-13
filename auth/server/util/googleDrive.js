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

    let root = {};

    await auth.files.create({
        resource: fileMetadata,
        fields: 'id'
        }, async function (err, file) {
        if (err) {
          // Handle error
            console.error(err);
        } else {
            console.log("File Name: ", file.config.data.name, " File ID: ", file.data.id);

            await db.folderIDs.update({
                        root: file.data.id
                    },
                    {where: {
                        id: id,
                    }})
            root.id = file.data.id
        }
        
            
    });
}

async function createJSFolder(auth, id){
    
    setTimeout(async() => {
        const parentFolder = await db.folderIDs.findAll({where: {id: id}}, {raw: true});
        const parentID = parentFolder[0].dataValues.root
        
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
    }, 2000)

}
async function createPYFolder(auth, id){
    
    setTimeout(async() => {
        const parentFolder = await db.folderIDs.findAll({where: {id: id}}, {raw: true});
        const parentID = parentFolder[0].dataValues.root

        let fileMetadata = {
            'name': 'Python',
            'mimeType': 'application/vnd.google-apps.folder',
            parents: [parentID]
        };

        let pyFolder = await auth.files.create({
            resource: fileMetadata,
            fields: 'id'
            }, async function (err, file) {
            if (err) {
            // Handle error
                console.error("Making js folder error " + err);
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
    }, 2000)

}
async function createHTMLCSSFolder(auth, id){
    
    setTimeout(async() => {
        const parentFolder = await db.folderIDs.findAll({where: {id: id}}, {raw: true});
        const parentID = parentFolder[0].dataValues.root

        let fileMetadata = {
            'name': 'HTML/CSS',
            'mimeType': 'application/vnd.google-apps.folder',
            parents: [parentID]
        };

        let htmlcssFolder = await auth.files.create({
            resource: fileMetadata,
            fields: 'id'
            }, async function (err, file) {
            if (err) {
            // Handle error
                console.error("Making js folder error " + err);
            } else {
                console.log("File Name: ", file.config.data.name, " File ID: ", file.data.id);

                let storedHTMLCSSFolder = await db.folderIDs.update({
                            htmlcss: file.data.id
                        },
                        {where: {
                            id: id,
                        }})
                }
        });
    }, 2000)

}
async function createSQLFolder(auth, id){
    
    setTimeout(async() => {
        const parentFolder = await db.folderIDs.findAll({where: {id: id}}, {raw: true});
        const parentID = parentFolder[0].dataValues.root

        let fileMetadata = {
            'name': 'SQL',
            'mimeType': 'application/vnd.google-apps.folder',
            parents: [parentID]
        };

        let sqlFolder = await auth.files.create({
            resource: fileMetadata,
            fields: 'id'
            }, async function (err, file) {
            if (err) {
            // Handle error
                console.error("Making js folder error " + err);
            } else {
                console.log("File Name: ", file.config.data.name, " File ID: ", file.data.id);

                let storedSQLFolder = await db.folderIDs.update({
                            sql: file.data.id
                        },
                        {where: {
                            id: id,
                        }})
                }
        });
    }, 2000)

}
async function createShellFolder(auth, id){
    
    setTimeout(async() => {
        const parentFolder = await db.folderIDs.findAll({where: {id: id}}, {raw: true});
        const parentID = parentFolder[0].dataValues.root

        let fileMetadata = {
            'name': 'Shell',
            'mimeType': 'application/vnd.google-apps.folder',
            parents: [parentID]
        };

        let shellFolder = await auth.files.create({
            resource: fileMetadata,
            fields: 'id'
            }, async function (err, file) {
            if (err) {
            // Handle error
                console.error("Making js folder error " + err);
            } else {
                console.log("File Name: ", file.config.data.name, " File ID: ", file.data.id);

                let storedShellFolder = await db.folderIDs.update({
                            shell: file.data.id
                        },
                        {where: {
                            id: id,
                        }})
                }
        });
    }, 2000)

}

async function createJSFile(auth, body, id, name){

    setTimeout(async() => {

    
    let parentFolder = await db.folderIDs.findAll({where: {id: id}}, {raw: true})
    let parentID = parentFolder[0].dataValues.javascript

    let file = await auth.files.create({
        requestBody: {
            name: `${name}.js`,
            mimeType: 'text/plain',
            parents: [parentID]
          },
          media: {
            mimeType: 'text/plain',
            body: body
          }
      })
    }, 3000)


}

async function createPYFile(auth, body, id, name){

    setTimeout(async() => {

    
    let parentFolder = await db.folderIDs.findAll({where: {id: id}}, {raw: true})
    let parentID = parentFolder[0].dataValues.python

    console.log(parentID)

    let file = await auth.files.create({
        requestBody: {
            name: `${name}.py`,
            mimeType: 'text/plain',
            parents: [parentID]
          },
          media: {
            mimeType: 'text/plain',
            body: body
          }
      })
    }, 3000)


}

async function createHTMLCSSFile(auth, body, id, name){

    setTimeout(async() => {

    
    let parentFolder = await db.folderIDs.findAll({where: {id: id}}, {raw: true})
    let parentID = parentFolder[0].dataValues.htmlcss

    console.log(parentID)

    let file = await auth.files.create({
        requestBody: {
            name: `${name}.html`,
            mimeType: 'text/plain',
            parents: [parentID]
          },
          media: {
            mimeType: 'text/plain',
            body: body
          }
      })
    }, 3000)


}

async function createSQLFile(auth, body, id, name){

    setTimeout(async() => {

    
    let parentFolder = await db.folderIDs.findAll({where: {id: id}}, {raw: true})
    let parentID = parentFolder[0].dataValues.sql

    console.log(parentID)

    let file = await auth.files.create({
        requestBody: {
            name: name,
            mimeType: 'text/plain',
            parents: [parentID]
          },
          media: {
            mimeType: 'text/plain',
            body: body
          }
      })
    }, 3000)
}

async function createShellFile(auth, body, id, name){

    setTimeout(async() => {

    
    let parentFolder = await db.folderIDs.findAll({where: {id: id}}, {raw: true})
    let parentID = parentFolder[0].dataValues.shell

    console.log(parentID)

    let file = await auth.files.create({
        requestBody: {
            name: name,
            mimeType: 'text/plain',
            parents: [parentID]
          },
          media: {
            mimeType: 'text/plain',
            body: body
          }
      })
    }, 3000)
}







const drive = {
    createNotesFolder,
    createJSFolder,
    createPYFolder,
    createHTMLCSSFolder,
    createSQLFolder,
    createShellFolder,
    createPYFile,
    createJSFile,
    createHTMLCSSFile,
    createSQLFile,
    createShellFile,
}

module.exports = drive;