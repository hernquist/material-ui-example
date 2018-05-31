import React from 'react';
import ViewportContext from '../Common/ViewportContext';
import getNumColumns from '../../getNumColumns';
import Summary from '../Common/Summary';
import partitionRepos from '../../partitionRepos';

const CurriculumSummary = ({ orgs }) => {
    const allRepos = orgs.reduce((repos, org) => repos.concat(org.repos), []);
    const { workshops, lessons, labs, demoApps, other } = partitionRepos(allRepos);
    const numOpenIssues = orgs.reduce((sum, org) => sum + org.repos.reduce((s, r) => s + r.open_issues_count, 0), 0);
    const summaryItems = {
        'Total number of orgs': orgs.length,
        'Total number of repos': allRepos.length,
        'Total number of open issues': numOpenIssues,
        'Total number of workshops': workshops.length,
        'Total number of lessons': lessons.length,
        'Total number of labs': labs.length,
        'Total number of demo apps': demoApps.length,
        'Total number of other': other.length
    };
    return (
        <ViewportContext.Consumer>
            {viewport => (
                <Summary
                    id="curriculum-summary"
                    title="Curriculum Summary"
                    summaryItems={summaryItems}
                    cols={getNumColumns(viewport, 2)}
                    dtWidth={"60%"}
                    ddWidth={"30%"}
                />
            )}
        </ViewportContext.Consumer>
    );
};

export default CurriculumSummary;