const express = require("express");
const router = express.Router();

//Require Authentication
let ensureAuthenticated = require("../authentication/auth");

router.get('/home', ensureAuthenticated, (req, res, next) => {
   res.status(200).render('getstarted', { title: 'Home Page' });
});


module.exports = router;