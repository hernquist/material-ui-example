module.exports = `
query Organization($login: String!) {
    organization(login: $login) {
        id
        name
        description
        url
        avatarUrl
        teams(first: 30) {
            pageInfo {
                hasNextPage
                endCursor
            }
            nodes {
                id
                name
            }
        }
        projects(first: 30) {
            pageInfo {
                hasNextPage
                endCursor
            }
            nodes {
                id
                name
                url
            }
        }
        repositories(first: 100) {
            pageInfo {
                hasNextPage
                endCursor
            }
            nodes {
                name
                id
                description
                owner {
                    id
                    login
                }
                url
                createdAt
                updatedAt
                homepageUrl
                issues(states: OPEN) {
                    totalCount
                }
                labels(first: 30) {
                    nodes {
                        id
                        name
                        description
                    }
                }
                deployments(first: 3) {
                    nodes {
                        environment
                        latestStatus {
                            state
                            environmentUrl
                        }
                    }
                }
                repositoryTopics(first: 30) {
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                    nodes {
                        topic {
                            name
                        }
                    }
                }
            }
        }
    }
}
`;
