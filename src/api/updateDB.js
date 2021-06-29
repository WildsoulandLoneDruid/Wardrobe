const { Router } = require('express');

const UserEntry = require('../models/user');

const router = Router();

const util = require('./util');

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
            upsert).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('Added Wardobe: ' + docs.wardrobeData);
            }
        });
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
        }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('Deleted Wardobe: ' + docs.wardrobeData);
            }
        });
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});
router.post('/updateWardrobe', async(req, res, next) => {
    try {
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
            $set: {
                'wardrobeData.location': location
            }
        }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('Updated Wardobe: ' + docs.wardrobeData);
            }
        });
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
        }, upsert).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('Added Article Wardobe: ' + docs.wardrobeData.articleData);
                //updatecount
                util.updateNumberOfArticles(id_, wardrobeid_, articleEntry, type, 1);
            }
        })
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});

router.post('/removeArticle', async(req, res, next) => {
    try {
        /* 'id_' : ''*/
        const {
            id_,
            wardrobeid_,
            fullName,
            RFID,
        } = req.body;
        console.log('Removing Article to User:' + fullName);
        const articleEntry = await UserEntry.findOneAndDelete({
            'id_': id_,
            'wardrobeData.id': wardrobeid_,
            'RFID': RFID
        }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('Removed Article Wardobe: ' + docs.wardrobeData.articleData);
                //updatecount
                util.updateNumberOfArticles(id_, wardrobeid_, articleEntry, type, 0);
            }
        })
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});
//WOKRINGHERE
router.post('/UpdateArticle', async(req, res, next) => {
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
        console.log('Updating Article to User:' + fullName);
        await UserEntry.findOneAndUpdate({
            'id_': id_,
            'wardrobeData.id': wardrobeid_,
            'RFID': RFID
        }, {
            $set: {
                // I Need to work on this
                'wardrobeData.articleData.color': color,
                'wardrobeData.articleData.type': type,
            }
        }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('Updated Article Wardobe: ' + docs.wardrobeData.articleData);
            }
        })
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});

router.post('/UpdateTimesUsed', async(req, res, next) => {
    try {
        const {
            id_,
            wardrobeid_,
            fullName,
            RFID,
        } = req.body;
        console.log('Updating Time Used Article to User:' + fullName + 'and article' + RFID);
        const articleEntry = await UserEntry.findOneAndUpdate({
                'id_': id_,
                'wardrobeData.id': wardrobeid_,
                'RFID': RFID
            }, {
                $set: {
                    // I Need to work on this
                    'wardrobeData.articleData.timesUsed': articleEntry[0].wardrobeData[0].timesUsed++,
                    'wardrobeData.articleData.status': !(articleEntry[0].wardrobeData[0].status),
                }
            }).sort({ 'timesUsed': "desc" })
            .exec(function(err, docs) {
                if (err) {
                    next(err);
                } else {
                    console.log('Updated Article Wardobe: ' + docs.wardrobeData.articleData);
                }
            });
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});
module.exports = router;