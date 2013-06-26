var kioskGroup_module = require("../models/kioskGroupModel")

/* Find a single Kiosk Group  */
exports.findById = function(req, res) {
    var id = req.params.id;
    var kioskgroups = kioskGroup_module.model(false);
    console.log('Retrieving Kiosk Group: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
    kioskgroups.findById(new ObjectId(id),null, null,function(err, item) {
        if (err){
            console.log("error retrieving Kiosk Group " + id);
        }
        else
            res.send(item);
    });
};

exports.findUserName = function(req, res) {
    var id = req.params.id;
    var kioskgroups = kioskGroup_module.model(false);
    console.log('Retrieving Kiosk Group: ' + id);
    kioskgroups.findOne({username:id},function(err, item) {
        if (err){
            console.log("error retrieving Kiosk Group: " + id);
        }
        else
            res.send(item);
    });
};

exports.findAll = function(req, res) {
    var kioskgroups = kioskGroup_module.model(false);
    console.log('Retrieving all Kiosk Group ' + kioskgroups);
    kioskgroups.find({},function(err, items) {
        if (err){
            console.log("error retrieving all Kiosk Group");
            res.send("error retrieving");
        }
        else
            res.send(items);
    });
};




