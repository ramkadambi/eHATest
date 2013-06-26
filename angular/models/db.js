// DB module for initialization
var mongoose = require('mongoose');

global.SERVER_NAME = 'localhost:27017';
global.DB_NAME = 'eha'; // obviously localized to my app - choose your own
module.exports = {
    _db: null,
    init: function(){
        if (!module.exports._db){
            var path = 'mongodb://' + SERVER_NAME + '/' + DB_NAME;
            console.log('connecting to MONGO via ' + path);
            module.exports._db = mongoose.connect(path);
        }
        console.log(module.exports._db);
        return module.exports._db;
    }

}
