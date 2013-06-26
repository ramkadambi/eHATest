var allergies_module = require("../models/allergiesModel")
var immunizations_module = require("../models/immunizationsModel")
var symptoms_module = require("../models/symptomsModel")
var medications_module = require("../models/medicationsModel")
var vitals_module = require("../models/vitalsModel")
var async = require("async");

/* Find a single patient */
exports.findById = function(req, res) {
    var id = req.param('id', null);
    var ObjectId = require('mongoose').Types.ObjectId;
    var allergies = allergies_module.model(false);
    var immunizations = immunizations_module.model(false);
    var symptoms = symptoms_module.model(false);
    var medications = medications_module.model(false);
    var vitals = vitals_module.model(false);

    var patientSummary= {};

    async.series([function(callback){
        allergies.find({patientId:id},function(err, allergiesitem) {
        if (err){
            console.log("error retrieving Allergies"+id);
        }
        else
        {
            patientSummary.Allergies = allergiesitem;
            callback();
        }
    })},
    function(callback){
        immunizations.find({patientId:id},function(err, immunizationsitem) {
            if (err){
                console.log("error retrieving Immunizations"+id);
            }
            else
            {
                patientSummary.Immunizations = immunizationsitem;
                callback();
            }
        })},
    function(callback){
        symptoms.find({patientId:id},function(err, symptomsitem) {
            if (err){
                console.log("error retrieving Symptoms"+id);
            }
            else
            {
                patientSummary.Symptoms = symptomsitem;
                callback();
            }
        })},
        function(callback){
            medications.find({patientId:id},function(err, medicationsitem) {
                if (err){
                    console.log("error retrieving Medicaions"+id);
                }
                else
                {
                    patientSummary.Medications = medicationsitem;
                    callback();
                }
            })},
        function(callback){
            vitals.find({patientId:id},{}, {limit:1,sort:{ measureDate:-1}},function(err, vitalsitem) {
                if (err){
                    console.log("error retrieving vitals"+id);
                }
                else
                {
                    patientSummary.Vitals = vitalsitem;
                    callback();
                }
            })}
    ], function(err, results){
        res.send(patientSummary);
        });
};
