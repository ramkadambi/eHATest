var mongoose = require('mongoose');
var db = require('./db.js');
module.exports = {
    _schema: null,

    _schema_def: {
        _id: String
        , name: {salute:String, first:String, last:String}
        , email: String
        , username: String
        , avatarURL: String
        , sex: String
        , date_of_birth: Date
        , date_of_Joining: Date
        , phone: String
        , mobile: String
        , address: {streetaddress1: String, streetaddress2:String, city:String, state:String, zipcode: String, country: String}
        , languages: [String]
        , languagesKnown: [String]
        //, consultationTime: [String]
        , patient : {plan: String, plan_ID: String, next_renewal_date: Date, organization_name: String, organization_ID:String}
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
            mongoose.model('users', schema);
            module.exports._model = mongoose.model('users');
        }

        return new_instance ?
            new module.exports._model() :
            module.exports._model;
    }
}