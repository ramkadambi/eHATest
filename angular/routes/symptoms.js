var symptoms_module = require("../models/symptomsModel")


/* Find symptoms by user and date */
exports.findUserSymptoms = function(req, res) {
    var id = req.param('patientId', null);
    var symptoms = symptoms_module.model(false);
    console.log('Retrieving symptoms: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
    symptoms.find({patientId:id},function(err, item) {
        if (err){
            console.log("error retrieving Vitals"+id);
        }
        else
        {   res.send(item);
        }
    });
};


exports.addUserSymptoms = function(req, res) {
    var symptomsMod = symptoms_module.model(true);
    var ObjectId = require('mongoose').Types.ObjectId;
    symptomsMod._id = new ObjectId();
    symptomsMod.symptomName = req.body.symptomName;
    symptomsMod.symptomDetails = req.body.symptomDetails;
    symptomsMod.Note = req.body.Note;
    symptomsMod.When = req.body.When;
    symptomsMod.active = req.body.active;
    symptomsMod.patientId = req.body.patientId;
    console.log('Adding symptoms: ' + JSON.stringify(symptomsMod));
    symptomsMod.save(function(error, data){
        if(error){
            res.json(error);
        }
        else{
            res.json(data);
        }
    });
}

exports.updateUserSymptomsId = function(req, res) {
    var symptomsMod = symptoms_module.model(false);
    var tofind = req.body._id;
    delete(req.body._id);
    symptomsMod.findOneAndUpdate({_id:tofind}, req.body, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });
}

exports.deleteUserSymptoms = function(req, res) {
    var symptomsMod = symptoms_module.model(false);
    var tofind = req.body._id;

    symptomsMod.findOneAndRemove({_id:tofind}, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });
}
