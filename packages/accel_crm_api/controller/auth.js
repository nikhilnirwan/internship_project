let mongoose = require("mongoose");
let connection = require("../helper/database");
let log = require("../helper/logger");
let ERRORS = require("../helper/errorMessage");
let User = mongoose.model("User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const emailHelper = require("../helper/email");
const forgotPassword = require("../helper/otp");
const config = require("../config.json");
const customMessages = require("../helper/customMessages");
let userSession = mongoose.model("UserSession");

module.exports = {
  register: (data) => {
    let password = data.password;
    return new Promise((resolve, reject) => {
      let passCode = forgotPassword.generatePassword(21);

      log.debug("register");
      User.findOne({
        email: data.email,
      })
        .then((resUser) => {
          console.log("resUser", resUser);
          if (resUser) {
            reject(ERRORS.USER_ALREADY_REGISTERED);
          } else {
            bcrypt.genSalt(saltRounds, function (err, salt) {
              bcrypt.hash(data.password, salt, function (err, hash) {
                data["password"] = hash;
                var user = new User({ ...data, emailVerificationCode: passCode, isEmailVerified: 'Not' });
                user
                  .save()
                  .then((resData) => {
                    let body = `Hi ${data.firstName} You have successfully signup with Accelgrowth CRM
                    <br/> 
                    <b>Please use below credentials</b>
                    <p>Email : ${data.email}</p></br/>
                    <p>Password : ${password}</p>
                    `
                    emailHelper.sendMail(data.email, customMessages.SIGN_UP_WELCOME, body)
                    resolve(resData);
                  })
                  .catch((error) => {
                    log.error(error);
                    reject(ERRORS.SOMETHING_WENT_WRONG);
                  });
              });
            });
          }
        })
        .catch((error) => {
          log.error(error);
          reject(ERRORS.SOMETHING_WENT_WRONG);
        });
    });
  },

  loginWithSocial: (data) => {
    return new Promise((resolve, reject) => {
      var object = {};
      if (data.hasOwnProperty("email")) {
        object["email"] = data.email;
      }
      User.findOne({
        ...object,
        status: {
          $ne: "deleted",
        },
      }).then((resUser) => {
        if (resUser) {
          resolve(resUser);
        } else {
          var obj = {
            email: data && data.email ? data.email : null,
            firstName: data.firstName,
            lastName: data.lastName,
            designation: "User",
            loginType: data.loginType,
            isEmailVerified: data && data.email ? "Verified" : "Not",
          };
          var user = new User(obj);
          user
            .save()
            .then((resData) => {
              resolve(resData);
            })
            .catch((error) => {
              console.log("error", error);

              reject(error);
            });
        }
      });
    });
  },

  login: (user) => {
    return new Promise((resolve, reject) => {
      log.info("user", user);
      User.findOne({
        $or: [{ email: user.username }, { mobileNumber: user.username }],
        status: {
          $ne: "deleted",
        },
      })
        .then((resData) => {
          console.log(resData);
          if (!resData) {
            reject(ERRORS.EMAIL_NOT_FOUND)
          } else {
            // if (resData.isEmailVerified !== "Verified") {
            //   reject("Please verify email");
            // } else {
            bcrypt.compare(
              user.password,
              resData.password,
              function (err, result) {
                if (result) {
                  User.findByIdAndUpdate(
                    {
                      _id: resData._id,
                    },
                    {
                      isOnline: true,
                    },
                    {
                      $new: true,
                    }
                  )
                    .then((response) => {
                      delete resData.password;
                      delete resData.location;
                      resolve(resData);
                    })
                    .catch((error) => {
                      reject({
                        code: 401,
                      }); //Wrong password
                    });
                } else {
                  reject("wrong password"); //wrong Password
                }
              }
            );
            // }
          }
        })
        .catch((error) => {
          log.error(error);
          reject(error);
        });
    });
  },

  verifyEmail: (email) => {
    return new Promise((resolve, reject) => {
      log.info("user", email);
      // User.findOne({
      //   encryptedEmail: email,
      // })
      User.findOneAndUpdate(
        {
          encryptedEmail: email,
        },
        {
          isEmailVerified: "Verified",
          encryptedEmail: null,
        },
        {
          new: true,
        }
      )
        .then((resData) => {
          if (resData) {
            log.info("resData", resData);
          } else {
            reject(ERRORS.EMAIL_NOT_FOUND);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  verifyMobile: (mobile, otp) => {
    return new Promise((resolve, reject) => {
      log.info("user", mobile, otp);
      User.findOneAndUpdate(
        {
          mobileNumber: mobile,
          otp: otp,
        },
        {
          isMobileVerified: "Verified",
          otp: null,
        },
        {
          new: true,
        }
      )
        .then((resData) => {
          if (resData) {
            resolve(resData);
          } else {
            reject(ERRORS.WRONG_OTP);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  changePassword: (id, password) => {
    return new Promise((resolve, reject) => {
      User.findOne({ _id: id }).then(resData => {
        if (resData) {
          bcrypt.compare(
            password.oldPassword,
            resData.password,
            function (err, result) {
              if (result) {
                bcrypt.genSalt(saltRounds, function (err, salt) {
                  bcrypt.hash(password.newPassword, salt, function (err, hash) {
                    User.updateOne({ _id: id }, { $set: { password: hash } }, { new: true }).then(resPassword => {
                      emailHelper.sendMail(resData.email, 'Password Changed', 'Your password has been changed successfully, you need to login with new password to access you portal!')
                      resolve('Password Changes Successfully')
                    })
                  })
                })
              } else {
                reject(ERRORS.OLD_PASSWORD_NOT_FOUND)
              }
            }
          )

        } else {
          reject(ERRORS.USER_NOT_FOUND)
        }
      }).catch(error => {
        reject(error);
      })
    })
  },
  forgotPassword: (email) => {
    return new Promise((resolve, reject) => {
      User.findOne({ email: email }).then(resData => {
        if (resData) {
          let passCode = forgotPassword.generatePassword(21);
          User.updateOne({ _id: resData._id }, { forgotRequest: passCode }, { new: true })
            .then(resPassword => {
              let Body = `Hi ${resData.firstName},<br/> Please <a href="${config.forgotPasswordURL}/?psscode=${passCode}">click here </a> to forgot password`
              emailHelper.sendMail(resData.email, 'Request Forgot Password', Body);
              resolve(customMessages.EMAIL_SENT_ON_EMAIL);
            }).catch(error => {
              reject(error);
            })
        } else {
          reject(ERRORS.EMAIL_NOT_FOUND)
        }
      }).catch(error => {
        reject(error);
      })
    })
  },

  updatePassword: (body) => {
    return new Promise((resolve, reject) => {
      User.findOne({ forgotRequest: body.psscode }).then(resData => {
        if (resData) {
          bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(body.Password, salt, function (err, hash) {
              User.updateOne({ _id: resData._id }, { $set: { password: hash, forgotRequest: null } }, { new: true }).then(resPassword => {
                emailHelper.sendMail(resData.email, 'Password Changed', 'Your password has been changed successfully, you need to login with new password to access you portal!')
                resolve('Password Changes Successfully')
              })
            })
          })
        } else {
          reject(ERRORS.EMAIL_NOT_FOUND)
        }
      }).catch(error => {
        reject(error);
      })
    })
  },

  verifyEmailId: (passcode) => {
    return new Promise((resolve, reject) => {
      User.findOne({ emailVerificationCode: passcode }).then(resData => {
        if (resData) {
          User.updateOne({ _id: resData._id }, { $set: { emailVerificationCode: null, isEmailVerified: "Verified" } }, { new: true }).then(resPassword => {
            resolve('Verified')
          })
        } else {
          reject(ERRORS.EMAIL_NOT_FOUND)
        }
      }).catch(error => {
        reject(error);
      })
    })
  },

  testEmail: (email) => {
    return new Promise((resolve, reject) => {
      emailHelper.testMail(email, 'testMail', "").then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  checkAuth: (req) => {
    return new Promise(async (resolve, reject) => {
      let userRes = await User.findOne({ _id: req.userId })
      if (userRes) {
        resolve(userRes)
      } else {
        reject()
      }
    })
  }
};



