var mongoose = require('mongoose');
var db = require('./db.js');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

module.exports = {
    _schema: null,

    _schema_def: {
        name:String
          ,_id: ObjectId
        
 
 ,type : String
 ,address : {streetaddress1 : String,streetaddress2 : String,city: String,state : String,zipcode : String,country : String}
,phone_contact : String
 ,email_contact : String
 ,website : String
 ,logo : String
 ,write_up : String
 ,onboard_date:Date
 ,services :[String]
        
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
             mongoose.model('service_entity', schema,'service_entity');
            module.exports._model = mongoose.model('service_entity',schema);
        }

        return new_instance ?
            new module.exports._model() :
            module.exports._model;
    }
}