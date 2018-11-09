const express = require("express");
const passport = require("passport");
const router = express.Router();

//Render Login Page
router.get('/login', (req, res, next) => {
    res.status(200).render('login', { title: 'Login User' });
});

//Login Users
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { successRedirect: '/eminence/home', failureRedirect: '/user/login', failureFlash: true})(req, res, next);
});

//Logout Users
router.get('/logout', (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'You are logged out!');
    res.redirect('/user/login');
    console.log(`you are logged out!!`);
});


module.exports = router;