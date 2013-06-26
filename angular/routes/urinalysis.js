var urinalysis_module = require("../models/urinalysisModel")


/* Find Urinalysis by user and date */
exports.findUserUrinalysisDt = function(req, res) {
    var id = req.params.patientId;
    var dt = req.params.dt;
    var doctors = urinalysis_module.model(false);
    console.log('Retrieving Urinalysis: ' + id + dt);
    var ObjectId = require('mongoose').Types.ObjectId;
    doctors.findOne({patientId:id, measureDate:dt},function(err, item) {
        if (err){
            console.log("error retrieving Urinalysis"+id);
        }
        else
            res.send(item);
    });
};

/* Find Urinalysis by user and date */
exports.findUserUrinalysis = function(req, res) {
    var id = req.param('patientId', null);
    var urinalysis = urinalysis_module.model(false);
    console.log('Retrieving Urinalysis: ' + id );
    var ObjectId = require('mongoose').Types.ObjectId;
    urinalysis.find({patientId:id},function(err, item) {
        if (err){
            console.log("error retrieving Urinalysis"+id);
        }
        else
            res.send(item);
    });
};

/* Find Urinalysis by user and date */
exports.findUserUrinalysisLatest = function(req, res) {
    var id = req.params.patientId;
    var urinalysis = urinalysis_module.model(false);
    console.log('Retrieving Urinalysis: ' + id );
    var ObjectId = require('mongoose').Types.ObjectId;
    urinalysis.find({patientId:id},{}, {limit:1,sort:{ measureDate:-1}},function(err, item) {
        if (err){
            console.log("error retrieving Urinalysis"+id);
        }
        else
            res.send(item);
    });
};

exports.addUserUrinalysisDt = function(req, res) {
    var urinalysisDt = urinalysis_module.model(true);
    var ObjectId = require('mongoose').Types.ObjectId;
    urinalysisDt._id = new ObjectId();
    urinalysisDt.measureDate = req.body.measureDate;
    urinalysisDt.uColor=req.body.uColor;
    urinalysisDt.pH=req.body.pH;
    urinalysisDt.SpecGravity=req.body.SpecGravity;
    urinalysisDt.protein=req.body.protein;
    urinalysisDt.glucose=req.body.glucose;
    urinalysisDt.Ketones=req.body.Ketones;
    urinalysisDt.Leukocytes=req.body.Leukocytes;
    urinalysisDt.WBCs=req.body.WBCs;
    urinalysisDt.RBCs=req.body.RBCs;
    urinalysisDt.casts=req.body.casts;
    urinalysisDt.Bacteria=req.body.Bacteria;
    urinalysisDt.patientId=req.body.patientId;    
    console.log('Adding urinalysis: ' + JSON.stringify(urinalysisDt));
    urinalysisDt.save(function(error, data){
        if(error){
            res.json(error);
        }
        else{
            res.json(data);
        }
    });
}

exports.updateUserUrinalysisId = function(req, res) {
    //use findandmodify
    var urinalysisDt = urinalysis_module.model(false);
    var ObjectId = require('mongoose').Types.ObjectId;
    var tofind = req.body._id;
    delete(req.body._id);
    urinalysisDt.findOneAndUpdate({_id:tofind}, req.body, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });

}

exports.deleteUserUrinalysisId = function(req, res) {
    var urinalysisDt = urinalysis_module.model(false);
    var rId = req.body._id;

    urinalysisDt.remove({ _id: rId }, function(err, updated) {
        if (!err) {
            console.log('Deleting Urinalysis: ' + rId);
            res.json(updated);
        }
        else {
           res.json(error);
        }
    });
}

exports.findAll = function(req, res) {
    var urinalysis = urinalysis_module.model(false);
    console.log('Retrieving all urinalysis');
    urinalysis.find({},function(err, items) {
        if (err){
            console.log("error retrieving all doctors");
            res.send("error retrieving");
        }
        else
            res.send(items);
    });
};
