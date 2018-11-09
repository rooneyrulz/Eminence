const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
   res.status(200).render('about', { title: 'About Us' });
   console.log(`about page rendered!!`);
});



module.exports = router;