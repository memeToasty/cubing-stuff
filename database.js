var Datastore = require('nedb');
var creds = require('./credentials.json');
var db = new Datastore({ filename: creds.nedb.path, autoload: true });
module.exports = {
    newUser: async (name, time) => {
        let user = {
            "username" : name,
            "times" : [time]
        };
        return new Promise ((accept) => {
            db.insert(user, (err, newDocs) => {
                accept(newDocs._id);
            });
        });
    },
    getUserData: async (id) => {
        return new Promise ((accept) => {
            db.find({_id : id}, function (err, docs) {
                accept(docs);
            });
        });
    },
    insertTime: async (id, time) => {

        var result = await getUserData(id);

        return new Promise ((accept) => {
            db.update(result, { 
                $push: {
                    times: time
                } 
            }, {}, function () {
                accept('true');
            });
        });
    }
}