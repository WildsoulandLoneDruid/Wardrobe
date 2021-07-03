const { Router } = require('express');

const UserEntry = require('../models/user');

const router = Router();

const util = require('./util');

router.post('/addWardrobe', async(req, res, next) => {
    try {
        /* '_id' : ''*/
        const {
            _id,
            wardrobe_id,
            fullName,
            location,
        } = req.body;
        console.log('Adding Wardrobe to User: ' + fullName);
        await UserEntry.findOneAndUpdate({
                '_id': _id,
                'wardrobeData._id': wardrobe_id
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
        /* '_id' : ''*/
        const {
            _id,
            wardrobe_id,
            fullName,
        } = req.body;
        console.log('Deleting Wardrobe to User: ' + fullName);
        await UserEntry.findOneAndDelete({
            '_id': _id,
            'wardrobeData._id': wardrobe_id
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
            _id,
            wardrobe_id,
            fullName,
            location,
        } = req.body;
        console.log('Adding Wardrobe to User: ' + fullName);
        await UserEntry.findOneAndUpdate({
            '_id': _id,
            'wardrobeData._id': wardrobe_id
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
        /* '_id' : ''*/
        const {
            _id,
            wardrobe_id,
            fullName,
            RFID,
            color,
            type
        } = req.body;
        console.log('Adding Article to User:' + fullName);
        var update = util.updateNumberOfArticles(articleCheck, type, 1);
        const articleEntry = await UserEntry.findOneAndUpdate({
            '_id': _id,
            'wardrobeData._id': wardrobe_id
        }, {
            $push: {
                'wardrobeData.articleData.RFID': RFID,
                'wardrobeData.articleData.color': color,
                'wardrobeData.articleData.type': type,
                'wardrobeData.totalNumberOfShirts': update.updateNumberOfShirts,
                'wardrobeData.totalNumberOfPants': update.totalNumberofPants,
                'wardrobeData.totalNumberOfArticles': update.totalNumberofPants + update.totalNumberofShirts,
            }
        }, upsert).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('Added Article Wardobe: ' + docs.wardrobeData.articleData);
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
        /* '_id' : ''*/
        const {
            _id,
            wardrobe_id,
            fullName,
            RFID,
        } = req.body;
        console.log('Removing Article to User:' + fullName);
        const articleCheck = await UserEntry.find({
            '_id': _id,
            'wardrobeData._id': wardrobe_id
        });
        var update = util.updateNumberOfArticles(articleCheck, type, 0);
        await UserEntry.findOneAndUpdate({
            '_id': _id,
            'wardrobeData._id': wardrobe_id,
        }, {
            $set: {
                'wardrobeData.totalNumberOfShirts': update.updateNumberOfShirts,
                'wardrobeData.totalNumberOfPants': update.totalNumberofPants,
                'wardrobeData.totalNumberOfArticles': update.totalNumberofPants + update.totalNumberofShirts,
            }
        }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('Updated Article Wardobe: ' + docs.wardrobeData.articleData);
            }
        })
        await UserEntry.findOneAndDelete({
            '_id': _id,
            'wardrobeData._id': wardrobe_id,
            'RFID': RFID
        }).exec(function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('Removed Article Wardobe: ' + docs.wardrobeData.articleData);
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
        /* '_id' : ''*/
        const {
            _id,
            wardrobe_id,
            fullName,
            RFID,
            color,
            type
        } = req.body;
        console.log('Updating Article to User:' + fullName);
        await UserEntry.findOneAndUpdate({
            '_id': _id,
            'wardrobeData._id': wardrobe_id,
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
        });
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
            _id,
            wardrobe_id,
            fullName,
            RFID,
        } = req.body;
        console.log('Updating Time Used Article to User:' + fullName + 'and article' + RFID);
        const articleEntry = await UserEntry.findOneAndUpdate({
                '_id': _id,
                'wardrobeData._id': wardrobe_id,
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