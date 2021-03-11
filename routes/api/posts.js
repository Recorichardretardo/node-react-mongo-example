const express = require('express');
const router = express.Router();

router.get('/test',(req,res) => res.send("Post route"));

module.exports = router;