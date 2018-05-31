module.exports = {
    baseUrl: 'https://github.homedepot.com/api/v3',
    headers: {
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
    }
};
