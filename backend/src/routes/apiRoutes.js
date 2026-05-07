const express = require('express');
const router = express.Router();

const { getMessage } = require('../controllers/apiController');

router.get('/', getMessage);

module.exports = router;