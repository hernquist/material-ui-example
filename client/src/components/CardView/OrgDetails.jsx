import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ViewportContext from '../Common/ViewportContext';
import Summary from '../Common/Summary';
import Link from '../Common/Link';
import OrgRepos from './OrgRepos';

const styles = theme => {
    return {
        root: {
            // backgroundColor: theme.palette.common.white,
            textAlign: 'center',
            width: '100%',
            maxWidth: '1200px',
            margin: '50px auto',
            padding: theme.spacing.unit,
            borderRadius: '10px'
        },
        content: {
            margin: '10px',
        },
        button: {
            marginBottom: 30,
        },
    }
};

const OrgDetails = ({ org, classes }) => {
    const numRepos = org.repositories.nodes.length;
    console.log('org.repositories.nodes:', org.repositories.nodes);
    const numOpenIssues = org.repositories.nodes.reduce((s, r) => s + r.issues.totalCount, 0);
    console.log('numOpenIssues:', numOpenIssues);
    const projectLinks = org.projects ? org.projects.nodes.map(project => (
        <Link key={project.id} href={project.url} style={{ marginRight: '10px' }}>{project.name}</Link>
    )) : null;

    const summaryItems = {
        // 'Number of projects': org.projects.nodes.length,
        'Project Links': projectLinks,
        'Number of repos': numRepos,
        'Number of open issues': numOpenIssues,
    };

    return (
        <ViewportContext.Consumer>
            {viewport => (
                <section className={classes.root}>
                    <Paper elevation={6}>
                        <Summary
                            id={org.name}
                            title={org.name}
                            subtitle={<Link href={org.url}>{org.url}</Link>}
                            className={classes.root}
                            summaryItems={summaryItems}
                            // cols={getNumColumns(viewport, 2)}
                            // dtWidth={"60%"}
                            // ddWidth={"30%"}
                            cols={1}
                            dtWidth={"45%"}
                            ddWidth={"45%"}
                        />
                    </Paper>

                    <Paper elevation={6}>
                        <OrgRepos repos={org.repositories.nodes} />
                    </Paper>
                </section>
            )}
        </ViewportContext.Consumer>
    );
}

export default withStyles(styles)(OrgDetails);