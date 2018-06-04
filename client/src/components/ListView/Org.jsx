import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ViewportContext from '../Common/ViewportContext';
import getNumColumns from '../../getNumColumns';
import Summary from '../Common/Summary';
import Link from '../Common/Link';
import RepoCategory from './RepoCategory';
import partitionRepos from '../../partitionRepos';

const styles = theme => ({
    root: {
        // color: theme.palette.text.primary,
    },
});

const Org = ({ org, classes }) => {
    const numRepos = org.repositories.nodes.length;
    const numOpenIssues = org.repositories.nodes.reduce((s, r) => s + r.issues.totalCount, 0);
    const projectLinks = org.projects ? org.projects.nodes.map(project => (
        <Link key={project.id} style={{ marginRight: '10px' }} href={project.url}>
          {project.name}
        </Link>
     )) : null;
    const { workshops, lessons, labs, demoApps, other } = partitionRepos(org.repositories.nodes);

    const summaryItems = {
        'Project Links': projectLinks,
        'Number of repos': numRepos,
        'Number of open issues': numOpenIssues,
        'Number of workshops': workshops.length,
        'Number of lessons': lessons.length,
        'Number of labs': labs.length,
        'Number of demo apps': demoApps.length,
        'Number of other': other.length
    };

    return (
        <ViewportContext.Consumer>
            {viewport => (
                <div key={org.id} className={classes.root}>
                    <Summary
                        id={org.name}
                        title={org.name}
                        subtitle={<Link href={org.url}>{org.url}</Link>}
                        summaryItems={summaryItems}
                        cols={getNumColumns(viewport, 2)}
                        dtWidth={"60%"}
                        ddWidth={"30%"}
                    />
                    <RepoCategory org={org} title="Workshops" repos={workshops} />
                    <RepoCategory org={org} title="Lessons" repos={lessons} />
                    <RepoCategory org={org} title="Labs" repos={labs} />
                    <RepoCategory org={org} title="Demo Apps" repos={demoApps} />
                    <RepoCategory org={org} title="other" repos={other} />
                </div>
            )}
        </ViewportContext.Consumer>
    );    
};

export default withStyles(styles)(Org);
