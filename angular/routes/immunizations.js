var immunizations_module = require("../models/immunizationsModel")


/* Find immunizations by user and date */
exports.findUserImmunizations = function(req, res) {
    var id = req.param('patientId', null);
    var immunizations = immunizations_module.model(false);
    console.log('Retrieving immunizations: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
    immunizations.find({patientId:id},function(err, item) {
        if (err){
            console.log("error retrieving Vitals"+id);
        }
        else
        {   res.send(item);
        }
    });
};


exports.addUserImmunizations = function(req, res) {
    var immunizationsMod = immunizations_module.model(true);
    var ObjectId = require('mongoose').Types.ObjectId;
    immunizationsMod._id = new ObjectId();
    immunizationsMod.Vaccine = req.body.Vaccine;
    immunizationsMod.Note = req.body.Note;
    immunizationsMod.When = req.body.When;
    immunizationsMod.patientId = req.body.patientId;
    console.log('Adding immunizations: ' + JSON.stringify(immunizationsMod));
    immunizationsMod.save(function(error, data){
        if(error){
            res.json(error);
        }
        else{
            res.json(data);
        }
    });
}

exports.updateUserImmunizationsId = function(req, res) {
    var immunizationsMod = immunizations_module.model(false);
    var tofind = req.body._id;
    delete(req.body._id);
    immunizationsMod.findOneAndUpdate({_id:tofind}, req.body, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });
}

exports.deleteUserImmunizations = function(req, res) {
    var immunizationsMod = immunizations_module.model(false);
    var tofind = req.body._id;

    immunizationsMod.findOneAndRemove({_id:tofind}, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });
}

exports.findAll = function(req, res) {
    var immunizationsMod = immunizations_module.model(false);
    console.log('Retrieving all immunizations');
    immunizationsMod.find({},function(err, items) {
        if (err){
            console.log("error retrieving all doctors");
            res.send("error retrieving");
        }
        else
            res.send(items);
    });
};
