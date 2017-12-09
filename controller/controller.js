var mongoose = require('mongoose');
var User = mongoose.model('userData');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vaibhavpadalia1996@gmail.com',
        pass: 'P@$sw0rdanon'
    }
});


exports.createUser = (req, res) => {
    console.log('Inside create user');  // For testing purpose only
    let hash = bcrypt.hashSync(req.body.password, 10);
    var user = new User({
        email: req.body.email,
        name: req.body.name,
        verified: req.body.verified,
        verifyToken: Math.random().toString(36).substring(3),
        password: hash,
        created_at: new Date(),
        updated_at: ""
    });
    user.save((error, response) => {
        if (error) {
            res.json({
                success: false,
                body: error
            });
        }
        else {
            transporter.sendMail({
                from: 'vaibhavpadalia1996@gmail.com',
                to: req.body.email,
                subject: 'Verify Email.',
                text: 'Thankyou for signing up with us. Your verification code is ' + req.body.password
            },
                (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            res.json({
                success: true,
            });
        }
    });
}

exports.getUser = (req, res) => {
    var email = req.body.email;
    User.findOne({ email: email }, (error, response) => {
        if (response !== null) {
            if (bcrypt.compareSync(req.body.password, response.password)) {
                return res.send({
                    success: true,
                    email: email
                });
            }
            else {
                return res.send({
                    success: false,
                    error: error
                });
            }
        }
        else {
            return res.send({
                success: false,
                error: error
            });
        }
    });
}

exports.getDetails = (req, res) => {
    User.findOne({email: req.body.email},(error, response) =>{
        if(error) {
            res.json(error);
        }
        else {
            res.json({
            success: true,
            name: response.name,
            verified: response.verified,
            verifyToken: response.verifyToken
            })
        }
    });
}

exports.verifyEmail = (req, res) => {
    User.findOne({email: req.body.email},(error, ans) => {
        if(error) {
            res.json({
                success: false,
                error: error
            });
        }
        else {
            ans.verified= 'Yes';
            ans.updated_at = new Date();
            ans.save((err, response) => {
                if(err) {
                    res.json({
                        success: false,
                        error: error
                    });
                }
                else {
                    res.json({
                        success: true,
                        body: 'Values Changed'
                    });
                }
            })
        }
    });
}

exports.changePassword = (req, res) => {
    console.log('In change Password');
    User.findOne({ email: req.body.email }, (error, user) => {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            console.log('passwords match');
            user.password = bcrypt.hashSync(req.body.newPassword, 10);
            user.updated_at = new Date();
            user.save((err, response) => {
                if (err) {
                    res.json({
                        success: false,
                        error: error
                    });
                }
                else {
                    res.json({
                        success: true,
                        body: response
                    });
                }
            });
        }
        else {
            res.json({
                success: false,
                error: error
            });
        }
    });
}

exports.resetPassword = (req, res) => {
    console.log('In change Password');
    User.findOne({ email: req.body.email }, (error, user) => {
        if (error) {
            res.json({
                success: false,
                error: error
            });
        }
        else {
            user.password = bcrypt.hashSync(req.body.password, 10);
            user.updated_at = new Date();
            user.save((err, response) => {
                if(err) {
                res.json({
                    success: false,
                    error: err
                });
            } else {
                    transporter.sendMail({
                        from: 'vaibhavpadalia1996@gmail.com',
                        to: req.body.email,
                        subject: 'Reset Password ',
                        text: 'Thankyou for signing up with us. Your reset password is ' + req.body.password
                    },
                        (er, info) => {
                            if (error) {
                                console.log(er);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                res.json({
                    success: true,
                    body: response
                });
            }
            });
        }
    });
}