import React from 'react';
import ViewportContext from '../Common/ViewportContext';
import getNumColumns from '../../getNumColumns';
import Summary from '../Common/Summary';

function arrayToObject(arr) {
    return arr.reduce((obj, item) => {
        return { ...obj, [item.title]: item.count };
    }, {});
}

function frequencyCount(data) {
    const counts = {};
    for (let i = 0; i < data.length; i++) {
        const num = data[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return Object.keys(counts).map((key, index) => {
        return { title: key, count: counts[key] };
    }).sort((a, b) => a.count > b.count ? -1 : 1);
}

function partitionIntoTagsAndTopics(tagsAndTopics) {
    return tagsAndTopics.reduce((obj, item) => {
        if (item.title === 'orangemethod' || item.title.startsWith('om-')) {
            obj.tags.push(item);
        }
        else {
            obj.topics.push(item);
        }
        return obj;
    }, { tags: [], topics: [] });
}

const TopicsSummary = ({ orgs }) => {
    const allRepos = orgs.reduce((repos, org) => repos.concat(org.repos), []);
    const allTagsAndTopics = allRepos.reduce((topics, repo) => topics.concat(repo.topics), []);
    const tagsAndTopicsWithCounts = frequencyCount(allTagsAndTopics);
    const { tags, topics } = partitionIntoTagsAndTopics(tagsAndTopicsWithCounts);
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
