var bGlucose_module = require("../models/bloodGlucoseModel")

/* Find bGlucoseby user and date */
exports.findUserBGlucose= function(req, res) {
    var id = req.param('patientId', null);
    var bGlucose= bGlucose_module.model(false);
    console.log('Retrieving BGlucose: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
    bGlucose.find({patientId:id},function(err, item) {
        if (err){
            console.log("error retrieving Vitals"+id);
        }
        else
        {   res.send(item);
        }
    });
};


exports.addUserBGlucose= function(req, res) {
    var bGlucoseMod = bGlucose_module.model(true);
    var ObjectId = require('mongoose').Types.ObjectId;
    bGlucoseMod._id = new ObjectId();
    bGlucoseMod.bloodGlucose = req.body.bloodGlucose;
    bGlucoseMod.type = req.body.type;
    bGlucoseMod.Note = req.body.Note;
    bGlucoseMod.measureDate = req.body.measureDate;
    bGlucoseMod.patientId = req.body.patientId;
    console.log('Adding Blood Glucose: ' + JSON.stringify(bGlucoseMod));
    bGlucoseMod.save(function(error, data){
        if(error){
            res.json(error);
        }
        else{
            res.json(data);
        }
    });
}

exports.updatebGlucoseId = function(req, res) {
    var bGlucoseMod = bGlucose_module.model(false);
    var tofind = req.body._id;
    delete(req.body._id);
    bGlucoseMod.findOneAndUpdate({_id:tofind}, req.body, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });
}

exports.deleteUserBGlucose= function(req, res) {
    var bGlucoseMod = bGlucose_module.model(false);
    var tofind = req.body._id;

    bGlucoseMod.findOneAndRemove({_id:tofind}, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });
}

exports.findAll = function(req, res) {
    var bGlucoseMod = bGlucose_module.model(false);
    console.log('Retrieving all Allergies');
    bGlucoseMod.find({},function(err, items) {
        if (err){
            console.log("error retrieving all doctors");
            res.send("error retrieving");
        }
        else
            res.send(items);
    });
};
