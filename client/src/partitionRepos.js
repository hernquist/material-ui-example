import getRepoCategory from "./getRepoCategory";

export default function(repos) {
    const workshops = [];
    const lessons = [];
    const labs = [];
    const demoApps = [];
    const other = [];
    repos.forEach(repo => {
        const repoType = getRepoCategory(repo);
        if (repoType === 'other') {
            other.push(repo);
        } else if (repoType === 'workshops') {
            workshops.push(repo);
        } else if (repoType === 'lessons') {
            lessons.push(repo);
        } else if (repoType === 'labs') {
            labs.push(repo);
        } else if (repoType === 'demoApps') {
            demoApps.push(repo);
        } else {
            other.push(repo);
        }
    });
    return {
        workshops,
        lessons,
        labs,
        demoApps,
        other
    };
}
