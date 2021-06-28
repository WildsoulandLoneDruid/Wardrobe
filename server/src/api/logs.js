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