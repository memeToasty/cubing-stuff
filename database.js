var Datastore = require('nedb');
var creds = require('./credentials.json');
var db = new Datastore({ filename: creds.nedb.path, autoload: true });
module.exports = {
    newUser: (name, time) => {
        let user = {
            "username" : name,
            "times" : time
        }
        let id;
        db.insert(user, function (err, newDocs) {
            id = newDocs._id;
        });
        return id;
    },
    getUserData: (id) => {
        db.find({username : 'toasty'}, function (err, docs) {
            console.log (docs);
        });
    }
}