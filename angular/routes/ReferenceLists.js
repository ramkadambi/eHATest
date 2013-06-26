var reflist_module = require("../models/ReferenceListsModel")


/* Find list of Immunizations  */
exports.findImmunList = function(req, res) {
    var immunizationsList = reflist_module.model(false);
    immunizationsList.find({Name:"Immunizations"}, function(err, item) {
        if (err){
            console.log("error retrieving Vitals"+id);
        }
        else
            res.send(item);
    });
};

/* Find list of SurgProcList  */
exports.findSurgeriesList = function(req, res) {
    var surgeriesList = reflist_module.model(false);
    surgeriesList.find({Name:"SurgicalProcedures"}, function(err, item) {
        if (err){
            console.log("error retrieving Vitals"+id);
        }
        else
            res.send(item);
    });
};

/* Find list of Allergies */
exports.findAllergiesList = function(req, res) {
    var allergiesList = reflist_module.model(false);
    allergiesList.find({Name:"Allergies"}, function(err, item) {
        if (err){
            console.log("error retrieving Vitals"+id);
        }
        else
            res.send(item);
    });
};

/* Find list of Consultations *//*
exports.findConsultationsList = function(req, res) {
    var consultationsList = reflist_module.model(false);
    allergiesList.find({Name:"Consultations"}, function(err, item) {
        if (err){
            console.log("error retrieving Consultations: " + id);
        }
        else
            res.send(item);
    });
};*/
