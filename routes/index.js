const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index.njk', { title: 'Express', layout:"layout.njk" });
});

module.exports = router;
