const express = require('express');
const dotenv = require("dotenv");
const rp = require("request-promise");
const omOrgs = require('../orgList');
const githubApi = require('../githubApi');
const router = express.Router();
const offlineOrgData = require('../public/org-data.json');

dotenv.config();

const online = true;

const auth = {
    user: process.env.USER,
    pass: process.env.PASSWORD
};

// we cache the orgs here
let cachedOrgs = [];
let cacheTimeStamp = null;

function cacheIsStale() {
    const now = new Date();
    const elapsedMillis = now - cacheTimeStamp;
    if (elapsedMillis > 5 * 60 * 1000) { // 5 minutes
        console.log('cache is stale:', elapsedMillis);
        return true;
    }
    else {
        console.log('cache is fresh:', elapsedMillis);
        return false;
    }
}

function refreshCache(req) {
    return req.query.refresh || cachedOrgs.length === 0 || cacheIsStale();
}

const GitHubRequestCounter = function() {
    let _numRequests = 0;
    return {
        count: () => _numRequests,
        inc: () => {
            ++_numRequests;
        },
        reset: () => {
            _numRequests = 0;
        }
    }
}();


async function getOrgInfoRequest(org) {
    GitHubRequestCounter.inc();
    const url = `${githubApi.baseUrl}/orgs/${org.name}`;
    return rp({
        method: 'GET',
        url,
        headers: githubApi.headers.v3,
        auth
    });
}

async function getOrgReposRequest(org) {
    GitHubRequestCounter.inc();
    const url = `${githubApi.baseUrl}/orgs/${org.name}/repos`;
    const repos = JSON.parse(await rp({
        method: 'GET',
        url,
        headers: githubApi.headers.mercyPreview,
        auth
    }));

    const promises = repos.map(repo => {
        return repo.has_pages ? getRepoGitHubPagesInfoRequest(org, repo) : null;
    });
    const pagesInfo = await Promise.all(promises);
    return repos.map((repo, index) => {
        return { ...repo,
            pagesInfo: JSON.parse(pagesInfo[index])
        };
    });
}

async function getRepoGitHubPagesInfoRequest(org, repo) {
    GitHubRequestCounter.inc();
    const url = `${githubApi.baseUrl}/repos/${org.name}/${repo.name}/pages`;
    return rp({
        method: 'GET',
        url,
        headers: githubApi.headers.misterFantasticPreview,
        auth
    });
}

async function getProjectInfoRequest(org) {
    GitHubRequestCounter.inc();
    const url = `${githubApi.baseUrl}/orgs/${org.name}/projects`;
    return rp({
        method: 'GET',
        url,
        headers: githubApi.headers.inertiaPreview,
        auth
    });
}

async function getOrgs() {
    try {
        const orgInfoPromises = omOrgs.map(org => getOrgInfoRequest(org));
        const orgRepoPromises = omOrgs.map(org => getOrgReposRequest(org));
        const projectInfoPromises = omOrgs.map(org => getProjectInfoRequest(org));
        const orgInfos = (await Promise.all(orgInfoPromises)).map(org => JSON.parse(org));
        const allRepos = (await Promise.all(orgRepoPromises)).map(org => org);
        const projectInfos = (await Promise.all(projectInfoPromises)).map(org => JSON.parse(org));
        const orgs = orgInfos.map((orgInfo, index) => {
            return { ...orgInfo,
                repos: allRepos[index],
                projects: projectInfos[index]
            };
        });
        return orgs;
    } catch(err) {
        console.log('ERROR:', err);
    }
}

/* GET orgs and their repos. */
router.get('/', async (req, res, next) => {
    try {
        if (online) {
            if (refreshCache(req)) {
                cachedOrgs = await getOrgs();
                cacheTimeStamp = new Date();
                const gitHubRequests = GitHubRequestCounter.count();
                GitHubRequestCounter.reset();
                res.json({
                    gitHubRequests,
                    orgs: cachedOrgs
                });
            }
            else {
                res.json({
                    gitHubRequests: 0,
                    orgs: cachedOrgs
                });
            }
        }
        else {
            return res.json(offlineOrgData);
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
