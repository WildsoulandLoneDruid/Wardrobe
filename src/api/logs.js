const { Router } = require('express');

const UserEntry = require("../models/user");

const router = Router();

router.get('/', async(req, res, next) => {
    try {
        const entries = await UserEntry.find();
        res.json(entries);
    } catch (error) {
        next(error);
    }
});

router.get('/getSpecificWardrobe', async(req, res, next) => {
    try {
        const {
            id_,
            wardrobeid_,
        } = req.body;
        const articleEntry = await UserEntry.find({
            'id_': id_,
            'wardrobeData.id': wardrobeid_,
        }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('User Wardobe: ' + docs.wardrobeData);
            }
        })
    } catch (error) {
        res.status(422);
        next(error);
    }
});


// https://stackoverflow.com/questions/5830513/how-do-i-limit-the-number-of-returned-items

router.post('/', async(req, res, next) => {
    try {
        console.log(req.body);
        const userEntry = new UserEntry(req.body);
        const createdEntry = await userEntry.save();
        res.json(createdEntry);
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});

module.exports = router;