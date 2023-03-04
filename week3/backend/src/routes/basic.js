const router = require('express').Router();

router.get('/', (req, res) => { 
    res.json('Hi, welcome to the backend root page');
});

router.get('/healthcheck', async (req, res, _next) => {
    try {
        res.json('This is the healthcheck API');
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;