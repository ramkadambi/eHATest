var medicinelist_module = require("../models/MedicineListModel")


/* Find list of Medicines */
exports.findMedicineList = function(req, res) {
    var medicineList = medicinelist_module.model(false);

    medicineList.find({},'medicineName', {},function(err, item) {
        if (err){
            console.log("error retrieving Vitals"+id);
        }
        else
            res.send(item);
    });
};
