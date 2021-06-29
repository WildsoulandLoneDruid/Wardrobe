const { Router } = require('express');

const UserEntry = require("../models/user");

const router = Router();

router.get('/', async(req, res, next) => {
    try {
        console.log(' Getting user Information');
        const loginEntry = new UserEntry(req.body);
        const credentialCheck = await UserEntry.findOne({
            // I have to test to find the right index, probably email[0].primary email
            "email.primaryEmail": loginEntry.email[0].primaryEmail,
            "security.password": loginEntry.security[0].password
        });
        if (credentialCheck != null) {
            res.status(400);
            var error = 'User does not exist';
            next(error);
        }
        // Unhash passoword
        bcrypt.compare(loginEntry.security[0].password, createdEntry.security[0].password, function(err, result) {
            // returns result
            if (result) {
                console.log("It matches!");
                res.status(200).json(credentialCheck);
            } else {
                var error = 'Invalid password!';
                console.log(error);
                res.status(400);
                next(error);
            }
        });
    } catch (error) {
        if (error.name === 'Validation Error') {
            res.status(422);
        }
        next(error);
    }
});

router.post('/register', async(req, res, next) => {
    try {
        var passwordHash = '';
        const createdEntry = new UserEntry(req.body);
        const credentialCheck = await UserEntry.findOne({
            // I have to test to find the right index, probably email[0].primary email
            "email.primaryEmail": createdEntry.email[0].primaryEmail
        });
        if (credentialCheck != null) {
            var error = 'User already exist';
            console.log(error);
            res.status(400);
            next(error);
        } else {
            console.log('Regeistering new user');
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(createdEntry.security[0].password, salt, function(err, hash) {
                    // Store hash in your password DB.
                    passwordHash = hash;
                });
            });
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
                var result = userInstance.fullName + 'has been succesfully added to the database'
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
router.post('/changePassword', async(req, res, next) => {
    try {
        console.log('change password endpoint');
        const {
            email,
            password
        } = req.body;

        const credentialCheck = await UserEntry.findOne({
            // I have to test to find the right index, probably email[0].primary email
            "email.primaryEmail": email
        }).excec(function(err, docs) {
            if (err) {
                next(err);
            }
        });
        if (credentialCheck[0].password.localeCompare(password) == 0) {
            err = "Password is the same as the previous password";
            next(err);
        } else {
            await userModel.findOneAndUpdate({
                "email": email
            }, {
                "$set": {
                    "password": password,
                }
            }.exec(function(err, docs) {
                if (err) {
                    next(err);
                    res.status(400);
                } else {
                    console.log('Updated Password: ' + docs);
                }
            }));
        }
    } catch (error) {
        next(error);
    }
});
router.post('/forgotPassword', async(req, res, next) => {
    try {
        console.log('forgot password endpoint');
        const {
            email,
            code
        } = req.body;
        const credentialCheck = await UserEntry.findOne({
            "email.primaryEmail": email
        }).excec(function(err, docs) {
            if (err) {
                next(err);
                res.status(422);
            }
            if (docs == null) {
                var err = 'User not found';
                res.status(400);
                next(err);
            }
        });
        var transporter = nodeMailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.GMAIL_USERNAME == null ? 'somerandome@gmail.com' : process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_PASSWORD == null ? '123456' : process.env.GMAIL_PASSWORD
            }
        });
        var mailOPtions = {
            from: process.env.GMAIL_USERNAME == null ? 'somerandome@gmail.com' : process.env.GMAIL_USERNAME,
            to: email,
            subject: 'Forgot Password Confirmation',
            text: 'Hello ' + credentialCheck[0].fullName + ' please input the following code ' + code + ' on the forgot password page. \nIf you did not request this change you can ignore this email.'
        }
        try {
            transporter.sendMail(mailOPtions, function(err, info) {
                if (err) {
                    next(err);
                    res.status(500);
                }
            });
        } catch (err) {
            next(err);
        }
    } catch (error) {
        next(error);
    }
}




});

module.exports = router;