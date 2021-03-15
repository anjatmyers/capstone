const { google } = require("googleapis");
const express = require('express');
const router = express.Router();
const db = require('../models');


async function createNotesFolder(auth, id){

    try{
        let fileMetadata = {
            'name': 'Bootcamp Survival Guide',
            'mimeType': 'application/vnd.google-apps.folder',
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
    catch(error){
        console.log(error)
    }
}

async function createJSFolder(auth, id){
    
    try{
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

                    let storedJSFolder = await db.folderIDs.update({
                                javascript: file.data.id
                            },
                            {where: {
                                id: id,
                            }})
                    }
            });
        }, 2000)
    } catch (error){
        console.log(error)
    }

}
async function createPYFolder(auth, id){
    
    try{
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

                    let storedPYFolder = await db.folderIDs.update({
                                python: file.data.id
                            },
                            {where: {
                                id: id,
                            }})
                    }
            });
        }, 2000)
    } catch(error){
        console.log(error)
    }

}
async function createHTMLCSSFolder(auth, id){

    try{
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

                    let storedHTMLCSSFolder = await db.folderIDs.update({
                                htmlcss: file.data.id
                            },
                            {where: {
                                id: id,
                            }})
                    }
            });
        }, 2000)
    } catch(error){
        console.log(error)
    }

}
async function createSQLFolder(auth, id){
    
    try{
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

                    let storedSQLFolder = await db.folderIDs.update({
                                sql: file.data.id
                            },
                            {where: {
                                id: id,
                            }})
                    }
            });
        }, 2000)
    } catch(error){
        console.log(error)
    }

}
async function createShellFolder(auth, id){

    try{
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

                    let storedShellFolder = await db.folderIDs.update({
                                shell: file.data.id
                            },
                            {where: {
                                id: id,
                            }})
                    }
            });
        }, 2000)
    } catch(error){
        console.log(error)
    }

}

async function createJSFile(auth, body, id, name){

    try{
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
    } catch(error){
        console.log(error)
    }
}

async function createPYFile(auth, body, id, name){

    try{
        setTimeout(async() => {

        
        let parentFolder = await db.folderIDs.findAll({where: {id: id}}, {raw: true})
        let parentID = parentFolder[0].dataValues.python

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
    } catch(error){
        console.log(error)
    }


}

async function createHTMLCSSFile(auth, body, id, name){

    try{
        setTimeout(async() => {

        
        let parentFolder = await db.folderIDs.findAll({where: {id: id}}, {raw: true})
        let parentID = parentFolder[0].dataValues.htmlcss


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
    } catch(error){
        console.log(error)
    }


}

async function createSQLFile(auth, body, id, name){

    try{
        setTimeout(async() => {

        
        let parentFolder = await db.folderIDs.findAll({where: {id: id}}, {raw: true})
        let parentID = parentFolder[0].dataValues.sql

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
    } catch(error){
        console.log(error)
    }
}

async function createShellFile(auth, body, id, name){

    try{
        setTimeout(async() => {

        
        let parentFolder = await db.folderIDs.findAll({where: {id: id}}, {raw: true})
        let parentID = parentFolder[0].dataValues.shell

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
    } catch(error){
        console.log(error)
    }
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