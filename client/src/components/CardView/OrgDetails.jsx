import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ViewportContext from '../Common/ViewportContext';
import LinkButton from '../Common/LinkButton';
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
    const numRepos = org.repos.length;
    const numOpenIssues = org.repos.reduce((s, r) => s + r.open_issues_count, 0);
    const projectLinks = org.projects ? org.projects.map(project => (
        <Link key={project.id} href={project.html_url} style={{ marginRight: '10px' }}>{project.name}</Link>
    )) : null;

    const summaryItems = {
        'Number of projects': org.projects.length,
        'Project Links': projectLinks,
        'Number of repos': numRepos,
        'Number of open issues': numOpenIssues,
    };

    return (
        <ViewportContext.Consumer>
            {viewport => (
                <section className={classes.root}>
                    <LinkButton to={"/cards"} variant="fab" aria-label="details" className={classes.button}>
                        <ArrowBackIcon />
                    </LinkButton>

                    <Paper elevation={6}>
                        <Summary
                            id={org.login}
                            title={org.login}
                            subtitle={<Link href={org.html_url}>{org.html_url}</Link>}
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
                        <OrgRepos repos={org.repos} />
                    </Paper>
                </section>
            )}
        </ViewportContext.Consumer>
    );
}

export default withStyles(styles)(OrgDetails);