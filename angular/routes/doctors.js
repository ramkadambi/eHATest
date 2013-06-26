var doc_module = require("../models/doctorModel")

exports.addDoctorPersonal = function(req, res) {
    var doctors = doc_module.model(true);
    var ObjectId = require('mongoose').Types.ObjectId;
    doctors._id = new ObjectId();
    doctors.name.salute = req.body.name.salute;
    doctors.name.first = req.body.name.first;
    doctors.name.last = req.body.name.last;
    doctors.mobile = req.body.mobile;
    doctors.sex = req.body.sex;
    doctors.date_of_birth = req.body.date_of_birth;
    doctors.type = "Doctor";
    doctors.dateCreated  = req.body.dateCreated ;
    doctors.email = req.body.email;
    doctors.avatarURL = req.body.avatarURL;
    doctors.sex = req.body.sex;
    doctors.address.streetaddress1 = req.body.address.streetaddress1;
    doctors.address.streetaddress2 = req.body.address.streetaddress2;
    doctors.address.city= req.body.address.city;
    doctors.address.state = req.body.address.state;
    doctors.address.zipcode = req.body.address.zipcode;
    doctors.address.country = req.body.address.country;
    doctors.languages = req.body.languages;
    doctors.about_me = req.body.about_me;
    console.log('Adding Doctor: ' + JSON.stringify(doctors));
    doctors.save(function(error, data){
        if(error){
            res.json(error);
        }
        else{
            res.json(data);
        }
    });
};

exports.updateDoctorTechnical = function(req, res) {
     var doctors = doc_module.model(false);
    var ObjectId = require('mongoose').Types.ObjectId;
     var tofind =ObjectId.fromString( req.body._id);
    doctors.findOne({_id:tofind}, function (err, docMod){
        
   docMod.doctor.plan= req.body.doctor.plan;
     docMod.doctor.plan_ID= req.body.doctor.plan_ID;  
     docMod.doctor.mci_number= req.body.doctor.mci_number;
  docMod.doctor.speciality= req.body.doctor.speciality;
    docMod.doctor.credentials= req.body.doctor.credentials;
      docMod.doctor.visiting_time= req.body.doctor.visiting_time;
        docMod.doctor.testimonial= req.body.doctor.testimonial;
        docMod.doctor.about_me= req.body.doctor.about_me;
  docMod.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(docMod);
    });
});
};
exports.deleteDoctor = function(req, res) {
    var doctors = doc_module.model(false);
    var tofind = req.body._id;

    doctors.findOneAndRemove({_id:tofind}, function(error, updated){
        if(error){
            res.json(error);
        }
        else{
            res.json(updated);
        }
    })  ;
};


/* Find a single Doctor */
exports.findDocById = function(req, res) {
    var id = req.params.id;
    var doctors = doc_module.model(false);
    console.log('Retrieving doctor: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
   doctors.find({_id: ObjectId.fromString("51c46c6116aa2a7046cc0c7a")},function(err, item) {
        if (err){
            console.log("error retrieving doctor"+id);
        }
        else
            res.send(item);
    });
};

exports.showDocByAffliation = function(req, res) {
    var affinityGroup = req.params.affinityGroup;
    var doctors = doc_module.model(false);
    console.log('Retrieving doctor belonging to : ' + affinityGroup);
    doctors.find({ "type":"Doctor","affiliated_to.name" : affinityGroup}, function (err, items) {
        if (err){
            console.log("error retrieving doctor belonging to " +affinityGroup);
        }
        else
            res.send(items);
    });
};

exports.showTimeSlotsByDate = function(req, res) {
    var affinityGroup = req.params.affinityGroup;
    var doctors = doc_module.model(false);
     var ObjectId = require('mongoose').Types.ObjectId;
    console.log('Retrieving doctor belonging to : ' + affinityGroup);
    doctors.find( 
        { _id: ObjectId.fromString("51c46c6116aa2a7046cc0c7a") 
    },'visiting_time.consultation_time').select({visiting_time: { $elemMatch: { consultation_day: "Monday" } } 
}) .exec(function (err, items) {
        if (err){
            console.log("error retrieving doctor belonging to " +affinityGroup);
        }
        else
            res.send(items);
    });
};

exports.showBlockedTimeSlotsByDate  = function(req, res) {
    var doctors = doc_module.model(false);
    console.log('Retrieving the blocked time');
    var ObjectId = require('mongoose').Types.ObjectId;
   doctors.aggregate({ $match : { "_id" :  ObjectId.fromString("51c46c6116aa2a7046cc0c7a") } }, {$unwind: '$Blocked'}, 
    {$group: {           
  _id:{ date: '$Blocked.Appointment_date'},           
  slots:{$addToSet:'$Blocked.Appointment_time'}     
   }},  {$project: {'_id':1,slots:1}},     
    { $match : { "_id.date" :new Date("Jun 15,2013")} }
  ,function(err, item) {
        if (err){
            console.log("error retrieving all health_records");
            res.send("error retrieving");
        }
        else
            res.send(item);
    });
};

exports.showDocBySpeciality = function(req, res) {
    var speciality= req.params.speciality;
    var doctors = doc_module.model(false);
    console.log('Retrieving doctor specialised in : ' + speciality);
    doctors.find({ "doctor.speciality" : "General Physician"}, 'name doctor.speciality', function (err, items) {
        if (err){
            console.log("error retrieving doctor specialised in " +speciality);
        }
        else
            res.send(items);
    });
};

exports.showOneDocBySpeciality = function(req, res) {
    var speciality= req.params.speciality;
    var doctors = doc_module.model(false);
    console.log('Retrieving doctor specialised in : ' + speciality);
    doctors.findOne({ "doctor.speciality" : "General Physician"}, 'name doctor.speciality', function (err, item) {
        if (err){
            console.log("error retrieving doctor specialised in " +speciality);
        }
        else
            res.send(item);
    });
};


exports.findByDocName = function(req, res) {
    var doctorNameFirst = req.params.doctorNameFirst;
    var doctorNameLast = req.params.doctorNameLast;
    var doctors = doc_module.model(false);
    console.log('Retrieving doctor whose name is : ' + doctorNameFirst+ doctorNameLast);
    doctors.find({ "type":"Doctor","name.first" :doctorNameFirst,"name.last":doctorNameLast}, {"_id":0,"name":1 ,"doctor.speciality":1}, function (err, items) {
        if (err){
            console.log("error retrieving doctor whose name is " + doctorNameFirst+ doctorNameLast);
        }
        else
            res.send(items);
    });
};


exports.findUserName = function(req, res) {
    var id = req.params.id;
    var doctors = doc_module.model(false);
    console.log('Retrieving doctor: ' + id);
    doctors.findOne({username:id},function(err, item) {
        if (err){
            console.log("error retrieving doctor"+id);
        }
        else
            res.send(item);
    });
};

exports.findAll = function(req, res) {
    var docmod = doc_module.model(false);
    console.log('Retrieving all doctors');
    docmod.find({type:"Doctor"},function(err, items) {
        if (err){
            console.log("error retrieving all doctors");
            res.send("error retrieving");
        }
        else
            res.send(items);
    });
};




