var consultations_module = require("../models/consultationsModel");

/* Find consultations by user and date */
exports.findUserConsultationsByPatientID = function(req, res) {
    var id = req.param('patientId', null);
    var consultations = consultations_module.model(false);
    console.log('Retrieving Consultations: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
    consultations.find({patient_ID:ObjectId.fromString("51c1413a16aa2a7046cc0c77")},function(err, item) {
        if (err){
            console.log("error retrieving Consultations: " + id);
        }
        else
        {   res.send(item);
        }
    });
};

exports.findDoctorConsultationsByDoctorID = function(req, res) {
    var id = req.param('doctorId', null);
    var consultations = consultations_module.model(false);
    console.log('Retrieving Consultations: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
    consultations.find({doctor_ID:ObjectId.fromString("51bc49c2c2ae8f9f0b3a481a")},function(err, item) {
        if (err){
            console.log("error retrieving Consultations: " + id);
        }
        else
        {   res.send(item);
        }
    });
};

exports.findUserConsultationsByPatientName = function(req, res) {
    var name = req.param('patientName', null);
    var consultations = consultations_module.model(false);
    console.log('Retrieving Consultations: ' + name);
   
    consultations.find({patient_name:"Ms. Vinitha Ravichandran"},function(err, items) {
        if (err){
            console.log("error retrieving Consultations: " + name);
        }
        else
        {   res.send(items);
        }
    });
};

exports.findDoctorConsultationsByDoctorName = function(req, res) {
    var name = req.param('doctorName', null);
    var consultations = consultations_module.model(false);
    console.log('Retrieving Consultations: ' + name);
   
    consultations.find({doctor_name:"Dr. Nivedhita Davey"},function(err, items) {
        if (err){
            console.log("error retrieving Consultations: " + name);
        }
        else
        {   res.send(items);
        }
    });
};


/* Find consultations by user and date */
exports.findUserConsultationsByRole = function(req, res) {
    var id = req.param('patientId', null);
    var userRole = req.param('userRole', null);
    var consultations = consultations_module.model(false);
    console.log('Retrieving Consultations for : ' + id + ' with Role: ' + userRole);
    var ObjectId = require('mongoose').Types.ObjectId;
    consultations.find({patient_ID:ObjectId.fromString(id), created_by:ObjectId.fromString(userRole)},function(err, item) {
        if (err){
            console.log("error retrieving Consultations: " + id);
        }
        else
        {   res.send(item);
        }
    });
};

/* Find consultations by user and date */
exports.findUserConsultationsByDate = function(req, res) {
    //var id = req.param('patientId', null);
    var consulDate = req.param('consulDate', null);
    console.log(consulDate)
    var consultations = consultations_module.model(false);
    console.log('Retrieving Consultations for Date: ' + consulDate);
    var ObjectId = require('mongoose').Types.ObjectId;
    consultations.find({patient_ID:ObjectId.fromString("51c1413a16aa2a7046cc0c77"),consultation_date: new Date("Jun 22,2013")},function(err, item) {
        if (err){
            console.log("error retrieving Consultations: " + consulDate);
        }
        else
        {   res.send(item);
        }
    });
};

exports.findPresentandFutureUserConsultations = function(req, res) {
    //var id = req.param('patientId', null);
    var consulDate = req.param('consulDate', null);
    var present_date= new Date("Jun 16, 2013");
    var future_date = new Date("Jun 16, 2014");
    console.log(consulDate)
    var consultations = consultations_module.model(false);
    console.log('Retrieving Consultations for Date: ' + consulDate);
    var ObjectId = require('mongoose').Types.ObjectId;
    consultations.find({patient_ID:ObjectId.fromString("51c1413a16aa2a7046cc0c77"),consultation_date: {$gte: present_date, $lt: future_date}},function(err, item) {
        if (err){
            console.log("error retrieving Consultations: " + consulDate);
        }
        else
        {   res.send(item);
        }
    });
};

exports.findPresentandFutureDoctorConsultations = function(req, res) {
    //var id = req.param('patientId', null);
    var consulDate = req.param('consulDate', null);
    var present_date= new Date("Jun 16, 2013");
    var future_date = new Date("Jun 16, 2014");
    console.log(consulDate)
    var consultations = consultations_module.model(false);
    console.log('Retrieving Consultations for Date: ' + consulDate);
    var ObjectId = require('mongoose').Types.ObjectId;
    consultations.find({doctor_ID:ObjectId.fromString("51bc49c2c2ae8f9f0b3a481a"),consultation_date: {$gte: present_date, $lt: future_date}},function(err, item) {
        if (err){
            console.log("error retrieving Consultations: " + consulDate);
        }
        else
        {   res.send(item);
        }
    });
};
exports.findDoctorConsultationsByDate = function(req, res) {
    //var id = req.param('patientId', null);
    var consulDate = req.param('consulDate', null);
    console.log(consulDate)
    var consultations = consultations_module.model(false);
    console.log('Retrieving Consultations for Date: ' + consulDate);
    var ObjectId = require('mongoose').Types.ObjectId;
    consultations.find({doctor_ID:ObjectId.fromString("51bc49c2c2ae8f9f0b3a481a"),consultation_date: new Date("Jun 22,2013")},function(err, item) {
        if (err){
            console.log("error retrieving Consultations: " + consulDate);
        }
        else
        {   res.send(item);
        }
    });
};
exports.addUserConsultations = function(req, res) {
    var consultationsMod = consultations_module.model(true);
    var ObjectId = require('mongoose').Types.ObjectId;
    consultationsMod._id = new ObjectId();
    consultationsMod.consultation_date=req.body.consultation_date;
    consultationsMod.consultation_slot = req.body.consultation_slot;
    consultationsMod.ConsultationTime = req.body.ConsultationTime;
    consultationsMod.ConsultationType = req.body.ConsultationType;

    consultationsMod.doctor_ID = ObjectId.fromString(req.body.doctor_ID);
    consultationsMod.doctor_name = req.body.doctor_name;
    consultationsMod.dateCreated = req.body.dateCreated;
    consultationsMod.patient_ID = ObjectId.fromString(req.body.patient_ID);
    consultationsMod.patient_name = req.body.patient_name;
    consultationsMod.consultation_reason = req.body.consultation_reason;
    consultationsMod.created_by = ObjectId.fromString(req.body.created_by);
    consultationsMod.consultation_mode = req.body.consultation_mode;
    consultationsMod.status = req.body.status;
    consultationsMod.last_vitals.temperature= req.body.last_vitals.temperature;
    consultationsMod.last_vitals.SBP = req.body.last_vitals.SBP;
    consultationsMod.last_vitals.DBP = req.body.last_vitals.DBP;
    consultationsMod.last_vitals.Weight = req.body.last_vitals.Weight;
    consultationsMod.last_vitals.date_of_capture= req.body.last_vitals.date_of_capture;
    consultationsMod.last_consultation.patient_name= req.body.last_consultation.patient_name;
    consultationsMod.last_consultation.patient_ID= ObjectId.fromString(req.body.last_consultation.patient_ID);
    consultationsMod.last_consultation.patient_name= req.body.last_consultation.patient_name;
    consultationsMod.last_consultation.doctor_name= req.body.last_consultation.doctor_name;
    consultationsMod.last_consultation.doctor_ID= ObjectId.fromString(req.body.last_consultation.doctor_ID);
    consultationsMod.last_consultation.consultation_date= req.body.last_consultation.consultation_date;
    consultationsMod.last_consultation.consultation_slot= req.body.last_consultation.consultation_slot;
    consultationsMod.last_consultation.consultation_mode= req.body.last_consultation.consultation_mode;
    consultationsMod.last_consultation.consultation_reason= req.body.consultation_reason;
    consultationsMod.last_consultation.created_by= ObjectId.fromString(req.body.last_consultation.created_by);
    consultationsMod.last_consultation.status= req.body.last_consultation.status;
    consultationsMod.last_consultation.diagnosis= req.body.last_consultation.diagnosis;



    console.log('Adding Consultations: ' + JSON.stringify(consultationsMod));
    consultationsMod.save(function(error, data){
        if(error){
           res.json(error);
           console.log("error in insert");
        }
        else{
            res.json(data);
            console.log("insert succesful");
        }
    });
}

exports.updateLastConsultationbyConsultationsId = function(req, res) {
    var  consultations = consultations_module.model(false);
    var ObjectId = require('mongoose').Types.ObjectId;
     var tofind =ObjectId.fromString( req.body._id);
    consultations.findOne({_id:tofind}, function (err, consultationsMod){
        
    consultationsMod.last_consultation.patient_name= req.body.last_consultation.patient_name;
    consultationsMod.last_consultation.patient_ID= ObjectId.fromString(req.body.last_consultation.patient_ID);
    consultationsMod.last_consultation.patient_name= req.body.last_consultation.patient_name;
    consultationsMod.last_consultation.doctor_name= req.body.last_consultation.doctor_name;
    consultationsMod.last_consultation.doctor_ID= ObjectId.fromString(req.body.last_consultation.doctor_ID);
    consultationsMod.last_consultation.consultation_date= req.body.last_consultation.consultation_date;
    consultationsMod.last_consultation.consultation_slot= req.body.last_consultation.consultation_slot;
    consultationsMod.last_consultation.consultation_mode= req.body.last_consultation.consultation_mode;
    consultationsMod.last_consultation.consultation_reason= req.body.consultation_reason;
    consultationsMod.last_consultation.created_by= ObjectId.fromString(req.body.last_consultation.created_by);
    consultationsMod.last_consultation.status= req.body.last_consultation.status;
    consultationsMod.last_consultation.diagnosis= req.body.last_consultation.diagnosis;

  consultationsMod.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(consultationsMod);
    });
});
};

exports.updateLastVitalsbyConsultationsId = function(req, res) {
    var  consultations = consultations_module.model(false);
    var ObjectId = require('mongoose').Types.ObjectId;
     var tofind =ObjectId.fromString( req.body._id);
    consultations.findOne({_id:tofind}, function (err, consultationsMod){
  consultationsMod.last_vitals.temperature= req.body.last_vitals.temperature;
    consultationsMod.last_vitals.SBP = req.body.last_vitals.SBP;
    consultationsMod.last_vitals.DBP = req.body.last_vitals.DBP;
    consultationsMod.last_vitals.Weight = req.body.last_vitals.Weight;
    consultationsMod.last_vitals.date_of_capture= req.body.last_vitals.date_of_capture;
  consultationsMod.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(consultationsMod);
    });
});
};

exports.updateStatusbyConsultationsId = function(req, res) {
    var consultations= consultations_module.model(false);
    var ObjectId = require('mongoose').Types.ObjectId;
     var tofind =ObjectId.fromString( req.body._id);
   consultations.findOne({_id:tofind}, function (err, doc){
  doc.status = req.body.status;
  doc.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(doc);
    });
});
};


exports.deleteUserConsultations = function(req, res) {
    var consultationsMod = consultations_module.model(false);
   
     var ObjectId = require('mongoose').Types.ObjectId;
     var tofind =ObjectId.fromString( req.body._id);

    consultationsMod.findOneAndRemove({_id:tofind}, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    });
}

exports.findAll = function(req, res) {
    var consultationsMod = consultations_module.model(false);
    console.log('Retrieving all Consultations');
    consultationsMod.find({},function(err, items) {
        if (err){
            console.log("error retrieving all Consultations");
            res.send("error retrieving");
        }
        else
            res.send(items);
    });
};
