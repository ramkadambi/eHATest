var vitals_module = require("../models/vitalsModel")


/* Find Vitals by user and date */
exports.findUserVitalsDt = function(req, res) {
    var id = req.params.patientId;
    var dt = req.params.dt;
    var vitals = vitals_module.model(false);
    console.log('Retrieving Vitals: ' + id + dt);
    var ObjectId = require('mongoose').Types.ObjectId;
    vitals.findOne({patientId:id, measureDate:dt},function(err, item) {
        if (err){
            console.log("error retrieving Vitals"+id);
        }
        else
            res.send(item);
    });
};

/* Find Vitals by user and date */
exports.findUserVitals = function(req, res) {
    var id = req.param('patientId', null);
    var vitals = vitals_module.model(false);
    console.log('Retrieving Vitals: ' + id );
    var ObjectId = require('mongoose').Types.ObjectId;
    vitals.find({patientId:id},function(err, item) {
        if (err){
            console.log("error retrieving Vitals"+id);
        }
        else
            res.send(item);
    });
};

/* Find Vitals by user and date */
exports.findUserVitalsLatest = function(req, res) {
    var id = req.params.patientId;
    var vitals = vitals_module.model(false);
    console.log('Retrieving Vitals: ' + id );
    var ObjectId = require('mongoose').Types.ObjectId;
    vitals.find({patientId:id},{}, {limit:1,sort:{ measureDate:-1}},function(err, item) {
        if (err){
            console.log("error retrieving Vitals"+id);
        }
        else
            res.send(item);
    });
};

/* Find Vitals by user and date */
exports.findUserVitalsLatest = function(req, res) {
    var id = req.params.patientId;
    var vitals = vitals_module.model(false);
    console.log('Retrieving Vitals: ' + id );
    var ObjectId = require('mongoose').Types.ObjectId;
    vitals.find({patientId:id},{}, {limit:1,sort:{ measureDate:-1}},function(err, item) {
        if (err){
            console.log("error retrieving Vitals"+id);
        }
        else
            res.send(item);
    });
};

exports.addUserVitalsDt = function(req, res) {
    var vitalsDt = vitals_module.model(true);
    var ObjectId = require('mongoose').Types.ObjectId;
    vitalsDt._id = new ObjectId();
    vitalsDt.measureDate = req.body.measureDate;
    vitalsDt.systolicBP=req.body.systolicBP;
    vitalsDt.diastolicBP=req.body.diastolicBP;
    vitalsDt.pulse=req.body.pulse;
    vitalsDt.respiratoryRate=req.body.respiratoryRate;
    vitalsDt.height=req.body.height;
    vitalsDt.heightUnits=req.body.heightUnits;
    vitalsDt.weight=req.body.weight;
    vitalsDt.weightUnits=req.body.weightUnits;
    vitalsDt.BMI=req.body.BMI;
    vitalsDt.temperature=req.body.temperature;
    vitalsDt.tempUnits=req.body.tempUnits;
    vitalsDt.tempSource=req.body.tempSource;
    vitalsDt.patientId=req.body.patientId;
    console.log('Adding vitals: ' + JSON.stringify(vitalsDt));
    vitalsDt.save(function(error, data){
        if(error){
            res.json(error);
        }
        else{
            res.json(data);
        }
    });
}

exports.updateUserVitalsId = function(req, res) {
    //use findandmodify
    var vitalsDt = vitals_module.model(false);
    var ObjectId = require('mongoose').Types.ObjectId;
    var tofind = req.body._id;
    delete(req.body._id);
    vitalsDt.findOneAndUpdate({_id:tofind}, req.body, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });

}

exports.deleteUserVitalsId = function(req, res) {
    var vitalsDt = vitals_module.model(false);
    var rId = req.params.id;

    vitalsDt.remove({ _id: req.body.id }, function(err) {
        if (!err) {
            console.log('Deleting Vitals: ' + rId);
        }
        else {
           res.json(error);
        }
    });
}

exports.findAll = function(req, res) {
    var vitals = vitals_module.model(false);
    console.log('Retrieving all vitals');
    vitals.find({},function(err, items) {
        if (err){
            console.log("error retrieving all doctors");
            res.send("error retrieving");
        }
        else
            res.send(items);
    });
};
