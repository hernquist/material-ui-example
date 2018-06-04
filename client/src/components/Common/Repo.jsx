import React from 'react';
import Summary from './Summary';
import Link from './Link';

const Repo = ({ repo }) => {
    const topics = repo.repositoryTopics.nodes.map(node => node.topic.name);
    const summaryItems = {
        Link: repo.url ? <Link href={repo.url}>{repo.url}</Link> : 'None',
        Topics: topics.join(', '),
        'Homepage': repo.homepageUrl ? <Link href={repo.homepageUrl}>{repo.homepageUrl}</Link> : 'None',
        'Number of open issues': repo.issues.totalCount
    };

    return (
        <Summary
            id={repo.id}
            title={repo.name}
            subtitle={repo.description}
            summaryItems={summaryItems}
            cols={1}
            dtWidth={"30%"}
            ddWidth={"60%"}
        />
    );
}

export default Repo;
