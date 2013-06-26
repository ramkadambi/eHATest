var mongoose = require('mongoose');
var db = require('./db.js');

module.exports = {
    _schema: null,

    _schema_def: {
        _id: String
        , measureDate: Date
        , uColor: String
        , pH: Number
        , SpecGravity: Number
        , protein: Number
        , glucose: Number
        , Ketones: Number
        , Leukocytes: Number
        , WBCs: Number
        , RBCs: Number
        , casts: String
        , Bacteria: Number
        , patientId:String
    },

    schema: function(){
        if (!module.exports._schema){
            module.exports._schema = new mongoose.Schema(module.exports._schema_def, { collection: 'urinalysis' });
        }

        return module.exports._schema;
    },

    _model: null,

    model: function(new_instance){
        if (!module.exports._model){
            var schema = module.exports.schema();
            //   console.log('schema for users');
            //   console.log(schema);
            mongoose.model('Urinalysis', schema);
            module.exports._model = mongoose.model('Urinalysis');
        }

        return new_instance ?
            new module.exports._model() :
            module.exports._model;
    }
}

