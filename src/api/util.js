const UserEntry = require("../models/user");

function updateNumberOfArticles(articleEntry, type) {
    if (type === 'Shirt') {
        var updatedTotalNumberOfShirts = articleEntry[0].wardrobeData[0].totalNumberOfShirts++;

    } else if (type === 'Pants') {
        var updatedTotalNumberOfPants = articleEntry[0].wardrobeData[0].totalNumberOfPants++;
    }
    if (parseInt(numberOfCorrect) > highScore) {
        highScore = parseInt(numberOfCorrect);
    }
    totalCorrect = parseInt(totalCorrect + parseInt(numberOfCorrect));
    totalAttempted += numberOfAttempted;

    var val = [scoresID, highScore, totalCorrect, totalAttempted]
    return val
}