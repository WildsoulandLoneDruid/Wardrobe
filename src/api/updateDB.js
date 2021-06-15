const { router } = require('express');

const UserEntry = require("../models/user");

const router = Router();

router.get('/', (req, res, next) => {
    try {
        const entries = await UserEntry.find();
        res.json(entries);
    } catch (error) {
        next(error);
    }
});

router.post('/addArticle', async(req, res, next) => {
    try {
        const articleEntry = new UserEntry(req.body);
        const createdEntry = await userEntry.findOneAndUpdate({



        });
        //res.json(createdEntry);
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});

module.exports = router;