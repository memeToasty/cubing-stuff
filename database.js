var Datastore = require('nedb');
var creds = require('./credentials.json');
var db = new Datastore({ filename: creds.nedb.path, autoload: true });

async function newUser (name, time) {
    let user = {
        "username" : name,
        "times" : [parseInt(time)],
        "date" : [Date.now()]
    };
    return new Promise ((accept) => {
        db.insert(user, (err, newDocs) => {
            accept(newDocs._id);
        });
    });
}

async function getUserData (id) {
    return new Promise ((accept) => {
        db.find({_id : id}, function (err, docs) {
            accept(docs);
        });
    });
}

async function insertTime (id, time) {
    await getUserData(id);
    console.log("new Time " + time);

    return new Promise ((accept) => {
        db.update({
            _id: id
        }, 
        { 
            $push: {
                "times": parseInt(time),
                "date" : Date.now()
            } 
        }, {}, function () {
            accept('true');
        });
    });
}

exports.newUser = newUser;
exports.getUserData = getUserData;
exports.insertTime = insertTime;