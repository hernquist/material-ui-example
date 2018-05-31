export default (repo) => {
    if (!repo.topics) {
        return 'other';
    } else if (repo.topics.includes('om-workshop')) {
        return 'workshops';
    } else if (repo.topics.includes('om-lesson')) {
        return 'lessons';
    } else if (repo.topics.includes('om-lab')) {
        return 'labs';
    } else if (repo.topics.includes('om-demo-app')) {
        return 'demoApps';
    } else {
        return 'other';
    }
};
