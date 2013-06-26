var surgeries_module = require("../models/surgeriesModel")


/* Find surgeries by user and date */
exports.findUserSurgeries = function(req, res) {
    var id = req.param('patientId', null);
    var surgeries = surgeries_module.model(false);
    console.log('Retrieving surgeries: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
    surgeries.find({patientId:id},function(err, item) {
        if (err){
            console.log("error retrieving Surgery Info "+id);
        }
        else
        {   res.send(item);
        }
    });
};


exports.addUserSurgeries = function(req, res) {
    var surgeriesMod = surgeries_module.model(true);
    var ObjectId = require('mongoose').Types.ObjectId;
    surgeriesMod._id = new ObjectId();
    surgeriesMod.SurgicalProcedure = req.body.SurgicalProcedure;
    surgeriesMod.Result = req.body.Result;
    surgeriesMod.Hospital = req.body.Hospital;
    surgeriesMod.AttendingPhysician = req.body.AttendingPhysician;
    surgeriesMod.Note = req.body.Note;
    surgeriesMod.When = req.body.When;
    surgeriesMod.patientId = req.body.patientId;
    console.log('Adding Surgical Procedures: ' + JSON.stringify(surgeriesMod));
    surgeriesMod.save(function(error, data){
        if(error){
            res.json(error);
        }
        else{
            res.json(data);
        }
    });
}

exports.updateUserSurgeriesId = function(req, res) {
    var surgeriesMod = surgeries_module.model(false);
    var tofind = req.body._id;
    delete(req.body._id);
    surgeriesMod.findOneAndUpdate({_id:tofind}, req.body, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });
}

exports.deleteUserSurgeries = function(req, res) {
    var surgeriesMod = surgeries_module.model(false);
    var tofind = req.body._id;

    surgeriesMod.findOneAndRemove({_id:tofind}, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });
}

exports.findAll = function(req, res) {
    var surgeriesMod = surgeries_module.model(false);
    console.log('Retrieving all surgeries');
    surgeriesMod.find({},function(err, items) {
        if (err){
            console.log("error retrieving all Surgeries");
            res.send("error retrieving");
        }
        else
            res.send(items);
    });
};