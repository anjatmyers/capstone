const express = require('express');
const { language } = require('googleapis/build/src/apis/language');
const router = express.Router();
const db = require('../models');


router.post('/assessments', async (req, res) =>{
    let userID = req.body.userID
    let rating = req.body.rating
    let comment = req.body.comment
    let language = req.body.language

    try {
        console.log(language)
        const results = await db.assess.create({
            id: userID,
            language: language,
            rating: rating,
            comment: comment
        })
    } catch(error) {
        console.log(error)

    }
})

router.get('/assessments', async (req, res)=>{
    try {
        let language = req.body.language
        let assessInput = await db.assess.findAll({where:{language:language}},{raw: true});
        console.log(assessInput)
        res.json(assessInput)

    } catch(error){
        res.send(error)
    }
})




module.exports = router;