const { Router } = require('express');
const { getApiInfo } = require('../controllers/apiController');

const router = Router();

router.get('/', getApiInfo);

module.exports = router;
