module.exports = (req, res, next) => {
   if (req.isAuthenticated()) {
      return next();
   } else {
      req.flash('error', 'Please login!');
      res.redirect('/user/login');
      console.log(`user not authenticated!!`);
   }
};