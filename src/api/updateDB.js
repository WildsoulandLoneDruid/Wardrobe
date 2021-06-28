const { Router } = require('express');

const UserEntry = require('../models/user');

const router = Router();

router.post('/addWardrobe', async(req, res, next) => {
    try {
        /* 'id_' : ''*/
        const {
            id_,
            wardrobeid_,
            fullName,
            location,
        } = req.body;
        console.log('Adding Wardrobe to User: ' + fullName);
        await UserEntry.findOneAndUpdate({
                    'id_': id_,
                    'wardrobeData.id': wardrobeid_
                }, {
                    $push: {
                        // I Need to work on this
                        'wardrobeData.location': location
                    }
                },
                upsert),
            function(err, docs) {
                if (err) {
                    next(err);
                } else {
                    console.log('Added Wardobe: ' + docs.wardrobeData);
                }
            };
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});
router.post('/deleteWardrobe', async(req, res, next) => {
    try {
        /* 'id_' : ''*/
        const {
            id_,
            wardrobeid_,
            fullName,
        } = req.body;
        console.log('Deleting Wardrobe to User: ' + fullName);
        await UserEntry.findOneAndDelete({
                'id_': id_,
                'wardrobeData.id': wardrobeid_
            }),
            function(err, docs) {
                if (err) {
                    next(err);
                } else {
                    console.log('Deleted Wardobe: ' + docs.wardrobeData);
                }
            };
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});
router.post('/updateWardrobe', async(req, res, next) => {
    try {
        /* 'id_' : ''*/
        const {
            id_,
            wardrobeid_,
            fullName,
            location,
        } = req.body;
        const wardrobeEntry = new UserEntry(req.body);
        console.log('Adding Wardrobe to User: ' + fullName);
        await UserEntry.findOneAndUpdate({
                'id_': id_,
                'wardrobeData.id': wardrobeid_
            }, {
                $set: {
                    'wardrobeData.location': location
                }
            }),
            function(err, docs) {
                if (err) {
                    next(err);
                } else {
                    console.log('Updated Wardobe: ' + docs.wardrobeData);
                }
            };
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});
router.post('/addArticle', async(req, res, next) => {
    try {
        /* 'id_' : ''*/
        const {
            id_,
            wardrobeid_,
            fullName,
            RFID,
            color,
            type
        } = req.body;
        console.log('Adding Article to User:' + fullName);
        const articleEntry = await UserEntry.findOneAndUpdate({
                'id_': id_,
                'wardrobeData.id': wardrobeid_
            }, {
                $push: {
                    // I Need to work on this
                    'wardrobeData.articleData.RFID': RFID,
                    'wardrobeData.articleData.color': color,
                    'wardrobeData.articleData.type': type,
                }
            }, upsert),
            function(err, docs) {
                if (err) {
                    next(err);
                } else {
                    console.log('Added Article Wardobe: ' + docs.wardrobeData.articleData);
                    //updatecount
                }
            };
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});
router.post('/changePassword', async(req, res, next) => {});
router.post('/forgotPassword', async(req, res, next) => {});

module.exports = router;