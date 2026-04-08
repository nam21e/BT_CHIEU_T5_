function getNextId(list) {
    if (list.length === 0) return "1";

    let maxId = Math.max(...list.map(item => Number(item._id)));
    return String(maxId + 1);
}

module.exports = {
    getNextId
};