const UserEntry = require("../models/user");
// 1 is add  and 0 is sub
function updateNumberOfArticles(id_, wardrobeid_, articleEntry, type, arithmatic) {
    if (type === 'Shirt' && arithmatic === 1) {
        var updatedTotalNumberOfShirts = articleEntry[0].wardrobeData[0].totalNumberOfShirts++;
    } else if (type === 'Shirt' && arithmatic === 1) {
        var updatedTotalNumberOfPants = articleEntry[0].wardrobeData[0].totalNumberOfPants--;
    } else if (type === 'Pants' && arithmatic === 1) {
        var updatedTotalNumberOfPants = articleEntry[0].wardrobeData[0].totalNumberOfPants++;
    } else {
        var updatedTotalNumberOfPants = articleEntry[0].wardrobeData[0].totalNumberOfPants--;
    }
    return [updatedTotalNumberOfShirts,updatedTotalNumberOfPants];
}
module.exports = {
    updateNumberOfArticles
}