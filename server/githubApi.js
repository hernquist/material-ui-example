const dotenv = require("dotenv");
const rp = require("request-promise");
const omOrgs = require('./orgList');
const offlineOrgData = require('./public/org-data.json');

let online = true;
if (process.env.NODE_ENV === 'production') {
    online = true;   // always true in production
}

dotenv.config();
const auth = {
    user: process.env.GIT_USER,
    pass: process.env.GIT_PASSWORD
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
    } else {
        console.log('cache is fresh:', elapsedMillis);
        return false;
    }
}

function refreshCache(req) {
    return req.query.refresh || cachedOrgs.length === 0 || cacheIsStale();
}

const GitHubRequestCounter = function () {
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


const baseUrl = 'https://github.homedepot.com/api/v3';

const headers = {
    v3: {
        'Accept': 'application/vnd.github.v3.full+json' // v3 of the api
    },
    mercyPreview: {
        'Accept': 'application/vnd.github.mercy-preview+json' // preview for topics
    },
    inertiaPreview: {
        'Accept': 'application/vnd.github.inertia-preview+json' // preview for projects
    },
    misterFantasticPreview: {
        'Accept': 'application/vnd.github.mister-fantastic-preview+json' // preview for gh pages info
    }
};

async function getOrgInfoRequest(org) {
    GitHubRequestCounter.inc();
    const url = `${baseUrl}/orgs/${org.name}`;
    return rp({
        method: 'GET',
        url,
        headers: headers.v3,
        auth
    });
}

async function getOrgReposRequest(org) {
    GitHubRequestCounter.inc();
    const url = `${baseUrl}/orgs/${org.name}/repos`;
    const repos = JSON.parse(await rp({
        method: 'GET',
        url,
        headers: headers.mercyPreview,
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
    const url = `${baseUrl}/repos/${org.name}/${repo.name}/pages`;
    return rp({
        method: 'GET',
        url,
        headers: headers.misterFantasticPreview,
        auth
    });
}

async function getProjectInfoRequest(org) {
    GitHubRequestCounter.inc();
    const url = `${baseUrl}/orgs/${org.name}/projects`;
    return rp({
        method: 'GET',
        url,
        headers: headers.inertiaPreview,
        auth
    });
}

async function getOrgs() {
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
}

async function getOrgData(req) {
    if (online) {
        if (refreshCache(req)) {
            cachedOrgs = await getOrgs();
            cacheTimeStamp = new Date();
            const gitHubRequests = GitHubRequestCounter.count();
            GitHubRequestCounter.reset();
            const result = {
                gitHubRequests,
                orgs: cachedOrgs
            };
            return result;
        } else {
            return {
                gitHubRequests: 0,
                orgs: cachedOrgs
            };
        }
    } else {
        return offlineOrgData;
    }
}

module.exports = getOrgData;
