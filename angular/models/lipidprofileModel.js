var mongoose = require('mongoose');
var db = require('./db.js');

module.exports = {
    _schema: null,

    _schema_def: {
        _id: String
        , measureDate: Date
        , HDL: Number
        , LDL: Number
        , VLDL: Number
        , triglycerides: Number
        , totalChol: Number
        , cholHDLRatio: Number
        , patientId:String
    },

    schema: function(){
        if (!module.exports._schema){
            module.exports._schema = new mongoose.Schema(module.exports._schema_def, { collection: 'LipidProfile' });
        }

        return module.exports._schema;
    },

    _model: null,

    model: function(new_instance){
        if (!module.exports._model){
            var schema = module.exports.schema();
            //   console.log('schema for users');
            //   console.log(schema);
            mongoose.model('LipidProfile', schema);
            module.exports._model = mongoose.model('LipidProfile');
        }

        return new_instance ?
            new module.exports._model() :
            module.exports._model;
    }
}

