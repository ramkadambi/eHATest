var symptomslist_module = require("../models/SymptomsListModel")


/* Find list of Symptoms */
exports.findSymptomsList = function(req, res) {
    var symptomsList = symptomslist_module.model(false);
    symptomsList.find({}, function(err, item) {
        if (err){
            console.log("error retrieving Vitals"+id);
        }
        else
            res.send(item);
    });
};
