// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/users/:userId/foods/new', (req, res) =>{
    res.render('foods/new.ejs', { userId: req.params.userId });
});

router.get('/', (req, res) => {
    res.render('foods/index.ejs');
})

router.get('/users/:userId/foods', (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) return res.status(500).send(err);
        res.render('pantry', { pantry: user.pantry});
    });
});

router.get('/pantry', (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) return res.status(500).send(err);
        res.render('pantry', { pantry: user.pantry });
    });
});

router.post('/pantry', (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) return res.status(500).send(err);
        user.pantry.push(req.body);
        user.save((err) => {
            if (err) return res.status(500).send(err);
            res.redirect('/foods/pantry');
        });
    });
});

router.put('/pantry/:itemId', (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) return res.status(500).send(err);
        const item = user.pantry.id(req.params.itemId);
        item.set(req.body);
        user.save((err) => {
            if (err) return res.status(500).send(err);
            res.redirect('/foods/pantry');
        });
    });
});

router.delete('/pantry/:itemId', (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) return res.status(500).send(err);
        user.pantry.id(req.params.itemId).remove();
        user.save((err) => {
            if (err) return res.status(500).send(err);
            res.redirect('/foods/pantry');
        });
    });
});

module.exports = router;
