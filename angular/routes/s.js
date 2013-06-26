var m = require("../models/s_m");

exports.findAll = function(req, res) {
    var s= m.model(false);
    console.log('Retrieving all health_records');
   s.find({},function(err, items) {
        if (err){
            console.log("error retrieving all health_records");
            res.send("error retrieving");
        }
        else
        {
            console.log('fetch');
            res.send(items);
        }
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    var doctors = m.model(false);
    console.log('Retrieving doctor: ' + id);
    var ObjectId = require('mongoose').Types.ObjectId;
   doctors.find({_id: ObjectId.fromString(id)},function(err, item) {
        if (err){
            console.log("error retrieving doctor"+id);
        }
        else
            res.send(item);
    });
};
