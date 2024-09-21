const passUserToView = (req, res, next) => {
    res.loacals.user = req.session.user ? req.session.user : null;
    next();
};

module.exports = passUserToView;