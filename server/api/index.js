const router = require('express').Router();
module.exports = router;

router.use('/student', require('./student'));
router.use('/campus', require('./campus'));

router.use((req, res, next) => {
  res.status(404).send('API Not found');
});
