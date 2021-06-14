const { router } = require('express');

const UserEntry = require("../models/user");

const router = Router();

router.get('/', async(req, res, next) => {
    try {
        console.log('Getting Credentials');
        const loginEntry = new UserEntry(req.body);
        const credentialCheck = await UserEntry.findOne({
            // I have to test to find the right index, probably email[0].primary email
            email: loginEntry.emailData.primaryEmail,
        });
        if (!(credentialCheck)) {
            res.status(400);
            var error = 'User does not exist';
            next(error);
            // Unhash passoword
        } else if (credentialCheck[0].security.password != loginEntry.security.password) {
            res.status(400);
            var error = 'Passowrd does not match';
            next(error);
        }
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});

router.post('/register', async(req, res, next) => {
    try {
        console.log('Regeistering new user');
        const createdEntry = new UserEntry(req.body);
        const credentialCheck = await UserEntry.findOne({
            // I have to test to find the right index, probably email[0].primary email
            email: createdEntry.emailData.primaryEmail,
        });
        if (credentialCheck) {
            res.status(400);
            var error = 'User already exist';
            next(error);
        } else {
            var passwordHash = createdEntry.security.password;
            var userInstance = new UserEntry({
                fullName: createdEntry.fullName,
                emailData: [{
                    primaryEmail: createdEntry.emailData.primaryEmail,
                    secondaryEmail: createdEntry.emailData.secondaryEmail,
                }],
                security: [{
                    password: passwordHash,
                    securityQuestion1: createdEntry.security.securityQuestion1,
                    securityQuestion1: createdEntry.security.securityQuestion1Answer,
                    securityQuestion2: createdEntry.security.securityQuestion3,
                    securityQuestion2: createdEntry.security.securityQuestion2Answer,
                    securityQuestion3: createdEntry.security.securityQuestion3,
                    securityQuestion3: createdEntry.security.securityQuestion3Answer,
                }],
            });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;