const { Router } = require('express');

const UserEntry = require("../models/user");

const router = Router();

// router.get('/', async(req, res, next) => {
//     try {
//         console.log('Getting Credentials');
//         const loginEntry = new UserEntry(req.body);
//         const credentialCheck = await UserEntry.findOne({
//             // I have to test to find the right index, probably email[0].primary email
//             email: loginEntry.emailData.primaryEmail,
//         });
//         if (!(credentialCheck)) {
//             res.status(400);
//             var error = 'User does not exist';
//             next(error);
//             // Unhash passoword
//         } else if (credentialCheck[0].security.password != loginEntry.security.password) {
//             res.status(400);
//             var error = 'Passoword does not match';
//             next(error);
//         } else {
//             //Check If ID is getting returned
//             console.log('Returning User Info')
//             var logInInfo = {
//                 fullName = credentialCheck[0].fullName,
//                 email = credentialCheck[0].emailData.primaryEmail,
//             }
//             res.status(200).json(logInInfo);
//         }
//     } catch (error) {
//         if (error.name === 'Validation Error') {
//             res.status(422);
//         }
//         next(error);
//     }
// });

router.post('/register', async(req, res, next) => {
    try {
        const createdEntry = new UserEntry(req.body);
        const credentialCheck = await UserEntry.findOne({
            // I have to test to find the right index, probably email[0].primary email
            "email.primaryEmail" : createdEntry.email[0].primaryEmail
        });
        if (credentialCheck != null) {
            var error = 'User already exist';
            console.log(error);
            res.status(400);
            next(error);
        } else {
            console.log('Regeistering new user');
            var passwordHash = createdEntry.security[0].password;
            var userInstance = new UserEntry({
                fullName: createdEntry.fullName,
                email: [{
                    primaryEmail: createdEntry.email[0].primaryEmail,
                    secondaryEmail: createdEntry.email[0].secondaryEmail,
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
            try {
                await userInstance.save();
                var result = userInstance.fullName + ' has been succesfully added to the database'
                console.log(result);
                var ret = {
                    result: result,
                }
                res.status(200).json(ret);
            } catch (error) {
                next(error)
            }
        }
    } catch (error) {
        next(error);
    }
});

router.post('/changePassword', async(req, res, next) => {});
router.post('/forgotPassword', async(req, res, next) => {});

module.exports = router;