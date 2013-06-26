var lipidprofile_module = require("../models/lipidprofileModel")


/* Find Lipidprofile by user and date */
exports.findUserLipidprofileDt = function(req, res) {
    var id = req.params.patientId;
    var dt = req.params.dt;
    var doctors = lipidprofile_module.model(false);
    console.log('Retrieving Lipidprofile: ' + id + dt);
    var ObjectId = require('mongoose').Types.ObjectId;
    doctors.findOne({patientId:id, measureDate:dt},function(err, item) {
        if (err){
            console.log("error retrieving Lipidprofile"+id);
        }
        else
            res.send(item);
    });
};

/* Find Lipidprofile by user and date */
exports.findUserLipidprofile = function(req, res) {
    var id = req.param('patientId', null);
    var lipidprofile = lipidprofile_module.model(false);
    console.log('Retrieving Lipidprofile: ' + id );
    var ObjectId = require('mongoose').Types.ObjectId;
    lipidprofile.find({patientId:id},function(err, item) {
        if (err){
            console.log("error retrieving Lipidprofile"+id);
        }
        else
            res.send(item);
    });
};

/* Find Lipidprofile by user and date */
exports.findUserLipidprofileLatest = function(req, res) {
    var id = req.params.patientId;
    var lipidprofile = lipidprofile_module.model(false);
    console.log('Retrieving Lipidprofile: ' + id );
    var ObjectId = require('mongoose').Types.ObjectId;
    lipidprofile.find({patientId:id},{}, {limit:1,sort:{ measureDate:-1}},function(err, item) {
        if (err){
            console.log("error retrieving Lipidprofile"+id);
        }
        else
            res.send(item);
    });
};


exports.addUserLipidprofileDt = function(req, res) {
    var lipidprofileDt = lipidprofile_module.model(true);
    var ObjectId = require('mongoose').Types.ObjectId;
    lipidprofileDt._id = new ObjectId();
    lipidprofileDt.measureDate = req.body.measureDate;
    lipidprofileDt.HDL=req.body.HDL;
    lipidprofileDt.LDL=req.body.LDL;
    lipidprofileDt.VLDL=req.body.VLDL;
    lipidprofileDt.triglycerides=req.body.triglycerides;
    lipidprofileDt.totalChol=req.body.totalChol;
    lipidprofileDt.cholHDLRatio=req.body.cholHDLRatio;

    lipidprofileDt.patientId=req.body.patientId;
    console.log('Adding lipidprofile: ' + JSON.stringify(lipidprofileDt));
    lipidprofileDt.save(function(error, data){
        if(error){
            res.json(error);
        }
        else{
            res.json(data);
        }
    });
}

exports.updateUserLipidprofileId = function(req, res) {
    //use findandmodify
    var lipidprofileDt = lipidprofile_module.model(false);
    var ObjectId = require('mongoose').Types.ObjectId;
    var tofind = req.body._id;
    delete(req.body._id);
    lipidprofileDt.findOneAndUpdate({_id:tofind}, req.body, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });

}

exports.deleteUserLipidprofileId = function(req, res) {
    var lipidprofileDt = lipidprofile_module.model(false);
    var rId = req.body._id;

    lipidprofileDt.remove({ _id: rId }, function(err, updated) {
        if (!err) {
            console.log('Deleting Lipidprofile: ' + rId);
            res.json(updated);
        }
        else {
           res.json(error);
        }
    });
}

exports.findAll = function(req, res) {
    var lipidprofile = lipidprofile_module.model(false);
    console.log('Retrieving all lipidprofile');
    lipidprofile.find({},function(err, items) {
        if (err){
            console.log("error retrieving all doctors");
            res.send("error retrieving");
        }
        else
            res.send(items);
    });
};
