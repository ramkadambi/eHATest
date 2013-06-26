var mongoose = require('mongoose');
var db = require('./db.js');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

module.exports = {
    _schema: null,

    _schema_def: { 
        _id:  ObjectId
        , name: {salute: String, first: String, last: String}
        , email: String
        , username: String
        , avatar: String
        , thumb: String
       ,dateCreated : Date
        //, speciality: [String]
        , BasicInformation: String
        , Gender: String
        , birthDate: Date
        , phone: String
        , mobile: String
        , address: {streetaddress1: String, streetaddress2:String, city:String, state:String, zipcode: String, country: String}
        , website: String
        , education: String
        , college: String
        , graduationYear: String
        , consultationOptions: [String]
         , affiliated_to : [{name: String, service_entity_ID: ObjectId}]
        , languages: [String]
        , doctor : {plan:String,plan_ID:String,mci_number:String,speciality :[String],credentials:[{name:String,institution:String,year:String}]
        , visiting_time: [{consultation_day: String, consultation_time: []}],
        testimonial : [{patient_name: String , patient_city : String, date_created: Date, comment: String, patient_ID: { type: Schema.ObjectId, ref: 'Users'}}]
        ,about_me: String,
    references : [{name: String, description: String, date_from : Date, date_to: Date}]
}
        
        
    },

    schema: function(){
        if (!module.exports._schema){
            module.exports._schema = new mongoose.Schema(module.exports._schema_def);
        }

        return module.exports._schema;
    },

    _model: null,

    model: function(new_instance){
        if (!module.exports._model){
            var schema = module.exports.schema();
            //   console.log('schema for users');
               console.log(schema);
            mongoose.model('doctors', schema, 'users');
            module.exports._model = mongoose.model('doctors', schema, 'users');
        }

        return new_instance ?
            new module.exports._model() :
            module.exports._model;
    }
}