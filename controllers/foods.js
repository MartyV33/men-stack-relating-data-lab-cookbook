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

router.get('/users/:userId/foods', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            console.log('User not found');
            return res.redirect('/');
        }
        console.log('User:', user);
        console.log('Pantry:', user.pantry);
        res.render('foods/index.ejs', { pantry: user.pantry || [], user: user });
    } catch (err) {
        console.log('Error:', err);
        res.redirect('/');
    }
});

router.get('/pantry', async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.render('pantry', { pantry: user.pantry });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/users/:userId/foods/:itemId/edit', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const foodItem = user.pantry.id(req.params.itemId);
        res.render('foods/edit.ejs', { userId: req.params.userId, foodItem: foodItem });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
});

router.post('/users/:userId/foods', (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) {
            console.log(err);
            return res.redirect('/');
        }
        user.pantry.push(req.body);
        user.save((err) => {
            if (err) {
                console.log(err);
                return res.redirect('/');
            }
            res.redirect('/');
        });
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

router.put('/users/:userId/foods/:itemId', (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) {
            console.log(err);
            return res.redirect('/');
        }
        const foodItem = user.pantry.id(req.params.itemId);
        foodItem.set(req.body);
        user.save((err) => {
            if (err) {
                console.log(err);
                return res.redirect('/');
            }
            res.redirect(`/users/${req.params.userId}/foods`);
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

router.delete('/users/:userId/foods/:itemId', (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) {
            console.log(err);
            return res.redirect('/');
        }
        user.pantry.id(req.params.itemId).remove();
        user.save((err) => {
            if (err) {
                console.log(err);
                return res.redirect('/');
            }
            res.redirect(`/users/${req.params.userId}/foods`);
        });
    });
});

module.exports = router;
