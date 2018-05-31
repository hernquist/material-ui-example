import React from 'react';
import Summary from './Summary';
import Link from './Link';

const Repo = ({ repo }) => {
    const summaryItems = {
        Link: repo.html_url ? <Link href={repo.html_url}>{repo.html_url}</Link> : 'None',
        Topics: repo.topics.join(', '),
        'GitHub Pages Link': repo.pages_url ? <Link href={repo.pages_url}>{repo.pages_url}</Link> : 'None',
        'Number of open issues': repo.open_issues_count
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
