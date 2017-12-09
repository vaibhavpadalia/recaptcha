var express = require('express');
var router = express.Router();
var controller = require('../controller/controller');

router.route('/v1/createUser')
    .post(controller.createUser);

router.route('/v1/getUser')
    .post(controller.getUser);

router.route('/v1/getDetails')
    .post(controller.getDetails);

router.route('/v1/verifyEmail')
    .put(controller.verifyEmail);

router.route('/v1/resetPassword')
    .put(controller.resetPassword);

router.route('/v1/changePassword')
    .put(controller.changePassword);

module.exports = router;