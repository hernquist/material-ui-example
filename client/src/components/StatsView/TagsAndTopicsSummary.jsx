import React from 'react';
import ViewportContext from '../Common/ViewportContext';
import getNumColumns from '../../getNumColumns';
import Summary from '../Common/Summary';

function arrayToObject(arr) {
    return arr.reduce((obj, item) => {
        console.log('reducing:', item);
        return { ...obj, [item.name]: item.count };
    }, {});
}

function frequencyCount(data) {
    console.log('data:', data);
    const counts = {};
    for (let i = 0; i < data.length; i++) {
        const key = data[i];
        counts[key] = counts[key] ? counts[key] + 1 : 1;
    }
    return Object.keys(counts).map((key, index) => {
        return { name: key, count: counts[key] };
    }).sort((a, b) => a.count > b.count ? -1 : a.count === b.count ? a.name < b.name ? -1 : 1 : 1);
}

function partitionIntoTagsAndTopics(tagsAndTopics) {
    return tagsAndTopics.reduce((obj, item) => {
        if (item.name === 'orangemethod' || item.name.startsWith('om-')) {
            obj.tags.push(item);
        }
        else {
            obj.topics.push(item);
        }
        return obj;
    }, { tags: [], topics: [] });
}

const TopicsSummary = ({ orgs }) => {
    const allRepos = orgs ? orgs.reduce((repos, org) => repos.concat(org.organization.repositories.nodes), []) : [];
    const _allTagsAndTopics = allRepos.reduce((topics, repo) => topics.concat(repo.repositoryTopics.nodes), []);
    const allTagsAndTopics = _allTagsAndTopics.map(topic => topic.topic.name);
    const tagsAndTopicsWithCounts = frequencyCount(allTagsAndTopics);
    const { tags, topics } = partitionIntoTagsAndTopics(tagsAndTopicsWithCounts);
    console.log(allRepos.length, allTagsAndTopics.length, tagsAndTopicsWithCounts);
    return (
        <ViewportContext.Consumer>
            {viewport => (
                <div>
                    <Summary
                        id="tags-summary"
                        title="Tags Summary"
                        summaryItems={arrayToObject(tags)}
                        cols={getNumColumns(viewport, 2)}
                        dtWidth={"60%"}
                        ddWidth={"30%"}
                    />
                    <Summary
                        id="topics-summary"
                        title="Topics Summary"
                        summaryItems={arrayToObject(topics)}
                        cols={getNumColumns(viewport, 3)}
                        dtWidth={"30%"}
                        ddWidth={"30%"}
                    />
                </div>
            )}
        </ViewportContext.Consumer>
    );
}

export default TopicsSummary;
