var mongoose = require('mongoose');
var db = require('./db.js');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

//Step 1 - We need to define the model on how we want to see the data coming form Mongo. 
//Note - There may be attributes in document , including a subdocument, that is not needed for retreival.
// We will define the right attributes here to match the functionality need.


/* Sample data for customer
db.users.findOne({type:"Patient"})

{
        "_id" : ObjectId("51bebf2e494bb42a8c6ad7fc"),
        "name" : {
                "salute" : "Mr.",
                "first" : "Ram",
                "last" : "Kadambi"
        },
        "date_of_birth" : ISODate("1973-09-04T18:30:00Z"),
        "sex" : "Male",
        "mobile" : "09500041219",
        "email" : "ram.kadambi@gmail.com",
        "type" : "Patient",
        "date_of_Joining" : ISODate("2012-01-09T18:30:00Z"),
        "languages" : [
                "English",
                "Hindi",
                "Tamil"
        ],
        "affiliated_to" : [
                {
                        "name" : "e Health Access",
                        "service_entity_ID" : ObjectId("51bebf2d494bb42a8c6ad7f8
")
                }
        ],
        "avatarURL" : "img/avatar/1349409823.jpg",
        "address" : {
                "streetaddress1" : "Apt 32, Blg 1A",
                "streetaddress2" : "Akash street",
                "city" : "Chennai",
                "state" : "TN",
                "zipcode" : "600119",
                "country" : "India"
        },
        "patient" : {
                "plan" : "Corporate 599",
                "plan_ID" : null,
                "next_renewal_date" : ISODate("2014-01-08T18:30:00Z"),
                "organization_name" : "Cipher Cloud Inc.",
                "organization_ID" : ObjectId("51bebf2e494bb42a8c6ad7fb")
        }
}
*/
module.exports = {
    _schema: null,

    _schema_def: {
        _id: ObjectId
        , name: {salute:String, first:String, last:String}
        ,dateCreated : Date
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
        
        , affiliated_to : [{name: String, service_entity_ID: ObjectId}]
        , patient : {plan: String, plan_ID: String, next_renewal_date: Date, organization_name: String, organization_ID:ObjectId}
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
            mongoose.model('patients', schema,'users');
            module.exports._model = mongoose.model('patients', schema,'users');
        }

        return new_instance ?
            new module.exports._model() :
            module.exports._model;
    }
}