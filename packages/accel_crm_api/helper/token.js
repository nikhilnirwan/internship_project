let jwt = require('jsonwebtoken');
let config = require('../config.json');
var mongoose = require('mongoose');
let ERROR = require('./errorMessage');
let log = require('./logger');
var userSession = mongoose.model('UserSession');

module.exports = {
  encrypt: function (req, user) {
    console.log("user", user)
    return new Promise((resolve, reject) => {
      userSession.deleteMany({
        userId: user._id
      })
        .then(resSessionUpdate => {
          var data = {
            userId: user._id,
            userAgent: req.get('User-Agent'),
          }
          var userSessionAdd = new userSession(data);
          user['sessionId'] = userSessionAdd._id;
          userSessionAdd.userToken = 'JWT ' + jwt.sign(user, config.secretKey);
          userSessionAdd.save()
            .then(resSession => {
              resolve({
                token: resSession.userToken
              });
            }).catch(error => {
              log.debug(error);
              reject(ERROR.SOMETHING_WENT_WRONG);
            })
        }).catch(error => {
          log.debug(error);
          reject(ERROR.SOMETHING_WENT_WRONG);
        })
    })
  },
  decrypt: function (req, userToken) {
    return new Promise((resolve, reject) => {
      var userData = jwt.verify(userToken, config.secretKey);
      userSession.findOne({
        _id: userData.sessionId,
        status: {
          $ne: 'deleted'
        },
        userAgent: req.get('User-Agent')
      }).then(resData => {
        if (resData) {
          req['userId'] = userData._id;
          req['sessionId'] = userData.sessionId;
          req['designation'] = userData.designation;
          req['role'] = userData.role;
          resolve()
        } else {
          reject(ERROR.UNAUTHORIZED);
        }
      }).catch(error => {
        log.error(error);
        reject(ERROR.SOMETHING_WENT_WRONG);
      })
    })
  }
};