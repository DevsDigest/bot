const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Server running'));

router.get('/webhook', () => {});
router.post('/webhook', () => {});

module.exports = router;