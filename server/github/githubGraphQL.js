const dotenv = require("dotenv");
const { GraphQLClient } = require('graphql-request');
const query = require('./query');
const orgList = require('./org-list');

// get my GitHub auth token
dotenv.config({
    path: './.env-thd'
});

// create client with auth token
const client = new GraphQLClient(process.env.GIT_ENDPOINT, {
    headers: {
        Authorization: 'Bearer ' + process.env.GIT_TOKEN,
    },
});
 
const getData = async () => {
    try {
        const promises = orgList.map(org => (
            client.request(query, {
                login: org.name
            })
        ));
        const orgs = await Promise.all(promises);
        console.log(`Fetched ${orgs.length} organizations.`);
    } catch (err) {
        console.log('ERROR 0:', err);
        console.log('ERROR 1:', err.response.errors) // GraphQL response errors
        console.log('ERROR 2:', err.response.data)   // Response data if available
    }
};

getData();
