var article_module = require("../models/articleModel")

/* Find a single Article */
exports.findById = function(req, res) {
    var id = req.params.id;;
    var articles = article_module.model(false);

    articles.find({_id:id},function(err, item) {
        if (err){
            console.log("error retrieving doctor"+id);
        }
        else
            res.send(item);
    });
};

exports.findAllNoContent = function(req, res) {
    var articlemod = article_module.model(false);
    console.log('Retrieving all articles');
    articlemod.find({},{_id:1, title:1, images:1, metakey:1}, function(err, items) {
        if (err){
            console.log("error retrieving all articles");
            res.send("error retrieving");
        }
        else
            res.send(items);
    });
};

