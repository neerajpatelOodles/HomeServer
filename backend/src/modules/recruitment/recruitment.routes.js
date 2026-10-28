const router = require('express').Router();
const { applicationLimiter } = require('../../middleware/rateLimiters');
const validate = require('../../middleware/validate');
const { applicationBody } = require('./recruitment.validation');
const controller = require('./recruitment.controller');

router.get('/options', controller.options);
router.post('/applications', applicationLimiter, validate({ body: applicationBody }), controller.apply);

module.exports = router;
