const express = require('express');
const router = express.Router();
const Facebook = require('./facebook');
const facebook = new Facebook();

router.get('/', (req, res) => res.send('Server running'));
router.get('/webhook', facebook.validate);
router.post('/webhook', facebook.send);

module.exports = router;