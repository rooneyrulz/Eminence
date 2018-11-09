const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const router = express.Router();

//Require User Schema
const User = require('../models/user_schema');

//Render Register Page
router.get('/register', (req, res, next) => {
   res.status(200).render('register', { title: 'Register User'});
   console.log(`register page rendered!!`);
});

//Register Users
router.post('/register', (req, res, next) => {
   //Check for Validation Errors
   req.checkBody('name', 'name is required!').notEmpty();
   req.checkBody('email', 'email is not valid!').isEmail();
   req.checkBody('username', 'username is required!').notEmpty();
   req.checkBody('country', 'country is required!').notEmpty();
   req.checkBody('password', 'password is required!').notEmpty();
   req.checkBody('password2', 'password is not match!').equals(req.body.password);

   let validationErrors = req.validationErrors();
   if (validationErrors) {
      res.render('register', { title: 'Register User', validation_errors: validationErrors});
      console.log(validationErrors);
   } 
   else {
      User
      .find({email: req.body.email})
      .exec()
      .then(user => {
         if (user.length >= 1) {
            req.flash('error_msg', 'invalid email!');
            res.redirect('/user/register');
            console.log(`duplicate email id found!!`);
         } else {
            User
            .find({username: req.body.username})
            .exec()
            .then(user => {
               if (user.length >= 1) {
                  req.flash('error_msg', 'invalid username!');
                  res.redirect('/user/register');
                  console.log(`duplicate username found!!`);
               } else {
                  bcrypt.genSalt(10, (err, salt) => {
                     if (err) {
                        req.flash('error', err.message);
                        res.redirect('/user/register');
                        console.log(err);
                     } else {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                           if (err) {
                              req.flash('error', err.message);
                              res.redirect('/user/register');
                              console.log(err);
                           } else {
                              let user = new User({
                                 _id: new mongoose.Types.ObjectId(),
                                 name: req.body.name,
                                 email: req.body.email,
                                 username: req.body.username,
                                 country: req.body.country,
                                 password: hash
                              });
                              return user
                              .save()
                              .then(user => {
                                 req.flash('success_msg', 'User successfully saved!');
                                 res.redirect('/user/login');
                                 console.log(`user saved: ${user}`);
                              })
                              .catch(err => {
                                 res.status(500).render('error', { title: 'Server Error!', message: err});
                                 console.log(`Error: ${err.message}`);
                              });
                           }
                        });
                     }
                  });
               }
            })
            .catch(err => {
               res.status(500).render('error', { title: 'Server Error!', message: err});
               console.log(`Error: ${err.message}`);
            });
         }
      })
      .catch(err => {
         res.status(500).render('error', { title: 'Server Error!', message: err});
         console.log(`Error: ${err.message}`);
      });
   }
});





module.exports = router;