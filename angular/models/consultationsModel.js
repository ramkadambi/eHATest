var mongoose = require('mongoose');
var db = require('./db.js');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

module.exports = {
    _schema: null,

    _schema_def: {
        _id: ObjectId
        //, ConsultationCreatedBy: String
        , consultation_date: Date
        ,consultation_slot: String
        //, ConsultationType: String
        , doctor_ID: { type: Schema.ObjectId, ref: 'Users'}
        , doctor_name: String
        ,dateCreated : Date
        , patient_ID: { type: Schema.ObjectId, ref: 'Users'}
        , patient_name:String
        //, PatientComments: String
        //, QualityRating: String
        , consultation_reason: String
        , created_by: { type: Schema.ObjectId, ref: 'Users'}
        //, SpecialityID: String
        ,consultation_mode: String
        , status : String
        ,last_consultation : {patient_name : String,patient_ID: ObjectId,doctor_name:String,doctor_ID:ObjectId,consultation_date:Date,consultation_slot:String,consultation_mode:String,consultation_reason:String,created_by:ObjectId,status:String,diagnosis:String}
        ,last_vitals:{temperature:String,SBP:String,DBP:String,Weight:String,date_of_capture:Date}
    },

    schema: function(){
        if (!module.exports._schema){ console.log("schema");
            module.exports._schema = new mongoose.Schema(module.exports._schema_def);
        }
        return module.exports._schema;
    },

    _model: null,

    model: function(new_instance){
        if (!module.exports._model){
            var schema = module.exports.schema();
             //console.log('schema for consulataion');
            //   console.log(schema);
            mongoose.model('consultations', schema);
            module.exports._model = mongoose.model('consultations');

        }

        return new_instance ?
            new module.exports._model() :
            module.exports._model;
    }
}
