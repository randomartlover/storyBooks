const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
});

// @desc Login/Landing page
// @route GET /
router.get('/', (req, res)=> {
  res.render('login')
})

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', (req, res) => {
  res.render('dashboard')
})


module.exports = router;
