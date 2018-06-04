const express = require('express');
const getOrgData = require('../github/githubGraphQL');
const router = express.Router();

/* GET orgs and their repos. */
router.get('/', async (req, res, next) => {
    try {
        return res.json(await getOrgData(req));
    } catch (err) {
        console.log('ERROR:', err);
        next(err);
    }
});

module.exports = router;
