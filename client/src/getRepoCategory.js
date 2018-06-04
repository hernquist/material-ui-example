export default (repo) => {
    if (!repo.repositoryTopics) {
        return 'other';
    } else {
        const topics = repo.repositoryTopics.nodes.map(node => node.topic.name);
        if (topics.includes('om-workshop')) {
            return 'workshops';
        } else if (topics.includes('om-lesson')) {
            return 'lessons';
        } else if (topics.includes('om-lab')) {
            return 'labs';
        } else if (topics.includes('om-demo-app')) {
            return 'demoApps';
        } else {
            return 'other';
        }
    }
};
