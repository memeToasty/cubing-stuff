var Datastore = require('nedb');
var creds = require('./credentials.json');
var db = new Datastore({ filename: creds.nedb.path, autoload: true });
module.exports = {
    newUser: async (name, time) => {
        let user = {
            "username" : name,
            "times" : time
        };
        return new Promise ((accept) => {
            db.insert(user, (err, newDocs) => {
                accept(newDocs._id);
            });
        });
    },
    getUserData: (id) => {
        db.find({_id : id}, function (err, docs) {
            console.log (docs);
        });
    }
}