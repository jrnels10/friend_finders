let friendsData = require('../data/friends.js');
let questData = require('../data/questions.js');

module.exports = function (app) {
    app.get('/api/friendslist', function (req, res) {
        res.json(friendsData);
    });
    app.get('/api/questlist', function (req, res){
        res.json(questData)
    })

    app.post('/api/friendslist', function (req, res) {
        friendsData.push(req.body);
    })
}