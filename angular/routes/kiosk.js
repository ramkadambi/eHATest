var kiosk_module = require("../models/kioskModel")

/* Find a single Kiosk */
exports.findById = function(req, res) {
    var id = req.params.id;
    var kiosks = kiosk_module.model(false);
    console.log('Retrieving Kiosk: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
    kiosks.findById(new ObjectId(id),null, null,function(err, item) {
        if (err){
            console.log("error retrieving Kiosk: " + id);
        }
        else
            res.send(item);
    });
};

exports.findUserName = function(req, res) {
    var id = req.params.id;
    var kiosks = kiosk_module.model(false);
    console.log('Retrieving Kiosk: ' + id);
    kiosks.findOne({username:id},function(err, item) {
        if (err){
            console.log("error retrieving Kiosk: " + id);
        }
        else
            res.send(item);
    });
};

exports.findAll = function(req, res) {
    var kiosks = kiosk_module.model(false);
    console.log('Retrieving all Kiosk');
    kiosks.find({},function(err, items) {
        if (err){
            console.log("error retrieving all Kiosk");
            res.send("error retrieving");
        }
        else
            res.send(items);
    });
};




