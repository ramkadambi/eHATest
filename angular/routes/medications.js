var medications_module = require("../models/medicationsModel")


/* Find medications by user and date */
exports.findUserMedications = function(req, res) {
    var id = req.param('patientId', null);
    var medications = medications_module.model(false);
    console.log('Retrieving medications: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
    medications.find({patientId:id},function(err, item) {
        if (err){
            console.log("error retrieving Vitals"+id);
        }
        else
        {   res.send(item);
        }
    });
};


exports.addUserMedications = function(req, res) {
    var medicationsMod = medications_module.model(true);
    var ObjectId = require('mongoose').Types.ObjectId;
    medicationsMod._id = new ObjectId();
    medicationsMod.medicineName = req.body.medicineName;
    medicationsMod.Dosage = req.body.Dosage;
    medicationsMod.frequency = req.body.frequency;
    medicationsMod.supplementalInfo = req.body.supplementalInfo;
    medicationsMod.specialInstruction = req.body.specialInstruction;
    medicationsMod.startDate = req.body.startDate;
    medicationsMod.stopDate = req.body.stopDate;
    medicationsMod.isActive = req.body.isActive;
    medicationsMod.patientId = req.body.patientId;
    console.log('Adding medications: ' + JSON.stringify(medicationsMod));
    medicationsMod.save(function(error, data){
        if(error){
            res.json(error);
        }
        else{
            res.json(data);
        }
    });
}

exports.updateUserMedicationsId = function(req, res) {
    var medicationsMod = medications_module.model(false);
    var tofind = req.body._id;
    delete(req.body._id);
    medicationsMod.findOneAndUpdate({_id:tofind}, req.body, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });
}

exports.deleteUserMedications = function(req, res) {
    var medicationsMod = medications_module.model(false);
    var tofind = req.body._id;

    medicationsMod.findOneAndRemove({_id:tofind}, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });
}

exports.findAll = function(req, res) {
    var medicationsMod = medications_module.model(false);
    console.log('Retrieving all medications');
    medicationsMod.find({},function(err, items) {
        if (err){
            console.log("error retrieving all doctors");
            res.send("error retrieving");
        }
        else
            res.send(items);
    });
};
