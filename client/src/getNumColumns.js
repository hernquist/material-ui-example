function getNumColumns(viewport, maxColumns) {
    if (viewport.width >= 1500) {
        return maxColumns;
    } else if (viewport.width >= 1000 && maxColumns > 1) {
        return maxColumns - 1;
    } else {
        return 1;
    }
}

export default getNumColumns;