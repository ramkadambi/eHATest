var allergies_module = require("../models/allergiesModel")

/* Find allergies by user and date */
exports.findUserAllergies = function(req, res) {
    var id = req.param('patientId', null);
    var allergies = allergies_module.model(false);
    console.log('Retrieving Allergies: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
    allergies.find({patientId:id},function(err, item) {
        if (err){
            console.log("error retrieving Vitals"+id);
        }
        else
        {   res.send(item);
        }
    });
};


exports.addUserAllergies = function(req, res) {
    var allergiesMod = allergies_module.model(true);
    var ObjectId = require('mongoose').Types.ObjectId;
    allergiesMod._id = new ObjectId();
    allergiesMod.Allergen = req.body.Allergen;
    allergiesMod.Reaction = req.body.Reaction;
    allergiesMod.Severity = req.body.Severity;
    allergiesMod.Note = req.body.Note;
    allergiesMod.When = req.body.When;
    allergiesMod.patientId = req.body.patientId;
    console.log('Adding Allergies: ' + JSON.stringify(allergiesMod));
    allergiesMod.save(function(error, data){
        if(error){
            res.json(error);
        }
        else{
            res.json(data);
        }
    });
}

exports.updateUserAllergiesId = function(req, res) {
    var allergiesMod = allergies_module.model(false);
    var tofind = req.body._id;
    delete(req.body._id);
    allergiesMod.findOneAndUpdate({_id:tofind}, req.body, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });
}

exports.deleteUserAllergies = function(req, res) {
    var allergiesMod = allergies_module.model(false);
    var tofind = req.body._id;

    allergiesMod.findOneAndRemove({_id:tofind}, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });
}

exports.findAll = function(req, res) {
    var allergiesMod = allergies_module.model(false);
    console.log('Retrieving all Allergies');
    allergiesMod.find({},function(err, items) {
        if (err){
            console.log("error retrieving all doctors");
            res.send("error retrieving");
        }
        else
            res.send(items);
    });
};
