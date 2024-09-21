// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/pantry', (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) return res.status(500).send(err);
        res.render('pantry', { pantry: user.pantry });
    });
});



module.exports = router;
