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

    await UserEntry.findOneAndUpdate({
            'id_': id_,
            'wardrobeData.id': wardrobeid_
        }, {
            $push: {
                'wardrobeData.totalNumberOfShirts': updatedTotalNumberOfShirts,
                'wardrobeData.totalNumberOfPants': updatedTotalNumberOfPants,
                'wardrobeData.totalNumberOfArticles': updatedTotalNumberOfPants + updatedTotalNumberOfShirts,
            }
        }),
        function(err, docs) {
            if (err) {
                next(err);
            } else {
                console.log('Updated Article Numbers: ' + docs);
            }
        };
}
module.exports = {
    updateNumberOfArticles
}